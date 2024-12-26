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
<<<<<<< HEAD
  id: string;
  courseId: string;
  courseName: string;
  teacherName: string;
  semester: string;
  requestDate: string;
  status: 'SUBMITTED' | 'APPROVED' | 'REJECTED';
}

export interface CourseRequestResponse {
  requests: CourseRequest[];
  totalPages: number;
  totalItems: number;
} 
=======
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
>>>>>>> f686937474e4b014fcaa182e3b0db907dd38ee90
