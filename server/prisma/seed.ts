import { PrismaClient, Role, MemberRole, PlanType } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// This script seeds the database with initial data for development purposes.
// It creates a user, an organization, and some products.
async function main() {
  console.log("🌱 Seeding...");

  // Create a user
  const user = await prisma.user.create({
    data: {
      clerkId: faker.string.uuid(),
      phoneNumber: faker.phone.number({ style: "international" }),
      emailAddress: faker.internet.email(),
      firstName: "Asha",
      lastName: "Kumari",
      role: Role.SUPER_ADMIN,
      isSubscribed: true,
      subscriptionEnds: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ),
    },
  });

  // Create an organization
  const organization = await prisma.organization.create({
    data: {
      clerkId: faker.string.uuid(),
      name: "Asha Enterprises",
      slug: "asha-enterprises",
      address: "123 Main St",
      city: "Patna",
      state: "Bihar",
      zipCode: "800001",
      country: "India",
      gstIn: "22AAAAA0000A1Z5",
      panNo: "ABCDE1234F",
      creator: { connect: { id: user.id } },
    },
  });

  // Add organization member
  await prisma.organizationMember.create({
    data: {
      userId: user.id,
      organizationId: organization.id,
      role: MemberRole.OWNER,
      invitationStatus: "ACTIVE",
      joinedAt: new Date(),
      lastActive: new Date(),
    },
  });

  // Create a financial year
  await prisma.financialYear.create({
    data: {
      name: "2024-2025",
      startDate: new Date("2024-04-01"),
      endDate: new Date("2025-03-31"),
      isCurrent: true,
      organizationId: organization.id,
    },
  });

  // Add some products
  await prisma.product.createMany({
    data: [
      {
        name: "Basmati Rice 5kg",
        description: "Premium quality long-grain rice.",
        price: 450.0,
        organizationId: organization.id,
      },
      {
        name: "Sunflower Oil 1L",
        description: "Refined and healthy cooking oil.",
        price: 120.0,
        organizationId: organization.id,
      },
    ],
  });

  // Create subscription
  await prisma.subscription.create({
    data: {
      plan: PlanType.PREMIUM,
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      organizationId: organization.id,
    },
  });

  console.log("✅ Seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
