package com.example.demo.controller;

import com.example.demo.dto.BookDTO;
import com.example.demo.entity.BookEntity;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/all-books")
    public ResponseEntity<List<BookDTO>> allPosts() {
        List<BookDTO> postDTOList = bookService.getAllBooks();
        if (postDTOList.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(postDTOList);
        }
    }

    @PostMapping("/upload-book")
    public ResponseEntity<String> setPost(@RequestParam("userName") String userName,
                                          @RequestParam("Image") MultipartFile image,
                                          @RequestParam("description") String description,
                                          @RequestParam("file") MultipartFile file,
                                          @RequestParam("author") String author,
                                          @RequestParam("bookName") String bookName,
                                          @RequestParam("type") String type){
        try {
            byte[] imageBytes = image.getBytes();
            byte[] fileBytes = file.getBytes();
            Blob blobImage = new javax.sql.rowset.serial.SerialBlob(imageBytes);
            Blob blobFile = new javax.sql.rowset.serial.SerialBlob(fileBytes);

            BookEntity bookEntity = new BookEntity();
            bookEntity.setUserName(userName);
            bookEntity.setImage(blobImage);
            bookEntity.setBook(blobFile);
            bookEntity.setDescription(description);
            bookEntity.setAuthor(author);
            bookEntity.setBookName(bookName);
            bookEntity.setType(type);
            bookService.saveBook(bookEntity);
            return ResponseEntity.ok().body("successfull");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable("id") int id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint to update the description of a video post
    @PatchMapping("/descriptionUpdate/{id}/{description}")
    public ResponseEntity<String> updateDescription(@PathVariable("id") int id,
                                                    @PathVariable("description") String newDescription) {
        bookService.updateDescription(id, newDescription);
        return ResponseEntity.ok("Successfully updated description");
    }

}
