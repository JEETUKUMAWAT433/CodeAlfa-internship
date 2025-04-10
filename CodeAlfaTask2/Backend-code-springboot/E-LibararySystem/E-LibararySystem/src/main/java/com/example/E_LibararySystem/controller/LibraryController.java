package com.example.E_LibararySystem.controller;

import com.example.E_LibararySystem.model.Book;
import com.example.E_LibararySystem.service.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/library")
public class LibraryController {
    @Autowired
    private LibraryService libraryService;
    @GetMapping
    public String welCome(){
        return "welCome in IT";
    }

    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return libraryService.getBooks();
    }

    @PostMapping("/borrow/{title}")
    public ResponseEntity<String> borrowBook(@PathVariable String title) {
        String Output = libraryService.borrowBook(title);
        return new ResponseEntity<>(Output, HttpStatus.OK);
    }

    @PostMapping("/return/{title}")
    public ResponseEntity<String> returnBook(@PathVariable String title) {
        String Output = libraryService.returnBook(title);
        return new ResponseEntity<>(Output, HttpStatus.OK);
    }


    @PostMapping("/save")
    public ResponseEntity<String> saveBooks(@RequestBody Book book) {
        if (book != null) {
            libraryService.saveBooks(book);
            return new ResponseEntity<>("successfully added ", HttpStatus.CREATED);
        } else
            return new ResponseEntity<>("try again !", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/showBorrowedBooks")
    public List<Book> showBorrowedBooks(){
        return libraryService.getAllBorrowedBooks();
    }

}
