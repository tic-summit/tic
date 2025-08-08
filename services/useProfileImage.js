"use client"

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '@/services/baseUrl';

const useProfileImage = (userId, token) => {
  return useMutation({
    mutationFn: async (imageFile) => {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await axios.patch(
        `${baseURL}/profile/${userId}/image`, 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if(!response.data.success) {
        throw new Error(response.data.message || 'Failed to upload profile image');
      }
      // Return the image URL from the response
      return response.data;
    }
  });
};

export default useProfileImage;