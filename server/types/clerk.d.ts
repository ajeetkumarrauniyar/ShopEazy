export interface ClerkWebhookEvent<T = any> {
  id: string;
  object: string;
  type: string;
  data: T;
}
