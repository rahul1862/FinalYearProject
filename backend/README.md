# Backend

Spring Boot REST API for the ecommerce app, backing the frontend in the repo root.

## Stack

- Java 17, Spring Boot (Spring Web, Spring Data JPA)
- MySQL

## Modules

- `entity` – JPA entities (`Category`, `Product`, `Users`)
- `repository` – Spring Data repositories
- `dto` / `mapper` – request/response DTOs and entity-DTO mapping
- `service` / `service.serviceImpl` – business logic
- `controller` – REST endpoints for categories, products and users
- `exception` – centralized error handling via `GlobalExceptionHandler`
- `util` – shared response wrapper (`ApiResponseMessage`)

## Running locally

1. Create a MySQL database and update `src/main/resources/application.properties` with your credentials.
2. Run the app:

   ```bash
   ./mvnw spring-boot:run
   ```

The API starts on `http://localhost:8989`.
