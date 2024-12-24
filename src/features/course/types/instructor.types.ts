export interface Instructor {
  id: string;
  first_name: string;
  last_name: string;
  staff_id: string;
  email: string;
  way_of_communication: string[];
  research_fields: string[];
}

export interface InstructorResponse {
  instructor: Instructor;
} 