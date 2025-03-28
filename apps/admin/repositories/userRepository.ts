import { PrismaClient, User } from "@prisma/client";
import { BaseRepository } from "./baseRepository";

export class UserRepository implements BaseRepository<User> {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findByClerkId(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: id } });
  }
  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  async findMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(
    data: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    return this.prisma.user.create({ data: data });
  }

  async update(
    id: string,
    data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
  ): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.user.delete({ where: { id } });
    return true;
  }
}
