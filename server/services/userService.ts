import { prisma } from "@/config/dbConfig";
import { clerkClient } from "@clerk/express";
import { User } from "@/types";

class UserService {
  // Get custom user data by combining Clerk and database
  async getEnrichedUserData(userId: string): Promise<User> {
    const [clerkUser, dbUser] = await Promise.all([
      clerkClient.users.getUser(userId),
      prisma.user.findUnique({ where: { clerkId: userId } }),
    ]);

    return {
      id: userId,
      clerkId: userId,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      phoneNumber: clerkUser.phoneNumbers[0]?.phoneNumber,
      firstName: clerkUser.firstName ?? "",
      lastName: clerkUser.lastName ?? "",
      ...dbUser,
    };
  }

  // Update user data in database
  async updateUser(userId: string, updateData: Partial<User>) {
    return prisma.user.update({
      where: { clerkId: userId },
      data: updateData,
    });
  }

  // Store user in database after Clerk authentication
  async createUser(
    clerkId: string,
    emailAddress: string,
    phoneNumber: string,
    firstName?: string,
    lastName?: string
  ) {
    return prisma.user.create({
      data: {
        clerkId,
        emailAddress,
        phoneNumber,
        firstName,
        lastName,
      },
    });
  }

  // Get user by Clerk ID
  async getUserByClerkId(clerkId: string) {
    return prisma.user.findUnique({ where: { clerkId } });
  }
}

export const userService = new UserService();
