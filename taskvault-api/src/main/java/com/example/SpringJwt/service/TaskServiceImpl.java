package com.example.SpringJwt.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import javax.management.RuntimeErrorException;

import org.springframework.core.task.TaskDecorator;
import org.springframework.stereotype.Service;

import com.example.SpringJwt.dto.TaskDTO;
import com.example.SpringJwt.model.Task;
import com.example.SpringJwt.model.Users;
import com.example.SpringJwt.model.enums.TaskStatus;
import com.example.SpringJwt.repository.ITaskRepository;
import com.example.SpringJwt.repository.IUserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements ITaskService {

    private final ITaskRepository taskRepository;
    private final IUserRepository userRepository;

    private Function<Task, TaskDTO> mapToDTO = t -> new TaskDTO(
            t.getId(),
            t.getTitle(),
            t.getDescription(),
            t.getStatus(),
            t.getCreateAt(),
            t.getUpdateAt());

    private final Function<TaskDTO, Task> mapToEntity = dto -> {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus());
        return task;
    };

    @Override
@Transactional
public TaskDTO save(TaskDTO taskDTO, Long userId) {

    Users user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    Task newTask = mapToEntity.apply(taskDTO);
    newTask.setUser(user);
    newTask.setCreateAt(LocalDate.now());

    if (newTask.getStatus() == null) {
        newTask.setStatus(TaskStatus.PENDING);
    }

    Task saved = taskRepository.save(newTask);
    return mapToDTO.apply(saved);
}


    @Override
    public void delete(Long id) {
        if (!this.taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found");
        }
        this.taskRepository.deleteById(id);

    }

    @Override
    public TaskDTO update(Long id, TaskDTO task) {
        Task existingTask = this.taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setStatus(task.getStatus());
        existingTask.setUpdateAt(LocalDate.now());
        return mapToDTO.apply(this.taskRepository.save(existingTask));

    }

    @Override
    public Optional<Task> findById(Long id) {
        return this.taskRepository.findById(id);
    }

    @Override
    public List<TaskDTO> findByUserId(Long userId) {
        return this.taskRepository.findByUserId(userId).stream().map(mapToDTO).toList();
    }

    @Override
    public List<TaskDTO> findByUserIdAndStatus(Long userId, TaskStatus status) {

        if (status == null) {
            return List.of();
        }

        return taskRepository.findByUserIdAndStatus(userId, status)
                .stream()
                .map(mapToDTO)
                .toList();
    }

}
