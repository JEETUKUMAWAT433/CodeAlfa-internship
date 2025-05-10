import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-100 to-purple-100">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-12">🧑‍💼 Leave Management Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <Link
          to="/employee-request"
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-10 py-8 rounded-2xl shadow-2xl text-2xl font-semibold text-center transition-all duration-300 transform hover:scale-105"
        >
          🧑‍💼 Employee Leave Request
        </Link>

        <Link
          to="/admin/employee-list"
          className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-10 py-8 rounded-2xl shadow-2xl text-2xl font-semibold text-center transition-all duration-300 transform hover:scale-105"
        >
          📋 Employee List
        </Link>

        <Link
          to="/admin/leave-requests"
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-10 py-8 rounded-2xl shadow-2xl text-2xl font-semibold text-center transition-all duration-300 transform hover:scale-105"
        >
          ✅ Approve/Reject Requests
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
