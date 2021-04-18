import { MagicUserMetadata } from "@magic-sdk/admin";

export type AuthTokenProps = {
  token: string;
  userID: string;
  expireAt: Date;
};

export type UserProps = {
  username: string;
  password: string;
  lastname: string;
  firstname: string;
  roles: string[];
};

export type AccessTokenProps = {
  userID: string;
  iat?: number;
  exp?: number;
};

export type UserSessionProps = MagicUserMetadata & {
  createdAt: number;
  maxAge: number;
};
