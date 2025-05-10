package com.example.EMPLOYEELEAVE.MANAGEMENTSYSTEM.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private int leaveBalance;

    public Employee() {
    }

    public Employee(String name, int leaveBalance) {
        this.name = name;
        this.leaveBalance = leaveBalance;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getLeaveBalance() {
        return leaveBalance;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLeaveBalance(int leaveBalance) {
        this.leaveBalance = leaveBalance;
    }

    // 👉 Add this important method
    public void deductLeave(int days) {
        this.leaveBalance -= days;
    }

}
