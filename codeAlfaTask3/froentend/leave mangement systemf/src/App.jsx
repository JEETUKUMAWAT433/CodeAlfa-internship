import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import EmployeeRequestForm from "./pages/EmployeeRequestForm";
import EmployeeList from "./pages/EmployeeList";
import LeaveRequestApproval from "./pages/LeaveRequestApproval";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employee-request" element={<EmployeeRequestForm />} />
          <Route path="/admin/employee-list" element={<EmployeeList />} />
          <Route path="/admin/leave-requests" element={<LeaveRequestApproval />} />
        </Routes>
        <ToastContainer position="top-center" />
      </div>
    </Router>
  );
}

export default App;
