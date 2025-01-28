export interface User {
  username: string;
  first_name: string;
  last_name: string;
  role: 'student' | 'instructor' | 'admin';
  student_number?: string;
  biography?: string;
  way_of_communication?: string;
  research_fields?: string;
  staff_id?: string;
  resume_file?: string | File;
}

export interface UserError {
  message: string;
  status: number;
  detail?: string;
}