package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO {
    private int id;
    private String userName;
    private String bookName;
    private String image;
    private String book;
    private String description;
    private String author;
    private String type;
}
