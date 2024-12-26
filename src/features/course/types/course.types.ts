export interface Course {
  id: string;
  name: string;
  semester: string;
  teacherName: string;
//   condition: number;
}
export interface CourseResponse {
  courses: Course[];
  totalPages: number;
  totalItems: number;
}
export interface CourseError {
  message: string;
  status: number;
} 


export interface CourseRequest {
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