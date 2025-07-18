import { prisma } from "@/config/index.ts";
import { UserJSON } from "@/types/clerk.ts";
import { ApiError, logger } from "@/utils/index.ts";

export const userService = {
  /**
   * Create a new user record from a Clerk UserJSON payload
   */
  async createUserFromClerk(user: UserJSON) {
    try {
      const { id, email_addresses, phone_numbers, first_name, last_name } = user;

      const existingUser = await this.findUserByClerkId(id);
      if (existingUser) {
        logger.info(`User with clerkId ${id} already exists, skipping creation`);
        return existingUser;
      }

      const email = email_addresses?.[0]?.email_address;
      const phoneNumber = phone_numbers?.[0]?.phone_number;

      if (!email && !phoneNumber) {
        throw ApiError.badRequest("No email or phone number provided for user creation");
      }

      // Create payload with required fields
      const payload: any = {
        clerkId: id,
        email: email || `${id}@placeholder.com`, // Fallback email if only phone provided
        password: "clerk_managed", // Placeholder since Clerk manages auth
        firstName: first_name || undefined,
        lastName: last_name || undefined,
        phoneNumber: phoneNumber || undefined,
        businessName: "New Business", // Default business name
        isActive: true,
      };

      const newUser = await prisma.user.create({ data: payload });

      logger.info(`✅ User created in DB with clerkId: ${id}, email: ${email}`);
      return newUser;
    } catch (error) {
      logger.error("❌ Failed to create user in DB", error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.internal("User creation failed");
    }
  },

  /**
   * Find a user in our DB by their Clerk ID
   */
  async findUserByClerkId(clerkId: string) {
    try {
      return await prisma.user.findUnique({ where: { clerkId } });
    } catch (error) {
      logger.error(`Error finding user by clerkId ${clerkId}:`, error);
      throw ApiError.internal("Failed to find user");
    }
  },

  /**
   * Get or create a user based on the Clerk userId and optional Clerk payload
   */
  async getOrCreateUser(clerkId: string, clerkPayload?: UserJSON) {
    try {
      let user = await this.findUserByClerkId(clerkId);

      if (!user) {
        if (!clerkPayload) {
          // Create minimal user record for mobile sync
          const minimalPayload = {
            clerkId,
            email: `${clerkId}@placeholder.com`,
            password: "clerk_managed",
            firstName: "Mobile",
            lastName: "User",
            businessName: "Mobile Business",
            isActive: true,
          };

          user = await prisma.user.create({ data: minimalPayload });
          logger.info(`Created minimal user record for clerkId: ${clerkId}`);
        } else {
          user = await this.createUserFromClerk(clerkPayload);
        }
      }

      return user;
    } catch (error) {
      logger.error(`Error in getOrCreateUser for clerkId ${clerkId}:`, error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.internal("Failed to get or create user");
    }
  },

  /**
   * Update a user record from Clerk data
   */
  async updateUserFromClerk(clerkId: string, user: UserJSON) {
    try {
      // Check if user exists
      const existingUser = await this.findUserByClerkId(clerkId);

      if (!existingUser) {
        throw ApiError.notFound(`User not found with clerkId: ${clerkId}`);
      }

      const email = user.email_addresses?.[0]?.email_address || existingUser.email;
      const phone = user.phone_numbers?.[0]?.phone_number || existingUser.phoneNumber;

      // Update user with new data
      const updatedUser = await prisma.user.update({
        where: { clerkId },
        data: {
          email: email,
          phoneNumber: phone || undefined,
          firstName: user.first_name || undefined,
          lastName: user.last_name || undefined,
        },
      });

      logger.info(`✅ User updated in DB with clerkId: ${clerkId}`);
      return updatedUser;
    } catch (error) {
      logger.error("❌ Failed to update user in DB", error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.internal("User update failed");
    }
  },

  /**
   * Soft delete a user record when deleted in Clerk
   */
  async deleteUserFromClerk(clerkId: string) {
    try {
      const existingUser = await this.findUserByClerkId(clerkId);

      if (!existingUser) {
        logger.warn(`User not found for deletion with clerkId: ${clerkId}`);
        return null;
      }

      // Soft delete by setting isActive to false
      const deletedUser = await prisma.user.update({
        where: { clerkId },
        data: {
          isActive: false,
          updatedAt: new Date(),
        },
      });

      logger.info(`✅ User soft deleted in DB with clerkId: ${clerkId}`);
      return deletedUser;
    } catch (error) {
      logger.error("❌ Failed to delete user in DB", error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.internal("User deletion failed");
    }
  },

  /**
   * Find all active users
   */
  async findAllUsers() {
    try {
      return await prisma.user.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      logger.error("Error finding all users:", error);
      throw ApiError.internal("Failed to retrieve users");
    }
  },

  /**
   * Find a user by their database ID
   */
  async findUserById(id: string) {
    try {
      return await prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      logger.error(`Error finding user by id ${id}:`, error);
      throw ApiError.internal("Failed to find user");
    }
  },
};
