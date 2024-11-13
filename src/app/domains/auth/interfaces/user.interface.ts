export interface User{
    mail: string,
    password: string,
    itsadmin?: boolean
    address: string
}

export interface UserResponse {
    mail: string;
    itsadmin: boolean;
    address: string;
  }
  

export interface Login{
    mail: string,
    password: string
}
