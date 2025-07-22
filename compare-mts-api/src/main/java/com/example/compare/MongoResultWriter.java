package com.example.compare;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class MongoResultWriter {
    private static final String DB = "mts-compare";
    private static final String COLLECTION = "results";
    private static final ObjectMapper mapper = new ObjectMapper();
    private final MongoCollection<Document> collection;

    public MongoResultWriter() {
        MongoClient client = MongoClients.create();
        MongoDatabase db = client.getDatabase(DB);
        collection = db.getCollection(COLLECTION);
    }

    public void writeResult(Object result) throws Exception {
        String json = mapper.writeValueAsString(result);
        collection.insertOne(Document.parse(json));
    }
} 