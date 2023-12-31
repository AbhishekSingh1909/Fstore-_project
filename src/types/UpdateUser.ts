export interface UpdateUser {
  id: string;
  updateUser: Partial<UpdateUserDto>;
}

export interface UpdateUserDto {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface UpdateUserPassword {
  Password: string;
}
