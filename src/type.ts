export interface InitialState {
  mode: string;
  user: string | null;
  token: string | null;
}

export interface User {
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath?: string;
  friends?: string[];
  createDate?: Date;
}

export interface Post {
  userId: string;
  firstName: string;
  lastName: string;
  description?: string;
  userPicturePath?: string;
  picturePath?: string;
  likes?: string[];
  comments?: string[];
  createDate?: Date;
}
