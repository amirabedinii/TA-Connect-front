export interface Instructor {
  id: string;
  first_name: string;
  last_name: string;
  staff_id: string;
  email?: string;
  way_of_communication?: string[];
  research_fields?: string[];
}

export interface Course {
  id: string;
  name: string;
  semester: string;
  instructor: Instructor;
}

export interface CourseResponse {
  courses: Course[];
  totalPages: number;
  totalItems: number;
}

export interface CourseDetailsResponse {
  course: Course;
}

export interface CourseRequest {
  course_ref: string;
  student_ref: string;
  condition: string;
}

export interface TA {
  id: string;
  first_name: string;
  last_name: string;
  student_number: string;
  is_head_ta: boolean;
}

export interface TAResponse {
  tas: TA[];
  totalItems: number;
} 

export interface InstructorResponse {
  instructor: Instructor;
} 

export interface InstructorCoursesResponse {
  courses: Course[];
  totalItems?: number;
  totalPages?: number; 
}

export enum RequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

export interface Request {
  id: string;
  course: Course;
  status: RequestStatus;
  created_at: string; // ISO date string
}

export interface RequestResponse {
  requests: Request[];
  totalPages: number;
  totalItems: number;
}
