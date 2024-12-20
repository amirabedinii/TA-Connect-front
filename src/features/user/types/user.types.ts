export interface User {
  username: string;
  first_name: string;
  last_name: string;
  role: 'student' | 'teacher' | 'admin';
  student_number: string;
  biography: string;
}

export interface UserError {
  message: string;
  status: number;
}