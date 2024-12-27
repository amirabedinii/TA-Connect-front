import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/clientApi";
import { showToast } from "@/lib/utils/utils";
import {
  RequestsResponse,
  Course,
  CoursesResponse,
  Instructor,
  UserCreateRequest,
} from "../types/course.types";
import router from "next/router";

export const useCourse = () => {
  const queryClient = useQueryClient();

  const useGetAvailableCourses = (page: number = 1, pageSize: number = 10) =>
    useQuery<CoursesResponse>({
      queryKey: ["available-courses", page, pageSize],
      queryFn: () =>
        clientFetch.get(`/course/courses/?page=${page}&page_size=${pageSize}`),
    });

  const useRequestCourse = () =>
    useMutation<UserCreateRequest, Error, { course_id: number; score: number }>(
      {
        mutationFn: (data) =>
          clientFetch.post("/request/requests/", {
            course_id: data.course_id,
            score: data.score,
          }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["available-courses"] });
          showToast.success("درخواست شما با موفقیت ثبت شد");
          router.push("/student/requests");
        },
        onError: (error) => {
          showToast.error(error.message || "خطا در ثبت درخواست");
        },
      }
    );

  const useGetCourseDetails = (courseId: string) =>
    useQuery<Course>({
      queryKey: ["course", courseId],
      queryFn: () => clientFetch.get(`/course/courses/${courseId}/`),
      enabled: !!courseId,
    });

  // const useGetCourseTAs = (courseId: string) =>
  //   useQuery<TAResponse>({
  //     queryKey: ["course-tas", courseId],
  //     queryFn: () => clientFetch.get(`/course/courses/${courseId}/tas/`),
  //     enabled: !!courseId,
  //   });

  const useGetInstructorDetails = (instructorId: string) =>
    useQuery<Instructor>({
      queryKey: ["instructor", instructorId],
      queryFn: () => clientFetch.get(`/faculty/instructors/${instructorId}/`),
      enabled: !!instructorId,
    });

  const useGetInstructorCourses = (instructorId: string) =>
    useQuery<CoursesResponse>({
      queryKey: ["instructor-courses", instructorId],
      queryFn: () =>
        clientFetch.get(`/course/courses/?instructor=${instructorId}`),
      enabled: !!instructorId,
    });

  const useGetRequests = (page: number = 1, pageSize: number = 10) =>
    useQuery<RequestsResponse>({
      queryKey: ["requests", page, pageSize],
      queryFn: () =>
        clientFetch.get(
          `/request/requests/?page=${page}&page_size=${pageSize}`
        ),
    });

  return {
    useGetAvailableCourses,
    useRequestCourse,
    useGetCourseDetails,
    //useGetCourseTAs,
    useGetInstructorDetails,
    useGetInstructorCourses,
    useGetRequests,
  };
};
