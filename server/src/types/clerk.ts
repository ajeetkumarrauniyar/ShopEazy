// server/src/types/clerk.ts (if you want to keep a central event type)
import type { UserJSON, OrganizationJSON, SessionJSON } from "@clerk/express";

export interface ClerkWebhookEvent {
  data: UserJSON | OrganizationJSON | SessionJSON;
  object: string;
  type: string;
}
