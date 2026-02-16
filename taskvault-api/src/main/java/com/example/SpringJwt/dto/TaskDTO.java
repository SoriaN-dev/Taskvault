package com.example.SpringJwt.dto;
import com.example.SpringJwt.model.enums.TaskStatus;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private LocalDate createAt;
    private LocalDate updateAt;

}
