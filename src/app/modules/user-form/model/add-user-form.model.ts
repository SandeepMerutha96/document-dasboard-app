export interface UserFormRequestModel {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface UserFormsList {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface UserlistResponseModel{
  page:number,
  limit:number
}

export interface UserListRsponse {
  users: User[];
  total: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}