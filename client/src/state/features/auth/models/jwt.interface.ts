export interface JwtDecodedUser {
  id: string;
  email: string;
}

export type Jwt = { token: string | null };
