package com.example.EMPLOYEELEAVE.MANAGEMENTSYSTEM.controller;

import com.example.EMPLOYEELEAVE.MANAGEMENTSYSTEM.models.Employee;
import com.example.EMPLOYEELEAVE.MANAGEMENTSYSTEM.models.LeaveRequest;
import com.example.EMPLOYEELEAVE.MANAGEMENTSYSTEM.service.LeaveManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173") // React frontend
@RestController
@RequestMapping("/api")
public class LeaveManagementController {

    @Autowired
    private LeaveManagementService leaveManagementService;

    // 1. Get all employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return leaveManagementService.getAllEmployees();
    }

    // 2. Submit a leave request
    @PostMapping("/leave-request")
    public String submitLeaveRequest(@RequestParam int employeeId, @RequestParam int days) {
        return leaveManagementService.submitLeaveRequest(employeeId, days);
    }

    // 3. Get all leave requests
    @GetMapping("/leave-requests")
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveManagementService.getAllLeaveRequests();
    }

    // 4. Approve or reject a leave request
    @PostMapping("/process-leave")
    public String processLeaveRequest(@RequestParam int requestId, @RequestParam boolean approve) {
        return leaveManagementService.processLeaveRequest(requestId, approve);
    }
}
