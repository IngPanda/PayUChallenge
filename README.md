# PayUChallenge

This project implements a basic payment processing platform using Node.js and TypeScript. It provides functionality for processing credit card payments, performing anti-fraud analysis, and interacting with a bank service to validate and complete purchases. Refund operations are also supported.

## Installation

1. Clone the Repository

```bash
git clone https://github.com/IngPanda/PayUChallenge.git
```
2. Navigate into the Project Directory

```bash
cd PayUChallenge
```
3. Install Dependencies

```bash
npm install
```

4. Run Server
```bash
npm start
```

## Usage

```bash
import foobar

curl --location 'http://localhost:3000/api/payments' \
--header 'Content-Type: application/json' \
--data '{
    "cardHolderName": "John Doe",
    "cardNumber": "4111111111111111",
    "expirationDate": "12/25",
    "amount": 100.00
}
'
```

## Create a .env File

```makefile 
MONGODB_URI=mongodb+srv://samueluseche87:iqOlQiXJLEWBZvc5@payuchallenge.mftnb.mongodb.net/
BANK_SERVICE_URL=http://example-bank-service.com/api/charge
ANTI_FRAUD_SERVICE_URL=http://example-antifraud-service.com/api/validate
```

## Testing

```bash
npm test
```
## Technologies Used
+ Node.js: JavaScript runtime for server-side applications.
+ TypeScript: Strongly typed superset of JavaScript.
+ Express: Web framework for building RESTful APIs.
+ dotenv: Library for managing environment variables.
+ Jest: Testing framework for unit and integration tests.
+ MongoDB:  Database for storing transaction data.

## Author

+ Samuel Useche