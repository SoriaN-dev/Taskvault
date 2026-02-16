package com.example.SpringJwt.restcontroller;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.SpringJwt.dto.TaskDTO;
import com.example.SpringJwt.model.enums.TaskStatus;
import com.example.SpringJwt.security.JwtUtil;
import com.example.SpringJwt.service.ITaskService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final ITaskService taskService;
    private final JwtUtil jwtUtil;

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.taskService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> update(@PathVariable Long id, @RequestBody TaskDTO task) {
        TaskDTO updatedTask = this.taskService.update(id, task);
        return ResponseEntity.ok(updatedTask);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TaskDTO>> getTasksByUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        Long userId = jwtUtil.getUserIdFromToken(token);

        return ResponseEntity.ok(taskService.findByUserId(userId));
    }

    @PostMapping()
    public ResponseEntity<TaskDTO> save(@RequestHeader("Authorization") String authHeader, @RequestBody TaskDTO task) {
        String token = authHeader.replace("Bearer ", "");
        Long userId = jwtUtil.getUserIdFromToken(token);
        TaskDTO savedTask = this.taskService.save(task, userId);
        return ResponseEntity.ok().body(savedTask);

    }

    @GetMapping("/status")
    public ResponseEntity<List<TaskDTO>> getTasks(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam(required = false) TaskStatus status) {

        Long userId = jwtUtil.getUserIdFromToken(
                authHeader.replace("Bearer ", ""));

        return ResponseEntity.ok(
                taskService.findByUserIdAndStatus(userId, status));
    }
}
