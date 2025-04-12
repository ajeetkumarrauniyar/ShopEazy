import prisma from "@/config/dbConfig";
import { UserJSON } from "@clerk/express";

export const createUser = async (user: UserJSON) => {
  try {
    const { id, email_addresses, phone_numbers, first_name, last_name } = user;

    const email = user.email_addresses?.[0]?.email_address || "";
    const phoneNumber = user.phone_numbers?.[0]?.phone_number || "";

    const payload = {
      clerkId: id,
      phoneNumber: phoneNumber,
      emailAddress: email,
      firstName: first_name || undefined,
      lastName: last_name || undefined,
    };

    console.log('====================================');
    console.log(payload);
    console.log('====================================');

    console.log("🛠 Creating user in DB:", payload);
    console.log(`✅ User created in DB with clerkId: ${id}`);
    return await prisma.user.create({ data: payload });
  } catch (error) {
    console.error("Webhook Error: Failed to create user", error);
    throw new Error("Webhook Error: User creation failed");
  }
  console.log(`Creating user with ID from db: ${user.id}`);
};
