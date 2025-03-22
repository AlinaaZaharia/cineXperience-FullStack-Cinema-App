package com.example.cinexperiencemanagementbackendapp.entity;

import com.example.cinexperiencemanagementbackendapp.enums.GenreType;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Movie")
public class Movie {
    @JsonProperty("id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonProperty("title")
    private String title;

    @Column(length = 2000)
    @JsonProperty("description")
    private String description;

    @ElementCollection(targetClass = GenreType.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "genres")
    @JsonProperty("genres")
    private List<GenreType> genres;

    @JsonProperty("duration")
    private int duration;

    @JsonProperty("posterUrl")
    private String posterUrl;
}
