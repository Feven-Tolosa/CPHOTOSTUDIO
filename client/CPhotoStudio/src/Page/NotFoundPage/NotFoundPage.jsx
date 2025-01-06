import React from "react";

const NotFoundPage = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="max-w-md text-center">
        <div className="text-9xl font-bold text-gray-800">404</div>
        <div className="text-2xl font-medium text-gray-600 mt-4">
          Page Not Found
        </div>
        <p className="text-gray-500 mt-2">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <a
          href="/"
          className="inline-block mt-6 px-4 py-2 bg-customGreen text-white font-semibold rounded hover:bg-customOrange"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
