package com.example.E_LibararySystem.service;

import com.example.E_LibararySystem.model.Book;
import com.example.E_LibararySystem.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LibraryService {
    @Autowired
    private BookRepository bookRepository;


    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    public String borrowBook(String title) {
        if (title == null || title.trim().isEmpty()) {
            return "Invalid book title.";
        }
        Book book = bookRepository.findByTitle(title.trim());
        if (book == null) {
            return "Book not found.";
        }
        if (book.isBorrowed()) {
            return "Book is already borrowed.";
        }
        book.setBorrowed(true);
        bookRepository.save(book); // <-- Don't comment this line, it saves the updated status
        return "Book borrowed successfully!";
    }


    public String returnBook(String title) {
        Book book = bookRepository.findByTitle(title);
        if (book != null && book.isBorrowed()) {
            book.setBorrowed(false);
            bookRepository.save(book);
            return "Book returned successfully!";
        }
        return "Book was not borrowed.";
    }

    public Boolean saveBooks(Book book) {
        if (book == null || book.getTitle() == null || book.getTitle().trim().isEmpty()) {
            return false; // invalid input
        }
        String trimmedTitle = book.getTitle().trim();
        Book existingBook = bookRepository.findByTitle(trimmedTitle);
        if (existingBook != null) {
            return false; // book with the same title already exists
        }
        book.setTitle(trimmedTitle);
        bookRepository.save(book);
        return true;
    }

    public List<Book> getAllBorrowedBooks() {
        List<Book> allBooks = getBooks();
        List<Book> borrowedBooks = new ArrayList<>();
        for (Book book : allBooks) {
            if (book.isBorrowed()) {
                borrowedBooks.add(book);
            }
        }
        return borrowedBooks;
    }


}

