export interface AuthState {
  user: LoginResponse | null;
}

export interface LoginResponse {
  id?: string;
  role?: number;
  name?: string;
  email?: string;
  email_verified_at?: Date;
  gender?: null;
  birth?: null;
  avatar_path?: string;
  confirmation_code?: null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  twitter?: null;
  facebook?: null;
  discord?: null;
  telegram?: null;
  jwt?: Jwt;
}

export interface Jwt {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
}



export interface RefreshTokenResponse {
  accessToken: string;
}
