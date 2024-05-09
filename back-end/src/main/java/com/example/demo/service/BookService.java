package com.example.demo.service;

import com.example.demo.dto.BookDTO;
import com.example.demo.entity.BookEntity;
import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    private String encodeToString(Blob image) {
        try {
            byte[] imgBytes = image.getBytes(1, (int) image.length());
            return Base64.getEncoder().encodeToString(imgBytes);
        } catch (Exception e) {
            return null;
        }
    }

    public List<BookDTO> getAllBooks() {
        // get all the books.
        List<BookEntity> bookEntityList = bookRepository.findAll();

        int length = bookEntityList.size();

        // initiate postDTO list to fill with data.
        List<BookDTO> postDTOS = new ArrayList<>(length);

        for (BookEntity bookEntity : bookEntityList) {
            String image = encodeToString(bookEntity.getImage());
            BookDTO bookDTO = new BookDTO();
            bookDTO.setType(bookEntity.getType());
            bookDTO.setAuthor(bookEntity.getAuthor());
            bookDTO.setId(bookEntity.getId());
            bookDTO.setImage(image);
            bookDTO.setDescription(bookEntity.getDescription());
            bookDTO.setBookName(bookEntity.getBookName());
            String book = encodeToString(bookEntity.getBook());
            bookDTO.setBook(book);
            bookDTO.setUserName(bookEntity.getUserName());

            postDTOS.add(bookDTO);
        }
        return postDTOS;
    }

    public void saveBook(BookEntity bookEntity) {
        bookRepository.save(bookEntity);
    }

    public void deleteBook(int bookId) {
        bookRepository.deleteById(bookId);
    }

    public void updateDescription(int id, String newDescription) {
        Optional<BookEntity> optionalPost = bookRepository.findById(id);
        if (optionalPost.isPresent()) {
            BookEntity post = optionalPost.get();
            post.setDescription(newDescription);
            bookRepository.save(post);
        }
    }


}
