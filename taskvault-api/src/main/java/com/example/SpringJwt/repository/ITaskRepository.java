package com.example.SpringJwt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.SpringJwt.model.Task;
import com.example.SpringJwt.model.enums.TaskStatus;

@Repository
public interface ITaskRepository extends JpaRepository<Task,Long>{
    List<Task> findByUserId(Long userId);
    List<Task> findByUserIdAndStatus(Long userId, TaskStatus status);

    
}
