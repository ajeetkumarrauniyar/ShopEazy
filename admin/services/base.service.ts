import { PrismaClient } from "@prisma/client";

export abstract class BaseService {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  protected async validateOwnership<T>(
    userId: string,
    resourceId: string,
    model: keyof PrismaClient
  ): Promise<T> {
    const resource = await (this.prisma[model] as any).findFirst({
      where: { id: resourceId, userId },
    });

    if (!resource) {
      throw new Error(`${model.toString()} not found or access denied`);
    }

    return resource as T;
  }
}
