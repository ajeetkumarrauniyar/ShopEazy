import { prisma } from "@/config/dbConfig";

class ClerkWebhookService {
  async handleUserCreated(data) {
    try {
      const { id, phone_numbers } = evt.data;

      const phoneNumber =
        phone_numbers && phone_numbers.length > 0
          ? phone_numbers[0]?.phone_number || ""
          : "";

      const newUser = await prisma.user.create({
        data: {
          clerkId: id,
          phoneNumber: phoneNumber,
        },
      });

      console.log("New User created:", newUser);
      return newUser;
    } catch (error) {
      console.error("Error creating user in database:", error);
      return new Response("Error creating user in database:", {
        status: 400,
      });
    }
  }
}

export const service = new ClerkWebhookService();
