declare namespace Express {
  export interface Request {
    auth?: {
      sessionId: string | null;
      userId: string | null;
      token: string;
      payload: any; // You can refine this based on the structure of your payload
    };
  }
}
