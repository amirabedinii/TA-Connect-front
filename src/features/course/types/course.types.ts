// Enums for roles and request statuses
export enum UserRole {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  ADMIN = "admin",
}

export enum RequestStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

// Base User Interface
export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email?: string;
  role: UserRole;
}

// Student Interface extending User
export interface Student extends User {
  studentNumber: string;
  biography?: string;
}

// Instructor Interface extending User
export interface Instructor extends User {
  staffId: string;
  way_of_communication: string;
  research_fields: string;
}

// Request Interface
export interface Request {
  id: number;
  course: Course;
  student: Student;
  status: RequestStatus;
  score: number;
  date: string; // ISO 8601 formatted date string
}

// Course Interface
export interface Course {
  id: number;
  name: string;
  semester: number;
  instructor: Instructor;
  headTA?: Request; // Nullable, represents the head TA
  condition?: number; // Nullable, minimum score condition for the course
  acceptedStudents: Student[]; // List of students who meet the criteria
}

// API Response Interfaces
export interface ApiResponse<T> {
  count: number;
  next?: string; // Nullable URL for the next page
  previous?: string; // Nullable URL for the previous page
  results: T[];
}

// Pagination Interface
export interface Pagination {
  page: number;
  pageSize: number;
  totalPages: number;
  totalResults: number;
}

// Error Interface
export interface ApiError {
  detail: string; // Human-readable error message
  statusCode?: number; // HTTP status code
}

// Contextual Interfaces for serializers
export interface UserCreateRequest {
  username: string;
  first_name: string;
  last_name: string;
  email?: string;
  password: string;
  role: UserRole;
  studentNumber?: string;
  staffId?: string;
  way_of_communication?: string;
  research_fields?: string;
}

export interface RequestCreateRequest {
  courseId: number;
  score: number;
}

export interface CourseUpdateRequest {
  headTAId?: number;
  condition?: number;
}

export interface CoursesResponse extends ApiResponse<Course> {}

