import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      jwt: string;
      provider: string;
      email: string;
      username: string;
      name: string;
      roleCode: string;
      priority: number;
      exp: number;
      iat: number;
    };
  }
}