export const StatCard = ({ icon, value, label, bgColor }) => (
  <div className={`flex items-center p-4 ${bgColor} rounded-lg border border-gray-300`}>
    <div className="flex-shrink-0">
      {icon}
    </div>
    <div className="ml-4">
      <h5 className="text-2xl font-bold text-gray-900">{value}</h5>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  </div>
);