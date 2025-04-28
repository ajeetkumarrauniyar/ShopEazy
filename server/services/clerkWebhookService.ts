import { ClerkWebhookEvent } from "@/types/clerk";
import type {
  UserJSON,
  OrganizationJSON,
  SessionJSON,
  // add more types as needed
} from "@clerk/express";
import { userService } from "@/services/userService";

export const handleClerkWebhookEvent = async (
  evt: ClerkWebhookEvent
): Promise<void> => {
  const { type, data } = evt;

  console.log(`✅ Webhook received. ID: ${data.id} | Type: ${type}`);

  switch (type) {
    case "user.created": {
      const user = data as UserJSON;
      console.log("👤 New user created:", user.id);
      await userService.createUserFromClerk(user); // Save user to DB
      break;
    }

    case "organization.created": {
      const org = data as OrganizationJSON;
      console.log("🏢 New organization created:", {
        id: org.id,
        name: org.name,
        slug: org.slug,
      });
      // TODO: Save to org table
      break;
    }

    case "session.created": {
      const session = data as SessionJSON;
      console.log("🧑‍💻 New session started:", {
        id: session.id,
        userId: session.user_id,
        createdAt: session.created_at,
      });
      // TODO: Audit log or track session
      break;
    }

    default:
      console.log(`ℹ️ Unhandled event type: ${type}`);
      break;
  }
};
