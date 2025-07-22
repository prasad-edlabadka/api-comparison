package com.example.matchviewer;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface InterfaceMatchRepository extends MongoRepository<InterfaceMatch, String> {
} 