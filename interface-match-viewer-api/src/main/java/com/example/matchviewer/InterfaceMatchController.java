package com.example.matchviewer;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/matches")
public class InterfaceMatchController {
    private final InterfaceMatchRepository repository;
    private static final Logger logger = LoggerFactory.getLogger(InterfaceMatchController.class);

    public InterfaceMatchController(InterfaceMatchRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<InterfaceMatch> getAll() {
        logger.info("Fetching all interface matches from MongoDB");
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public InterfaceMatch getById(@PathVariable String id) {
        logger.info("Fetching interface match by id: {}", id);
        return repository.findById(id).orElse(null);
    }
} 