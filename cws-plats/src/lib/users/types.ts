export interface UserListResponse {
  current_page: number;
  data: User[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface User {
  id: string;
  role: number;
  name: string;
  email: string;
  email_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  confirmation_code: null | string;
  gender: null;
  birth: null;
  avatar_path: string;
  twitter: null;
  facebook: null;
  discord: null;
  telegram: null;
}

interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
