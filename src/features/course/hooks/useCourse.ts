/*

Strengths:
- Well-organized custom hooks
- Good use of React Query
- Clean mutation implementations
- Effective cache invalidation

Areas for Improvement:
- Consider implementing retry logic
*/

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/clientApi";
import { showToast } from "@/lib/utils/utils";
import {
  RequestsResponse,
  Course,
  CoursesResponse,
  Instructor,
  UserCreateRequest,
  Student,
} from "../types/course.types";

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
        },
        // onError: (error) => {
        //   showToast.error(error.message || "خطا در ثبت درخواست");
        // },
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

  const useGetInstructorMyCourses = (page: number = 1, pageSize: number = 10) =>
    useQuery<CoursesResponse>({
      queryKey: ["instructor-my-courses", page, pageSize],
      queryFn: () =>
        clientFetch.get(`/course/courses/?page=${page}&page_size=${pageSize}`),
    });

  const useGetCourseRequests = (courseId: string) =>
    useQuery<RequestsResponse>({
      queryKey: ["course-requests", courseId],
      queryFn: () => clientFetch.get(`/request/requests/?course=${courseId}`),
      enabled: !!courseId,
    });

  const useUpdateRequestStatus = () =>
    useMutation<void, Error, { requestId: number; status: 'accepted' | 'declined' }>({
      mutationFn: ({ requestId, status }) =>
        clientFetch.put(`/request/requests/${requestId}/`, { status }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["course-requests"] });
        showToast.success("وضعیت درخواست با موفقیت بروزرسانی شد");
      },
      // onError: (error) => {
      //   showToast.error(error.message || "خطا در بروزرسانی وضعیت درخواست");
      // },
    });

  const useUpdateCourseHeadTA = () =>
    useMutation<void, Error, { courseId: string; student: Student | null }>({
      mutationFn: ({ courseId, student }) =>
        clientFetch.patch(`/course/courses/${courseId}/`, {
          head_ta: student?.id || null
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["course"] });
        showToast.success("سر دستیار با موفقیت تغییر کرد");
      },
      // onError: (error) => {
      //   showToast.error(error.message || "خطا در تغییر سر دستیار");
      // },
    });

  return {
    useGetAvailableCourses,
    useRequestCourse,
    useGetCourseDetails,
    //useGetCourseTAs,
    useGetInstructorDetails,
    useGetInstructorCourses,
    useGetRequests,
    useGetInstructorMyCourses,
    useGetCourseRequests,
    useUpdateRequestStatus,
    useUpdateCourseHeadTA,
  };
};
