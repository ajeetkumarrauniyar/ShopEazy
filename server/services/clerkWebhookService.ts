import { prisma } from "@/config/dbConfig";

class ClerkWebhookService {
  async handleUserCreated(data: any) {
    try {
      const { id, email_addresses, phone_numbers, first_name, last_name } =
        data;

      const phoneNumber = phone_numbers?.[0]?.phone_number || "";
      const email = email_addresses?.[0]?.email_address || "";

      const user = await prisma.user.create({
        data: {
          clerkId: id,
          phoneNumber,
          email,
          firstName: first_name,
          lastName: last_name,
        },
      });

      console.log("New user created via webhook:", user);
      return user;
    } catch (error) {
      console.error("Webhook Error: Failed to create user", error);
      throw new Error("Webhook Error: User creation failed");
    }
  }
}

export const clerkWebhookService = new ClerkWebhookService();
