import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch employee data
  useEffect(() => {
    axios.get("http://localhost:8080/api/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.log(err));
  }, []);

  // Filter employees by search term
  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.id.toString().includes(searchTerm)
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Employee List</h1>

      {/* Search bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by ID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Leave Balance</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? filteredEmployees.map(emp => (
              <tr key={emp.id} className="hover:bg-blue-50 transition-all">
                <td className="border px-6 py-4">{emp.id}</td>
                <td className="border px-6 py-4">{emp.name}</td>
                <td className="border px-6 py-4">{emp.leaveBalance}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" className="text-center py-4">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
