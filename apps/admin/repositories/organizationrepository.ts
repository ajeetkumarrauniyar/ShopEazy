import { BaseRepository } from "./baseRepository";
import type { Organization } from "@prisma/client";
import prisma from "@/lib/prisma";

export class OrganizationRepository extends BaseRepository<
  Organization,
  "organization"
> {
  constructor() {
    super("organization");
  }

  async findByClerkId(clerkId: string): Promise<Organization | null> {
    return prisma.organization.findUnique({
      where: { clerkId },
    });
  }

  async findBySlug(slug: string): Promise<Organization | null> {
    return prisma.organization.findUnique({
      where: { slug },
    });
  }

  async findWithMembers(id: string): Promise<Organization | null> {
    return prisma.organization.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findUserOrganizations(userId: string): Promise<Organization[]> {
    const memberships = await prisma.organizationMember.findMany({
      where: { userId },
      include: {
        organization: true,
      },
    });

    return memberships.map((membership) => membership.organization);
  }
}
