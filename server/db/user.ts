import prisma from "@/config/dbClientConfig";
import { UserJSON } from "@clerk/express";

export const createUser = async (user: UserJSON) => {
  try {
    const { id, email_addresses, phone_numbers, first_name, last_name } = user;

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

    // Check if user was created successfully
    if (newUser) {
      console.log("✅ User created in DB:", newUser);
    } else {
      console.error("❌ User creation failed");
    }
    
    console.log(`✅ User created in DB with clerkId: ${id}`);
    return newUser;
  } catch (error) {
    console.error("❌ Failed to create user in DB", error);
    throw new Error("User creation failed");
  }
};
