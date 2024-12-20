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
  courseRef: string;
  studentRef: string;
} 