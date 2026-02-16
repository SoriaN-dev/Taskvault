package com.example.SpringJwt.model;


import java.time.LocalDate;

import com.example.SpringJwt.model.enums.TaskStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.example.SpringJwt.model.Users;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "task")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long id;
    
    @Column(name = "task_title")
    private String title;

    @Column(name = "task_description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "task_status")
    private TaskStatus status;

    @Column(name = "task_create_at")
    private LocalDate createAt;
    @Column(name = "task_update_at")
    private LocalDate updateAt;

    @ManyToOne()
    @JoinColumn(name = "user_id_task")
    private Users user;
    

}
