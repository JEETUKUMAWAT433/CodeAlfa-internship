import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LeaveRequestApproval = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRequests = () => {
    axios.get("http://localhost:8080/api/leave-requests")
      .then(res => {
        setRequests(res.data);
        setFilteredRequests(res.data); // Initially display all requests
      })
      .catch(err => console.error(err));
  };

  const handleApproval = async (id, approve) => {
    try {
      await axios.post(`http://localhost:8080/api/process-leave`, null, {
        params: {
          requestId: id,
          approve: approve,
        },
      });
      toast.success(approve ? "Leave Approved!" : "Leave Rejected!");
      fetchRequests(); // Refresh the list after action
    } catch (error) {
      console.error(error);
      toast.error("Failed to process leave request");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterRequests(e.target.value);
  };

  const filterRequests = (query) => {
    const filtered = requests.filter((req) =>
      req.employee?.name.toLowerCase().includes(query.toLowerCase()) ||
      req.requestId.toString().includes(query) ||
      req.status.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRequests(filtered);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">Leave Requests Approval</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by Employee Name, Request ID, or Status"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-md w-1/2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3">Request ID</th>
              <th className="px-6 py-3">Employee Name</th>
              <th className="px-6 py-3">Days Requested</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(req => (
              <tr
                key={req.requestId}
                className={`${
                  req.status.toLowerCase() === "approved"
                    ? "bg-green-100"
                    : req.status.toLowerCase() === "rejected"
                    ? "bg-red-100"
                    : "bg-white"
                } hover:bg-gray-100 transition-colors duration-300`}
              >
                <td className="border px-6 py-4">{req.requestId}</td>
                <td className="border px-6 py-4">{req.employee?.name || 'N/A'}</td>
                <td className="border px-6 py-4">{req.daysRequested}</td>
                <td className="border px-6 py-4 capitalize">
                  <span
                    className={`${
                      req.status.toLowerCase() === "approved"
                        ? "text-green-600 font-semibold"
                        : req.status.toLowerCase() === "rejected"
                        ? "text-red-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="border px-6 py-4 space-x-2">
                  {req.status.toLowerCase() !== "approved" && (
                    <button
                      onClick={() => handleApproval(req.requestId, true)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300"
                    >
                      Approve
                    </button>
                  )}
                  {req.status.toLowerCase() !== "rejected" && (
                    <button
                      onClick={() => handleApproval(req.requestId, false)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequestApproval;
