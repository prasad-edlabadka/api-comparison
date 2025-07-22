# Account Information Service (Legacy Java Example)

This project demonstrates a legacy Java 8 service architecture with two layers:

- **Gateway Layer:** Handles input, validation, and transformation.
- **Business Layer:** Contains business logic and backend communication.

## Structure

```
src/main/java/com/example/account/
  egs/   # Gateway layer (interface + implementation)
  ebs/   # Business layer (interface + implementation)
  model/ # Request/Response models
```

## How it works
- The Gateway layer receives a request, validates it, and calls the Business layer.
- The Business layer simulates business logic and returns a response.

## Usage
This is a plain Java 8 project. You can instantiate and use the services in your own test or main class, e.g.:

```java
AccountInformationBusiness business = new AccountInformationBusinessImpl();
AccountInformationGateway gateway = new AccountInformationGatewayImpl(business);

AccountInformationRequest req = new AccountInformationRequest();
req.setAccountId("12345");
AccountInformationResponse resp = gateway.processRequest(req);
System.out.println(resp.getAccountName() + ": " + resp.getBalance());
```

## Build
```
mvn clean package
```

---
This project is for experimentation and demonstration of legacy service patterns. 