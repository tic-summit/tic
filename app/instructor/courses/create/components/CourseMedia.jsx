import React, { useState } from 'react';

export default function CourseMediaPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [mp4File, setMp4File] = useState(null);
  const [webmFile, setWebmFile] = useState(null);
  const [oggFile, setOggFile] = useState(null);

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    switch(fileType) {
      case 'mp4':
        setMp4File(file);
        break;
      case 'webm':
        setWebmFile(file);
        break;
      case 'ogg':
        setOggFile(file);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full">
      <h5 className="text-lg font-semibold mb-4">Upload video</h5>
      
      {/* Input */}
      <div className="w-full mt-4 mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
        <input 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          type="text" 
          placeholder="Enter video url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>
      
      <div className="relative my-4">
        <hr className="border-gray-300" />
        <p className="text-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 mb-0">Or</p>
      </div>
      
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload video</label>
        
        <div className="flex mb-3">
          <input 
            type="file" 
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            id="inputGroupFile01"
            accept=".mp4"
            onChange={(e) => handleFileChange(e, 'mp4')}
          />
          <label 
            className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-700" 
            htmlFor="inputGroupFile01"
          >
            .mp4
          </label>
        </div>
        
        <div className="flex mb-3">
          <input 
            type="file" 
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            id="inputGroupFile02"
            accept=".webm"
            onChange={(e) => handleFileChange(e, 'webm')}
          />
          <label 
            className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-700" 
            htmlFor="inputGroupFile02"
          >
            .WebM
          </label>
        </div>
        
        <div className="flex mb-3">
          <input 
            type="file" 
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            id="inputGroupFile03"
            accept=".ogg"
            onChange={(e) => handleFileChange(e, 'ogg')}
          />
          <label 
            className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-700" 
            htmlFor="inputGroupFile03"
          >
            .OGG
          </label>
        </div>
      </div>
      
      {/* Preview */}
      <h5 className="text-lg font-semibold mt-4 mb-4">Video preview</h5>
      <div className="relative border-2 border-gray-300 rounded-xl overflow-hidden">
        {/* Video thumbnail */}
        <img 
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
          className="w-full h-64 object-cover" 
          alt="Video preview thumbnail"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Video link */}
          <a 
            href="https://www.youtube.com/embed/tXHviS-4ygo" 
            className="inline-flex items-center justify-center w-16 h-16 bg-white text-red-500 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 text-2xl"
            data-glightbox="" 
            data-gallery="video-tour"
          >
            <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}