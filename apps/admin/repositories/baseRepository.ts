import prisma from "@/lib/prisma";

export interface BaseRepositoryInterface<T> {
  findById(id: string): Promise<T | null>;
  findAll: Promise<T[]>;
  create(data: Omit<T, "id">): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

export class BaseRepository<T, K extends string> {
  constructor(private readonly model: K) {}

  async findById(id: string): Promise<T | null> {
    const result = await (prisma[this.model]).findUnique({
      where: { id },
    });
    return result as T | null;
  }

  async findAll(): Promise<T[]> {
    const results = await (prisma[this.model]).findMany();
    return results as T[];
  }

  async create(data: Omit<T, "id">): Promise<T> {
    const result = await (prisma[this.model]).create({
      data,
    });
    return result as T;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const result = await (prisma[this.model]).update({
      where: { id },
      data,
    });
    return result as T;
  }

  async delete(id: string): Promise<boolean> {
    await (prisma[this.model]).delete({
      where: { id },
    });
    return true;
  }
}
