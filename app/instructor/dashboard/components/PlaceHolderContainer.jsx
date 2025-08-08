export const PlaceholderContent = ({ title }) => (
  <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <p className="text-gray-600">This is the {title.toLowerCase()} content area.</p>
  </div>
);