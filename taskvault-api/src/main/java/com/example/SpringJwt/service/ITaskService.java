package com.example.SpringJwt.service;

import java.util.List;
import java.util.Optional;

import com.example.SpringJwt.dto.TaskDTO;
import com.example.SpringJwt.model.Task;
import com.example.SpringJwt.model.enums.TaskStatus;

public interface ITaskService {

    TaskDTO save(TaskDTO task, Long userId);
    void delete(Long id);
    TaskDTO update(Long id, TaskDTO task);
    Optional<Task> findById(Long id);
    List<TaskDTO> findByUserId(Long userId);
    List<TaskDTO> findByUserIdAndStatus(Long userId, TaskStatus status);
    

}
