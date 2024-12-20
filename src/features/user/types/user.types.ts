export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    bio?: string;
    contact_info?: string;
    profile_image?: string;
  }

  export interface UserError {
    message: string;
    status: number;
  }