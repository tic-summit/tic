import React, { useState, useRef } from 'react';

export default function CourseMediaForm() {
  const [videoSource, setVideoSource] = useState("External URL");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const imageUploadRef = useRef(null);

  const handleVideoSourceChange = (e) => {
    setVideoSource(e.target.value);
    setVideoUrl("");
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      // For preview purposes
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadClick = () => {
    imageUploadRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle the image upload here
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto lg:px-6 py-6">
      <div className="title mb-6">
        <h5 className="text-xl font-semibold">Course Media</h5>
        <p className="text-gray-600 mt-1">
          Intro Course overview provider type. (.mp4, YouTube, Vimeo etc.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Course Thumbnail Upload */}
        <div className="col-span-1">
          <div className="input-block">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-12">
                <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                  Course Thumbnail<span className="text-red-500 ms-1">*</span>
                </label>
              </div>
              <div className="md:col-span-10">
                <input
                  type="text"
                  className="form-control w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-brand focus:border-brand"
                  placeholder={thumbnailFile ? thumbnailFile.name : "No File Selected"}
                  readOnly
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="file-upload"
                  className="file-upload-btn w-full inline-flex justify-center py-2 px-4 border border-transparent  text-sm font-medium rounded-md text-white bg-brand hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand cursor-pointer"
                >
                  Upload File
                </label>
                <input
                  type="file"
                  id="file-upload"
                  name="file"
                  className="hidden"
                  onChange={handleThumbnailUpload}
                  ref={fileInputRef}
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="col-span-1">
          <div
            className="upload-img-section border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 transition-colors"
            id="upload-img-section"
            onClick={handleImageUploadClick}
          >
            <input
              type="file"
              id="upload-img-input"
              className="hidden"
              accept="image/jpeg, image/png, image/gif, image/webp"
              onChange={handleImageUpload}
              ref={imageUploadRef}
            />
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="max-h-48 rounded-md mb-4"
              />
            ) : (
              <div className="upload-content text-center">
                <span className="flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <p className="text-center font-medium mb-1 text-gray-700">
                  Upload Image
                </p>
                <span className="text-center text-gray-500 text-sm">
                  JPEG, PNG, GIF, and WebP formats, up to 2 MB
                </span>
              </div>
            )}
          </div>
          <hr className="my-6 border-gray-200" />
        </div>

        {/* Video Source Selection */}
        <div className="col-span-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4">
              <div className="input-block-link">
                <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                  Course Video<span className="text-red-500 ms-1">*</span>
                </label>
                <select
                  className="form-control w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-brand focus:border-brand"
                  value={videoSource}
                  onChange={handleVideoSourceChange}
                >
                  <option>External URL</option>
                  <option>YouTube</option>
                  <option>Vimeo</option>
                  <option>MP4 Upload</option>
                </select>
              </div>
            </div>
            <div className="md:col-span-8">
              <div className="input-block-link">
                <label className="form-label block text-sm font-medium text-gray-700 mb-1 invisible">
                  &nbsp;
                </label>
                <input
                  type="text"
                  className="form-control w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-brand focus:border-brand"
                  placeholder={
                    videoSource === "YouTube"
                      ? "YouTube URL"
                      : videoSource === "Vimeo"
                      ? "Vimeo URL"
                      : "External URL Link"
                  }
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Video Preview */}
        <div className="col-span-1">
          <div className="relative">
            <a
              href={videoUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`block ${!videoUrl ? 'pointer-events-none' : ''}`}
            >
              {previewImage ? (
                <img
                  className="w-full h-auto rounded-lg object-cover"
                  src={previewImage}
                  alt="Course thumbnail"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Video preview will appear here</span>
                </div>
              )}
              {videoUrl && (
                <div className="play-icon absolute inset-0 flex items-center justify-center">
                  <div className="bg-white bg-opacity-80 rounded-full p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-brand"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </a>
          </div>
        </div>
      </div>

   
    </div>
  );
}