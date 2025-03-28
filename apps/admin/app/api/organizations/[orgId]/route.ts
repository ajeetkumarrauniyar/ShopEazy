import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { orgId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify organization access
    const organization = await prisma.organization.findUnique({
      where: { clerkId: params.orgId },
      include: {
        members: {
          where: { user: { clerkId: userId } },
          take: 1,
        },
      },
    });

    if (
      !organization ||
      (organization.members.length === 0 && !organization.creatorId)
    ) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const [subscription, products, members, financialYears] = await Promise.all(
      [
        prisma.subscription.findUnique({
          where: { organizationId: organization.id },
        }),
        prisma.product.count({ where: { organizationId: organization.id } }),
        prisma.organizationMember.count({
          where: { organizationId: organization.id },
        }),
        prisma.financialYear.findMany({
          where: { organizationId: organization.id },
          orderBy: { startDate: "desc" },
          take: 3,
        }),
      ]
    );

    return NextResponse.json({
      id: organization.id,
      name: organization.name,
      stats: { productCount: products, memberCount: members },
      subscription,
      financialYears,
    });
  } catch (error) {
    console.error("Error fetching organization data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
