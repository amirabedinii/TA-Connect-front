import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/clientApi";
import { showToast } from "@/lib/utils/utils";
import {
  CourseDetailsResponse,
  CourseRequest,
  CourseResponse,
  Instructor,
  TAResponse,
  TA,
  InstructorResponse,
  InstructorCoursesResponse,
} from "../types/course.types";

const instructors: Instructor[] = [
  {
    id: "1",
    first_name: "محمد",
    last_name: "علوی",
    staff_id: "12345"
  },
  // Add more mock instructors as needed
];

export const useCourse = () => {
  const queryClient = useQueryClient();

  const useGetAvailableCourses = (page: number = 1, pageSize: number = 10) =>
    useQuery<CourseResponse>({
      queryKey: ["available-courses", page, pageSize],
      queryFn: async (): Promise<CourseResponse> => {
        console.log('Fetching available courses...');
        const response = await clientFetch.get<CourseResponse>(`/course/courses/?page=${page}&page_size=${pageSize}`);
        console.log('Response:', response);
        return response;
      },
    });

  const useRequestCourse = () =>
    useMutation<void, Error, CourseRequest>({
      mutationFn: (data) => 
        clientFetch.post("/courses/request/", {
          courseId: data.courseId,
          score: data.score
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["available-courses"] });
        showToast.success("درخواست شما با موفقیت ثبت شد");
      },
      onError: (error) => {
        showToast.error(error.message || "خطا در ثبت درخواست");
      },
    });

  const useGetCourseDetails = (courseId: string) =>
    useQuery<CourseDetailsResponse>({
      queryKey: ["course", courseId],
      queryFn: () => clientFetch.get(`/course/courses/${courseId}/`),
    });

  const useGetCourseTAs = (courseId: string) =>
    useQuery<TAResponse>({
      queryKey: ["course-tas", courseId],
      queryFn: () => {
        // Mock data for now
        const mockTAs: TA[] = [
          {
            id: "1",
            first_name: "علی",
            last_name: "محمدی",
            student_number: "99123456",
            is_head_ta: true,
          },
          {
            id: "2",
            first_name: "زهرا",
            last_name: "حسینی",
            student_number: "99123457",
            is_head_ta: false,
          },
          {
            id: "3",
            first_name: "محمد",
            last_name: "رضایی",
            student_number: "99123458",
            is_head_ta: false,
          },
        ];

        return Promise.resolve({
          tas: mockTAs,
          totalItems: mockTAs.length,
        });
      },
    });

  const useGetInstructorDetails = (instructorId: string) =>
    useQuery<InstructorResponse>({
      queryKey: ["instructor", instructorId],
      queryFn: () => {
        const instructor = instructors.find((i) => i.id === instructorId);
        if (!instructor) {
          throw new Error("Instructor not found");
        }

        // Mock additional data
        const enrichedInstructor = {
          ...instructor,
          email: `${instructor.first_name.toLowerCase()}.${instructor.last_name.toLowerCase()}@example.com`,
          way_of_communication: ["Email", "Office Hours"],
          research_fields: ["Machine Learning", "Artificial Intelligence"],
        };

        return Promise.resolve({ instructor: enrichedInstructor });
      },
    });

  const useGetInstructorCourses = (instructorId: string) =>
    useQuery<InstructorCoursesResponse>({
      queryKey: ["instructor-courses", instructorId],
      queryFn: () => clientFetch.get(`/course/courses/?instructor=${instructorId}`),
    });

  return {
    useGetAvailableCourses,
    useRequestCourse,
    useGetCourseDetails,
    useGetCourseTAs,
    useGetInstructorDetails,
    useGetInstructorCourses,
  };
};
