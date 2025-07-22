# compare-mts-api

This tool compares Java Gateway interfaces from MTS services to OpenAPI (OAS) specifications using a local GenAI model (LM Studio) and stores the analysis results in MongoDB.

## Features
- Scans MTS service projects for Gateway interfaces
- Loads OAS YAML files from the `oas/` directory
- Uses LM Studio (local LLM) to compare Java interface signatures to OAS specs
- Determines the closest OAS match for each service and explains why
- Stores results as JSON documents in MongoDB

## Configuration
- **LM Studio API:**
  - Endpoint: `http://localhost:1234/v1/chat/completions`
- **MongoDB:**
  - Host: `localhost`
  - Port: `27017`
  - Database: `mts-compare`
  - Collection: `results`

## Usage
1. Build the project:
   ```sh
   mvn clean package
   ```
2. Run the main class (to be implemented):
   ```sh
   java -cp target/compare-mts-api-1.0-SNAPSHOT.jar com.example.compare.CompareMain
   ```

## Output
- Each analysis result is stored as a JSON document in MongoDB, including:
  - Service name
  - Interface signature
  - Closest OAS spec filename
  - Explanation
  - (Optional) All scores/explanations

---
This project is for experimentation and GenAI-powered API matching. 