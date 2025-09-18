"use client";
import { useParams } from 'next/navigation';
import useCourseDetails from '@/app/api/courses/useCourseDetails.js';
import { useAuth } from '@/contexts/AuthContexts';
import { useUpdateCourseStep2 } from '@/services/courseApi/UpdateCourseApi';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

export default function EditCourseMediaForm({ onComplete }) {
  const { user } = useAuth();
  const { id: courseId } = useParams();
  const { getCourseInfo, isLoading: courseLoading } = useCourseDetails(courseId);
  const { updateCourseStep2, isLoading: isSubmitting, error: submitError } = useUpdateCourseStep2();
  const [formData, setFormData] = useState({
    thumbnailFile: null,
    promoVideo: null,
  });
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const thumbnailInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Populate form data with existing thumbnail and video URLs
  useEffect(() => {
    if (getCourseInfo && !courseLoading) {
      setPreviewImage(getCourseInfo.thumbnail || null);
      setVideoPreview(getCourseInfo.videoUrl || null);
      setFormData({
        thumbnailFile: null,
        promoVideo: null,
      });
    }
  }, [getCourseInfo, courseLoading]);

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image file
    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, GIF, WebP)');
      toast.error('Invalid file type. Please select an image file (JPEG, PNG, GIF, WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      toast.error('Image size exceeds 5MB. Please select a smaller file.');
      return;
    }
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, WebP)');
      toast.error('Invalid image format. Please select JPEG, PNG, GIF, or WebP.');
      return;
    }

    setFormData({ ...formData, thumbnailFile: file });
    setError(null);
    toast.success('Thumbnail selected successfully!');

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate video file
    if (!file.type.match('video.*')) {
      setError('Please select a video file');
      toast.error('Invalid file type. Please select a video file.');
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError('Video size should be less than 100MB');
      toast.error('Video size exceeds 100MB. Please select a smaller file.');
      return;
    }
    const validVideoTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv'];
    if (!validVideoTypes.includes(file.type)) {
      setError('Please select a valid video file (MP4, MOV, AVI, WMV)');
      toast.error('Invalid video format. Please select MP4, MOV, AVI, or WMV.');
      return;
    }

    setFormData({
      ...formData,
      promoVideo: file,
    });
    setError(null);
    toast.success('Promotional video selected successfully!');

    // Create video preview
    const videoURL = URL.createObjectURL(file);
    setVideoPreview(videoURL);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.thumbnailFile && !getCourseInfo?.thumbnail) {
      setError('Course thumbnail is required');
      toast.error('Course thumbnail is required.');
      return;
    }

    if (!formData.promoVideo && !getCourseInfo?.videoUrl) {
      setError('Promo video is required');
      toast.error('Promotional video is required.');
      return;
    }

    try {
      const formPayload = new FormData();
      if (formData.thumbnailFile) {
        formPayload.append('thumbnail', formData.thumbnailFile);
      }
      if (formData.promoVideo) {
        formPayload.append('promoVideo', formData.promoVideo);
      }

      console.log('FormData contents in component:');
      for (let [key, value] of formPayload.entries()) {
        console.log(key, value.name, value.size);
      }

      await updateCourseStep2(courseId, formPayload, user.token);
      toast.success('Course media updated successfully!');
      if (onComplete) onComplete();
    } catch (err) {
      setError(submitError || 'Failed to update course media.');
      toast.error(submitError || 'Failed to update course media.');
    }
  };

  // Clear video preview when component unmounts or video changes
  React.useEffect(() => {
    return () => {
      if (videoPreview && videoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  if (courseLoading) {
    return (
      <div className="container mx-auto lg:px-6 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto lg:px-6 py-6">
      <div className="title mb-6">
        <h5 className="text-xl font-semibold">Update Course Media</h5>
        <p className="text-gray-600 mt-1">
          Update your course thumbnail and promotional video
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Thumbnail Section */}
          <div className="space-y-4">
            <div className="input-block">
              <label className="form-label block text-sm font-medium text-gray-700 mb-2">
                Course Thumbnail <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand focus:border-brand bg-gray-50"
                    placeholder={formData.thumbnailFile?.name || "No file selected"}
                    readOnly
                  />
                </div>
                <button
                  type="button"
                  onClick={() => thumbnailInputRef.current.click()}
                  className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
                >
                  Choose File
                </button>
                <input
                  type="file"
                  ref={thumbnailInputRef}
                  onChange={handleThumbnailUpload}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                JPEG, PNG, GIF, or WebP. Max 5MB. Recommended: 1280x720px
              </p>
            </div>

            {/* Thumbnail Preview */}
            <div className="mt-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-brand transition-colors min-h-[200px]"
                onClick={() => thumbnailInputRef.current.click()}
              >
                {previewImage ? (
                  <div className="text-center">
                    <img
                      src={previewImage}
                      alt="Thumbnail preview"
                      className="max-h-48 max-w-full rounded-md shadow-md"
                    />
                    <p className="mt-2 text-sm text-gray-600">Click to change thumbnail</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-gray-400 mx-auto mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-lg font-medium text-gray-900 mb-1">Upload Course Thumbnail</p>
                    <p className="text-sm text-gray-500">
                      Click here or drag and drop your image
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Promo Video Section */}
          <div className="space-y-4">
            <div className="input-block">
              <label className="form-label block text-sm font-medium text-gray-700 mb-2">
                Promotional Video <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand focus:border-brand bg-gray-50"
                    placeholder={formData.promoVideo?.name || "No file selected"}
                    readOnly
                  />
                </div>
                <button
                  type="button"
                  onClick={() => videoInputRef.current.click()}
                  className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
                >
                  Choose File
                </button>
                <input
                  type="file"
                  ref={videoInputRef}
                  onChange={handleVideoUpload}
                  className="hidden"
                  accept="video/*"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                MP4, MOV, AVI, WMV formats. Max 100MB. Keep it short and engaging!
              </p>
            </div>

            {/* Video Preview */}
            <div className="mt-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-brand transition-colors min-h-[200px]"
                onClick={() => !videoPreview && videoInputRef.current.click()}
              >
                {videoPreview ? (
                  <div className="w-full">
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                      <video
                        src={videoPreview}
                        poster={previewImage}
                        controls
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">{formData.promoVideo?.name || "Existing Video"}</p>
                        {formData.promoVideo && (
                          <p>{(formData.promoVideo?.size / (1024 * 1024)).toFixed(1)} MB</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          videoInputRef.current.click();
                        }}
                        className="text-brand hover:text-brand/80 text-sm font-medium"
                      >
                        Change Video
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-gray-400 mx-auto mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-lg font-medium text-gray-900 mb-1">Upload Promotional Video</p>
                    <p className="text-sm text-gray-500">
                      Click here to select your promo video
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-brand text-white rounded-md hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading Media...
              </span>
            ) : (
              'Update & Continue'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}