package com.example.EMPLOYEELEAVE.MANAGEMENTSYSTEM.repository;

import com.example.EMPLOYEELEAVE.MANAGEMENTSYSTEM.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
