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
} from "../types/course.types";

export const useCourse = () => {
  const queryClient = useQueryClient();

  const courseNames = [
    "ریاضی عمومی",
    "فیزیک پایه",
    "برنامه‌نویسی پیشرفته",
    "ساختمان داده",
    "پایگاه داده",
    "هوش مصنوعی",
    "شبکه‌های کامپیوتری",
    "سیستم‌های عامل",
    "مهندسی نرم‌افزار",
    "طراحی الگوریتم",
    "معماری کامپیوتر",
    "مدارهای منطقی",
    "گرافیک کامپیوتری",
    "امنیت شبکه",
    "یادگیری ماشین",
    "وب معنایی",
    "پردازش تصویر",
    "مباحث ویژه",
    "اینترنت اشیا",
    "رایانش ابری",
  ];
  const instructors: Instructor[] = [
    {
      staff_id: "staff1",
      id: "staff1",
      first_name: "محمد",
      last_name: "محمدی",
    },
    {
      staff_id: "staff2",
      id: "staff2",
      first_name: "علی",
      last_name: "حسینی",
    },
    {
      staff_id: "staff3",
      id: "staff3",
      first_name: "حسین",
      last_name: "رضایی",
    },
    {
      staff_id: "staff4",
      id: "staff4",
      first_name: "فاطمه",
      last_name: "موسوی",
    },
    {
      staff_id: "staff5",
      id: "staff5",
      first_name: "زهرا",
      last_name: "کریمی",
    },
    {
      staff_id: "staff6",
      id: "staff6",
      first_name: "امیر",
      last_name: "صادقی",
    },
    {
      staff_id: "staff7",
      id: "staff7",
      first_name: "مریم",
      last_name: "عباسی",
    },
    {
      staff_id: "staff8",
      id: "staff8",
      first_name: "رضا",
      last_name: "نجفی",
    },
    {
      staff_id: "staff9",
      id: "staff9",
      first_name: "سارا",
      last_name: "هاشمی",
    },
    {
      staff_id: "staff10",
      id: "staff10",
      first_name: "احمد",
      last_name: "علوی",
    },
    {
      staff_id: "staff11",
      id: "staff11",
      first_name: "نرگس",
      last_name: "احمدی",
    },
  ];

  const semesters = [
    "نیمسال اول ۱۴۰۲-۱۴۰۳",
    "نیمسال دوم ۱۴۰۲-۱۴۰۳",
    "نیمسال اول ۱۴۰۳-۱۴۰۴",
    "نیمسال دوم ۱۴۰۳-۱۴۰۴",
  ];

  const allCourses = Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
    name: courseNames[i],
    semester: semesters[Math.floor(Math.random() * semesters.length)],
    instructor: instructors[Math.floor(Math.random() * instructors.length)],
  }));

  const useGetAvailableCourses = (page: number = 1, pageSize: number = 10) =>
    useQuery<CourseResponse>({
      queryKey: ["available-courses", page, pageSize],
      queryFn: () => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        // Create all courses first

        // Then paginate them
        return Promise.resolve({
          courses: allCourses.slice(startIndex, endIndex),
          totalPages: Math.ceil(allCourses.length / pageSize),
          totalItems: allCourses.length,
        });
      },
    });

  const useRequestCourse = () =>
    useMutation<CourseRequest, Error, { courseId: string }>({
      mutationFn: (data) => clientFetch.post("/courses/request/", data),
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
      queryFn: () => {
        const course = allCourses.find((course) => course.id === courseId);
        if (!course) {
          throw new Error("Course not found");
        }
        return Promise.resolve({ course });
      },
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

  return {
    useGetAvailableCourses,
    useRequestCourse,
    useGetCourseDetails,
    useGetCourseTAs,
    useGetInstructorDetails,
  };
};