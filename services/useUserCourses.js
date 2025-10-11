import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "./baseUrl.jsx";

export const useInstructorCourses = (user) => {
  const fetchCourses = async () => {
    if (!user?.id) return { count: 0, courses: [] };
    
    const response = await axios.get(`${baseURL}/courses/instructors/${user.id}`,
        {
          params: {userType: 'instructor'},
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
  console.log('Fetched courses:', response.data);
    if (!response.data.success) {
        console.error('Failed to fetch courses:', response.data.message);
      throw new Error('Failed to fetch courses');
    }

    return {
      count: response.data.count || 0,
      courses: response.data.courses || []
    };
  };

  return useQuery({
    queryKey: ['instructorCourses', user?.id],
    queryFn: fetchCourses,
    enabled: !!user?.id,
  });
};