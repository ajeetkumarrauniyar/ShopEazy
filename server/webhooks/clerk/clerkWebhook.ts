import { service } from "@/services/webhookServices";
import { Webhook } from "svix";

const handleWebhook = async (req: Request, res: Response) => {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Verify webhook signature
  const headers = req.headers;
  const svixId = headers.get("svix-id");
  const svixTimestamp = headers.get("svix-timestamp");
  const svixSignature = headers.get("svix-signature");

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error: Missing required Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);
 
 
  // Verify payload with the headers
  try {
   evt=  wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    console.error("Error: Could not verify webhook,:", err);
    return new Response("Error: Invalid signature", { status: 400 });
  }

  // Process webhook event
  const eventType = evt.type;

  try {
    switch (eventType) {
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

    return Response.json({ success: true });
  } catch (error) {
    console.error(`Error processing ${eventType}:`, error);
    return Response.json(
      { success: false, error: "Invalid webhook signature" },
      { status: 500 }
    );
  }
};

export default handleWebhook;
