import { ICourse } from "./course"

export type IUser = {
    id: number
    slug: string
    first_name: string
    last_name: string
    phone: string
    email: string
    status: string
    wishlist: ICourse
    created_at: string
}

export interface ILogin {
    email: string;
    password: string;
  }
  
  export interface IRegister {
    first_name: string;
    last_name: string;
    role: string;
    phone: string;
    email: string;
    username: string;
    password: string;
  }
  
  export interface ICurrentUser {
    email: string;
    inserted_at: string;
    username: string;
    name: string;
  }
  
  export interface IGetMeResponse {
    success: boolean;
    data: ICurrentUser;
  }
  
  export interface IAcknowledgementResponse {
    success: boolean;
    message: string;
    user: { 
      bearer_token: string
    },
    errors?: string[];
  }