import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EmployeeRequestForm = () => {
  const [empId, setEmpId] = useState('');
  const [days, setDays] = useState('');

  const submitLeaveRequest = async () => {
    if (!empId || !days) {
      toast.error("Please fill both fields!");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/api/leave-request`, null, {
        params: {
          employeeId: empId,
          days: days,
        },
      });
      toast.success("Leave request submitted!");
      setEmpId('');
      setDays('');
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit leave request");
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 flex justify-center items-start min-h-screen pt-15"> {/* Adjusted 'items-start' to align the form towards top */}
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Employee Leave Request</h1>

        <div className="space-y-6">
          <input
            type="number"
            placeholder="Employee ID"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />

          <input
            type="number"
            placeholder="Days Requested"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />

          <button
            onClick={submitLeaveRequest}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl focus:outline-none transition-all duration-300 transform hover:scale-105"
          >
            Submit Leave Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRequestForm;
