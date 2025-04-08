export type User = {
  id: string;
  clerkId: string;
  email?: string;
  phoneNumber?: string;
  firstName?: string | null;
  lastName?: string | null;
};

interface AuthRequest<T = any> extends Express.Request {
  user?: User;
  auth?: {
    userId: string;
  };
  body: T;
}

export type { AuthRequest };