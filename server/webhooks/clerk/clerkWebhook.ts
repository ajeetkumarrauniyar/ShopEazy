import { Request, Response } from "express";
import { verifyClerkWebhook } from "@/utils/handleClerkWebhook";
import { clerkWebhookService as service } from "@/services/clerkWebhookService";

/**
 * Handle incoming webhook events from Clerk
 * @param req - Express request object
 * @param res - Express response object
 */

const handleWebhook = async (req: Request, res: Response) => {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    console.error(
      "Error: Missing CLERK_WEBHOOK_SIGNING_SECRET in environment variables. Please add SIGNING_SECRET from Clerk Dashboard to .env"
    );
    return res.status(500).json({
      success: false,
      error: "Server configuration error",
    });
  }
  // Create new Svix instance with secret for verification
  // const wh = new Webhook(SIGNING_SECRET);

  try {
    // Process webhook event based on its type
    const evt = verifyClerkWebhook(req);
    const eventType = evt.type;

    console.log(`Processing webhook event: ${eventType}`);

    switch (eventType) {
      // User related events
      case "user.created":
        await service.handleUserCreated(evt.data);
        break;

      case "user.updated":
        // await service.handleUserUpdated(evt.data);
        // console.log("User Updated", evt.data);
        break;

      case "user.deleted":
        // await service.handleUserDeleted(evt.data);
        // console.log("User Deleted", evt.data);
        break;

      // Organization related events
      case "organization.created":
        // await service.handleOrganizationCreated(evt.data);
        // console.log("Organization Created", evt.data);
        break;

      case "organization.updated":
        // await service.handleOrganizationUpdated(evt.data);
        // console.log("Organization Updated", evt.data);
        break;

      case "organization.deleted":
        // await service.handleOrganizationDeleted(evt.data);
        // console.log("Organization Deleted", evt.data);
        break;

      // Organization invitation events
      case "organizationInvitation.created":
        // await service.handleOrganizationInvitationCreated(evt.data);
        // console.log("Organization Invitation Created", evt.data);
        break;

      case "organizationInvitation.accepted":
        // await service.handleOrganizationInvitationAccepted(evt.data);
        // console.log("Organization Invitation Accepted", evt.data);
        break;

      case "organizationInvitation.revoked":
        // await service.handleOrganizationInvitationRevoked(evt.data);
        // console.log("Organization Invitation Revoked", evt.data);
        break;

      // Organization membership events
      case "organizationMembership.created":
        // await service.handleOrganizationMembershipCreated(evt.data);
        // console.log("Organization Membership Created", evt.data);
        break;

      case "organizationMembership.updated":
        // await service.handleOrganizationMembershipUpdated(evt.data);
        // console.log("Organization Membership Updated", evt.data);
        break;

      case "organizationMembership.deleted":
        // await service.handleOrganizationMembershipDeleted(evt.data);
        // console.log("Organization Membership Deleted", evt.data);
        break;

      // Organization domain events
      case "organizationDomain.created":
        // await service.handleOrganizationDomainCreated(evt.data);
        // console.log("Organization Domain Created", evt.data);
        break;

      case "organizationDomain.updated":
        // await service.handleOrganizationDomainUpdated(evt.data);
        // console.log("Organization Domain Updated", evt.data);
        break;

      case "organizationDomain.deleted":
        // await service.handleOrganizationDomainDeleted(evt.data);
        // console.log("Organization Domain Deleted", evt.data);
        break;

      // Role events
      case "role.created":
        // await service.handleRoleCreated(evt.data);
        // console.log("Role Created", evt.data);
        break;

      case "role.updated":
        // await service.handleRoleUpdated(evt.data)
        // console.log("Role Updated", evt.data);
        break;

      case "role.deleted":
        // await service.handleRoleDeleted(evt.data)
        // console.log("Role Deleted", evt.data);
        break;

      // Permission events
      case "permission.created":
        // await service.handlePermissionCreated(evt.data);
        // console.log("Permission Created", evt.data);
        break;

      case "permission.updated":
        // await service.handlePermissionUpdated(evt.data);
        // console.log("Permission Updated", evt.data);
        break;

      case "permission.deleted":
        // await service.handlePermissionDeleted(evt.data);
        // console.log("Permission Deleted", evt.data);
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(`Error processing webhook:`, error);
    return res.status(400).json({
      success: false,
      error: "Invalid webhook signature",
    });
  }
};

export default handleWebhook;
