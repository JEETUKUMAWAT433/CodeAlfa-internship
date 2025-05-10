package com.example.EMPLOYEELEAVE.MANAGEMENTSYSTEM.repository;


import com.example.EMPLOYEELEAVE.MANAGEMENTSYSTEM.models.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Integer> {
}
