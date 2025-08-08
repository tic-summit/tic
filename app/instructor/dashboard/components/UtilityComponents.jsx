export const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
  </div>
);

export const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
    Error loading courses: {message}
  </div>
);

export const EmptyState = ({ title, description, actionText, actionHref }) => (
  <div className="bg-white rounded-lg shadow border border-gray-300 p-6 text-center">
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    {actionText && actionHref && (
      <Link
        href={actionHref}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
      >
        {actionText}
      </Link>
    )}
  </div>
);