export interface LoginReq {
  email: string;
  password: string;
}

export interface User {
  pk: number;
  email: string;
  first_name?: string;
  last_name?: string;
  username: string;
  role: string;
}

export interface LoginRes {
  user: User;
  access_token: string;
  refresh_token: string;
}
