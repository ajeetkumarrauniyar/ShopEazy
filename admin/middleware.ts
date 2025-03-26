import {
  clerkMiddleware,
  createRouteMatcher,
  getAuth,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Route patterns for different access levels
const publicRoutes = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/api/webhook/register",
]);

const userRoutes = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",
  "/products(.*)",
]);

const adminRoutes = createRouteMatcher([
  "/orgId/(.*)/admin-dashboard",
  "/orgId/(.*)/members",
  "/orgId/(.*)/products/manage",
  "/orgId/(.*)/settings",
]);

const superAdminRoutes = createRouteMatcher([
  "/super-admin(.*)",
  "/organizations(.*)",
]);

const organizationSelectorRoute = createRouteMatcher([
  "/organization-selector(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Public routes
  if (publicRoutes(req)) {
    return NextResponse.next();
  }

  // For all other routes, ensure the user is authenticated
  const { userId, orgId, has } = await auth();

  // Redirect unauthenticated users
  if (!userId) {
    return NextResponse.redirect(new URL(`/sign-in`, req.url));
  }

  if (userId) {
    try {
      // Get the auth object which includes user and organizations
      const authObject = await getAuth(req);

      const userOrganizations =
        authObject?.user?.organizationMemberships?.map((m) => m.organization) ||
        [];

      // Handle super-admin access
      if (superAdminRoutes(req)) {
        const hasSuperAdminAccess = has({ permission: "super-admin" });

        if (!hasSuperAdminAccess) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return NextResponse.next();
      }

      // Handle organization selector logic
      if (organizationSelectorRoute(req)) {
        const isSuperAdmin = has({ permission: "super-admin" });

        if (isSuperAdmin) return NextResponse.next();

        const isAdminInMultipleOrgs = has({ permission: "org:admin" });

        if (isAdminInMultipleOrgs && userOrganizations.length > 1) {
          return NextResponse.next();
        }

        if (userOrganizations.length === 1) {
          const singleOrgId = userOrganizations[0].id;

          return NextResponse.redirect(
            new URL(`/orgId/${singleOrgId}/dashboard`, req.url)
          );
        }

        // If user has no organizations, redirect to dashboard
        return NextResponse.redirect(new URL("/waiting-for-org", req.url));
      }

      // Admin route checks - organization-specific admin access
      if (adminRoutes(req)) {
        const isAdmin =
          has({ permission: "org:admin" }) ||
          has({ permission: "super-admin" });

        if (!isAdmin) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return NextResponse.next();
      }

      // For all organization-specific routes, ensure the user is a member
      if (req.url.includes("/orgId/")) {
        const urlOrgId = req.url.match(/\/orgId\/([^\/]+)/)?.[1];

        // If no organization ID is found or doesn't match current organization
        if (!urlOrgId || (orgId && urlOrgId !== orgId)) {
          const isSuperAdmin = has({ permission: "super-admin" });

          if (!isSuperAdmin) {
            // Check if user is a member of the requested organization
            const hasAccessToRequestedOrg = userOrganizations.some(
              (org) => org.id === urlOrgId
            );

            if (!hasAccessToRequestedOrg) {
              // Redirect to organization selector
              return NextResponse.redirect(
                new URL("/organization-selector", req.url)
              );
            }
          }
        }
      }

      // Ensure user authentication is enforced
      if (userRoutes(req)) {
        return NextResponse.next();
      }

      // Default protection for any unspecified routes
      await auth.protect();
    } catch (error) {
      console.error("[Middleware] Error:", error);
      return NextResponse.redirect(new URL("/error", req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
