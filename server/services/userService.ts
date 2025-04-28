import prisma from "@/config/dbClientConfig";
import { UserJSON } from "@clerk/express";

export const userService = {
  /**
   * Create a new user record from a Clerk UserJSON payload
   */
  async createUserFromClerk(user: UserJSON) {
    try {
      const { id, email_addresses, phone_numbers, first_name, last_name } =
        user;

      const existingUser = await this.findUserByClerkId(id);
      if (existingUser) {
        console.log(
          `User with clerkId ${id} already exists, skipping creation`
        );
        return existingUser;
      }
      
      const email = email_addresses?.[0]?.email_address || "";
      const phoneNumber = phone_numbers?.[0]?.phone_number || "";

      const payload = {
        clerkId: id,
        phoneNumber: phoneNumber,
        emailAddress: email,
        firstName: first_name || undefined,
        lastName: last_name || undefined,
      };

      const newUser = await prisma.user.create({ data: payload });

      console.log(`✅ User created in DB with clerkId: ${id}`);
      return newUser;
    } catch (error) {
      console.error("❌ Failed to create user in DB", error);
      throw new Error("User creation failed");
    }
  },

  /**
   * Find a user in our DB by their Clerk ID
   */
  async findUserByClerkId(clerkId: string) {
    return prisma.user.findUnique({ where: { clerkId } });
  },

  /**
   * Get or create a user based on the Clerk userId and optional Clerk payload
   */
  async getOrCreateUser(clerkId: string, clerkPayload?: UserJSON) {
    let user = await this.findUserByClerkId(clerkId);
    if (!user && clerkPayload) {
      user = await this.createUserFromClerk(clerkPayload);
    }
    return user;
  },

  /**
   * Update a user record from Clerk data
   */
  async updateUserFromClerk(clerkId: string, user: UserJSON) {
    try {
      // Check if user exists
      const existingUser = await this.findUserByClerkId(clerkId);

      if (!existingUser) {
        throw new Error("User not found");
      }

      const email =
        user.email_addresses?.[0]?.email_address || existingUser.emailAddress;
      const phone =
        user.phone_numbers?.[0]?.phone_number || existingUser.phoneNumber;

      // Update user with new data
      const updatedUser = await prisma.user.update({
        where: { clerkId },
        data: {
          emailAddress: email,
          phoneNumber: phone || undefined,
          firstName: user.first_name || undefined,
          lastName: user.last_name || undefined,
        },
      });

      console.log(`✅ User updated in DB with clerkId: ${clerkId}`);
      return updatedUser;
    } catch (error) {
      console.error("❌ Failed to update user in DB", error);
      throw new Error("User update failed");
    }
  },
};
