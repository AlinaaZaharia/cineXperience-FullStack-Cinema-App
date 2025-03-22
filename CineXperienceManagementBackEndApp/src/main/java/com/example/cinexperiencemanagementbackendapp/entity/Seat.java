package com.example.cinexperiencemanagementbackendapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "seat")
public class Seat {

    @JsonProperty("id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("roww")
    @Column(nullable = false)
    private int roww;

    @JsonProperty("number")
    @Column(nullable = false)
    private int number;

    @JsonProperty("reserved")
    @Column(nullable = false)
    private boolean reserved;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private MovieSession session;

    // Constructors
    public Seat() {}

    public Seat(Long id, int roww, int number, boolean reserved, MovieSession session) {
        this.id = id;
        this.roww = roww;
        this.number = number;
        this.reserved = reserved;
        this.session = session;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public int getRoww() {
        return roww;
    }

    public int getNumber() {
        return number;
    }

    public boolean isReserved() {
        return reserved;
    }

    public MovieSession getSession() {
        return session;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setRoww(int roww) {
        this.roww = roww;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public void setReserved(boolean reserved) {
        this.reserved = reserved;
    }

    public void setSession(MovieSession session) {
        this.session = session;
    }
}
