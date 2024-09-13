export type User = {
  token: string;
  role?: number;
};

export type JWTPayload = {
  id: string;
  name: string;
  roleID: number;
  iat: number;
  exp: number;
};

