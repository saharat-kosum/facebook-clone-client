export interface InitialState {
  mode: string;
  user: UserType | null;
  mockIMG : string;
}

export interface UserType {
  _id?:string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  occupation: string;
  location: string;
  picturePath?: string;
  friends?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostType {
  _id?:string;
  userId: string;
  firstName: string;
  lastName: string;
  description?: string;
  userPicturePath?: string;
  picturePath?: string;
  likes?: string[];
  comments?: string[];
  createdAt?: Date;
}
