export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  role: 'student' | 'instructor' | 'admin';
  student_number?: string;
  biography?: string;
  way_of_communication?: string;
  research_fields?: string;
  staff_id?: string;
  resume_file?: string | null;  // URL string from backend or null
}

export interface UserError {
  message: string;
  status?: number;
  response?: {
    data?: {
      detail?: string;
    };
    status?: number;
  };
}