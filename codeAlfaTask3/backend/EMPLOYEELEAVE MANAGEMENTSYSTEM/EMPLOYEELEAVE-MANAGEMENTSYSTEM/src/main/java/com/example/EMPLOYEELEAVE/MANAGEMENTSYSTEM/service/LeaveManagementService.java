package com.example.EMPLOYEELEAVE.MANAGEMENTSYSTEM.service;

import com.example.EMPLOYEELEAVE.MANAGEMENTSYSTEM.models.Employee;
import com.example.EMPLOYEELEAVE.MANAGEMENTSYSTEM.models.LeaveRequest;
import com.example.EMPLOYEELEAVE.MANAGEMENTSYSTEM.repository.EmployeeRepository;
import com.example.EMPLOYEELEAVE.MANAGEMENTSYSTEM.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveManagementService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee findEmployeeById(int id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public String submitLeaveRequest(int empId, int days) {
        Employee emp = findEmployeeById(empId);
        if (emp != null) {
            if (emp.getLeaveBalance() >= days) {
                LeaveRequest request = new LeaveRequest();
                request.setEmployee(emp);
                request.setDaysRequested(days);
                request.setStatus("Pending");
                leaveRequestRepository.save(request);
                return "Leave request submitted successfully!";
            } else {
                return "Not enough leave balance!";
            }
        } else {
            return "Employee not found!";
        }
    }

    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    public String processLeaveRequest(int reqId, boolean approve) {
        LeaveRequest req = leaveRequestRepository.findById(reqId).orElse(null);
        if (req != null && req.getStatus().equals("Pending")) {
            if (approve) {
                req.approve();
            } else {
                req.reject();
            }
            leaveRequestRepository.save(req);
            employeeRepository.save(req.getEmployee());
            return approve ? "Leave request approved." : "Leave request rejected.";
        }
        return "Request ID not found or already processed.";
    }
}
