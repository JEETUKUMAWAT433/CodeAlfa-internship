package com.example.E_LibararySystem.repository;

import com.example.E_LibararySystem.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
    Book findByTitle(String title);
}
