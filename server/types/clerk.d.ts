export interface ClerkWebhookEvent<T = any> {
  data: T;
  event_attributes: T;
  object: string;
  timestamp: integer;
  type: string;
}
