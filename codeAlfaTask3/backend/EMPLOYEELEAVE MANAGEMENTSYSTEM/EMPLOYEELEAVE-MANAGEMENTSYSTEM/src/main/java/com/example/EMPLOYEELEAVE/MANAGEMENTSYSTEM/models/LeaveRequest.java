package com.example.EMPLOYEELEAVE.MANAGEMENTSYSTEM.models;

import jakarta.persistence.*;

@Entity
public class LeaveRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requestId;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    private int daysRequested;
    private String status;

    public LeaveRequest() {
    }

    public LeaveRequest(int requestId, Employee employee, int daysRequested) {
        this.requestId = requestId;
        this.employee = employee;
        this.daysRequested = daysRequested;
        this.status = "Pending";
    }


    public void approve() {
        status = "Approved";
        employee.deductLeave(daysRequested);
    }

    public void reject() {
        status = "Rejected";
    }

    public int getRequestId() {
        return requestId;
    }

    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public int getDaysRequested() {
        return daysRequested;
    }

    public void setDaysRequested(int daysRequested) {
        this.daysRequested = daysRequested;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
