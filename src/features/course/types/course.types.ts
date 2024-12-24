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
  courseRef: string;
  studentRef: string;
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