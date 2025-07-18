import { ClerkWebhookEvent } from "@/types/clerk.ts";
import type {
  UserJSON,
  OrganizationJSON,
  SessionJSON,
  // add more types as needed
} from "@clerk/express";
import { userService } from "@/services/index.ts";
import { logger } from "@/utils/index.ts";

export const handleClerkWebhookEvent = async (evt: ClerkWebhookEvent): Promise<void> => {
  const { type, data } = evt;

  logger.info(`✅ Webhook received. ID: ${data.id} | Type: ${type}`);

  switch (type) {
    case "user.created": {
      const user = data as UserJSON;
      logger.info("👤 New user created:", user.id);
      await userService.createUserFromClerk(user);
      break;
    }

    case "user.updated": {
      const user = data as UserJSON;
      logger.info("👤 User updated:", user.id);
      await userService.updateUserFromClerk(user.id, user); // Fixed: pass clerkId and user
      break;
    }

    case "user.deleted": {
      const user = data as UserJSON;
      logger.info("👤 User deleted:", user.id);
      await userService.deleteUserFromClerk(user.id); // Fixed: pass only clerkId
      break;
    }

    case "organization.created": {
      const org = data as OrganizationJSON;
      logger.info("🏢 New organization created:", {
        id: org.id,
        name: org.name,
        slug: org.slug,
      });
      // TODO: Save to org table
      break;
    }

    case "session.created": {
      const session = data as SessionJSON;
      logger.info("🧑‍💻 New session started:", {
        id: session.id,
        userId: session.user_id,
        createdAt: session.created_at,
      });
      // TODO: Audit log or track session
      break;
    }

    default:
      logger.info(`ℹ️ Unhandled event type: ${type}`);
      break;
  }
};
