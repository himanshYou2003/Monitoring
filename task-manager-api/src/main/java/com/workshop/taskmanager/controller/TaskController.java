package com.workshop.taskmanager.controller;

import com.workshop.taskmanager.model.Task;
import com.workshop.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @PutMapping("/{id}/status")
    public Task updateStatus(@PathVariable Long id) {
        Task task = taskRepository.findById(id).orElseThrow();
        String currentStatus = task.getStatus();
        
        if ("Created".equals(currentStatus)) {
            task.setStatus("WIP");
        } else if ("WIP".equals(currentStatus)) {
            task.setStatus("Completed");
        }
        
        return taskRepository.save(task);
    }
}
