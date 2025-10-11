import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from './baseUrl.jsx';

// Upload profile image
export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ imageFile, token }) => {
      const formData = new FormData();
      formData.append('profileImage', imageFile);
      
      const response = await axios.post(
        `${baseURL}/profile/upload-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

// Get profile image
export const useProfileImage = (userId) => {
  return useQuery({
    queryKey: ['profile-image', userId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/profile/image/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
};

// Update user profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ profileData, token }) => {
      const response = await axios.put(
        `${baseURL}/profile`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

// Get user profile
export const useProfile = (userId) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/profile/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
};
