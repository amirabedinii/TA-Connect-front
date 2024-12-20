import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/clientApi";
import { showToast } from "@/lib/utils/utils";
import { Course, CourseRequest, CourseResponse } from "../types/course.types";

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

  const teacherNames = [
    "دکتر محمدی",
    "دکتر حسینی",
    "دکتر رضایی",
    "دکتر علوی",
    "دکتر کریمی",
    "دکتر موسوی",
    "دکتر احمدی",
    "دکتر نجفی",
    "دکتر صادقی",
    "دکتر طاهری",
  ];

  const semesters = [
    "نیمسال اول ۱۴۰۲-۱۴۰۳",
    "نیمسال دوم ۱۴۰۲-۱۴۰۳",
    "نیمسال اول ۱۴۰۳-۱۴۰۴",
    "نیمسال دوم ۱۴۰۳-۱۴۰۴",
  ];

  const useGetAvailableCourses = (page: number = 1, pageSize: number = 10) =>
    useQuery<CourseResponse>({
      queryKey: ["available-courses", page, pageSize],
      queryFn: () => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        
        // Create all courses first
        const allCourses = Array.from({ length: 20 }, (_, i) => ({
          id: (i + 1).toString(),
          name: courseNames[i],
          semester: semesters[Math.floor(Math.random() * semesters.length)],
          teacherName: teacherNames[Math.floor(Math.random() * teacherNames.length)],
        }));

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

  return {
    useGetAvailableCourses,
    useRequestCourse,
  };
};
