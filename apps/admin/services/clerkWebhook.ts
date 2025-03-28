import { prisma } from "@/lib/prisma";

export class ClerkWebhookService {
  async handleUserCreated(userData) {
    try {
      if (!userData.id) {
        console.error("User ID is missing in webhook data.");
        return;
      }

      await prisma.user.create({
        data: {
          clerkId: userData.id,
          emailAddress: userData.email_addresses.map(
            (email) => email.email_address
          ),
          phoneNumber:
            userData.phone_numbers.map((phone) => phone.phone_number)[0] ||
            null,
          firstName: userData.first_name,
          lastName: userData.last_name,

          // Add other relevant fields from userData
        },
      });

      console.log(`User with Clerk ID ${userData.id} created in the database.`);
    } catch (error) {
      console.error("Error creating user in database:", error);
    }
  }

  // async handleUserUpdated(userData: WebhookEventUserData) {
  //   try {
  //     if (!userData.id) {
  //       console.error("User ID is missing in webhook data.");
  //       return;
  //     }

  //     await prisma.user.update({
  //       where: {
  //         clerkId: userData.id,
  //       },
  //       data: {
  //         emailAddresses: userData.email_addresses.map(
  //           (email) => email.email_address
  //         ),
  //         firstName: userData.first_name,
  //         lastName: userData.last_name,
  //         imageUrl: userData.image_url,
  //         phoneNumber:
  //           userData.phone_numbers.map((phone) => phone.phone_number)[0] ||
  //           null,
  //         // Update other relevant fields
  //       },
  //     });

  //     console.log(`User with Clerk ID ${userData.id} updated in the database.`);
  //   } catch (error) {
  //     console.error("Error updating user in database:", error);
  //   }
  // }

  // async handleUserDeleted(userData: WebhookEventUserData) {
  //   try {
  //     if (!userData.id) {
  //       console.error("User ID is missing in webhook data.");
  //       return;
  //     }

  //     await prisma.user.delete({
  //       where: {
  //         clerkId: userData.id,
  //       },
  //     });

  //     console.log(
  //       `User with Clerk ID ${userData.id} deleted from the database.`
  //     );
  //   } catch (error) {
  //     console.error("Error deleting user from database:", error);
  //   }
  // }

  // Add handlers for other relevant Clerk webhook events (organization, etc.)
  // ...
}
