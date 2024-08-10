
# Budgetwise
### A personal finance management system

Designed and implemented a personal finance management system that helps users track their income, expenses, and savings goals. The system should allow users to add, view, update, and delete financial transactions, categorize them, and generate reports to understand their spending patterns.



## Features

### User Management
- **Registration and Login**: Users can register and log in to the system with their credentials (Javascript Web Tokens).
- **Unique User Profiles**: Each user has a unique profile that includes personal details such as name, email and monthly income.

### Transaction Management
- **Add Transactions**: Users can add financial transactions with details including amount, date, category (e.g., Food, Rent, Entertainment), description and Transaction type (paid or received).
- **View Transactions**: Users can view a list of their transactions.
- **Update Transactions**: Users can update the details of their existing transactions.
- **Delete Transactions**: Users can delete transactions from their records.

### Category Management
- **Add Custom Categories**: Users can create custom categories for their transactions.
- **Manage Categories**: Users can view and manage their custom categories.

### Data Persistence
- **Persistent Data**: All user data, transactions, categories, and savings goals are stored and managed in a database, ensuring data is retained across sessions.



## TechStack

MERN

- **M** - MondoDB to user credentials
- **E** - Express.js to create the server
- **R** - React.js for frontend development
- **N** - Node.js for managing packages, and backend development



<!-- ## Demo

### Demo Video
[Budgetwise]()

### Login Page
![Login](image-4.png)

### Registration Page
![Register](image-5.png)

### Dashboard
(![Dashboard](image.png))

### Adding Transaction
![Add Transaction](image-2.png)

### Adding Category
![Add Category](image-3.png) -->

## Demo

### Demo Video
[Budgetwise]()

<details>
  <summary>Login Page</summary>
  <img src=".\client\src\assets\image-1.png" alt="Login">
</details>

<details>
  <summary>Registration Page</summary>
  <img src=".\client\src\assets\image-5.png" alt="Register">
</details>

<details>
  <summary>Dashboard</summary>
  <img src=".\client\src\assets\image.png" alt="Dashboard">
</details>

<details>
  <summary>Adding Transaction</summary>
  <img src=".\client\src\assets\image-2.png" alt="Add Transaction">
</details>

<details>
  <summary>Adding Category</summary>
  <img src=".\client\src\assets\image-3.png" alt="Add Category">
</details>



## Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (running locally or a MongoDB Atlas account)



## Installation

The project is run locally on your machine. To run it, follow the respctive steps.

**1. Clone the Repository**

   - Open a terminal or command prompt.
   - Clone the repository using the following command:
     ```bash
     git clone https://github.com/HarshGupta-2002/Budgetwise.git
     ```
   - Navigate to the `Budgetwise` directory:

     ```bash
     cd Budgetwise
     ```

**2. Server Setup**
   - Navigate to the server directory (from the root- Budgetwise directory):
     ```bash
     cd server
     ```
   - Install the required Node.js dependencies:
     ```bash
     npm install
     ```
   - Set up environment variables:
     - Create a `.env` file in the `server` directory.
     - Add the following environment variables:
       ```env
       PORT=5000
       MONGO_URI=your_mongodb_connection_string/database_name
       JWT_SECRET=your_jwt_secret
       ```
     - Replace `your_mongodb_connection_string/database_name` and `your_jwt_secret` with your actual MongoDB connection string with the database name and JWT secret.
    
- Start the server
    ```bash
    npm start
    ```

**3. Client Setup**
   - Navigate to the client directory (from the root- Budgetwise directory):
     ```bash
     cd client
     ```
   - Install the required Node.js dependencies:
     ```bash
     npm install
     ```
- Set up environment variables:
    - Create a `.env` file in the `client` directory.
    - Add the following environment variable:
        ```env
        REACT_APP_API_BASE_URL=http://localhost:5000
        ```
- Start the server
```bash
npm start
```



## Database Design

The project uses MongoDB as the database, with the following models:

### 1. **User Model**
   - **Collection Name:** `users`
   - **Fields:**
     - `name` (String) - The full name of the user.
     - `email` (String) - The unique email address of the user.
     - `password` (String) - The hashed password for authentication.
     - `income` (Number) - The monthly income of the user
     - `createdAt` (Date) - The date when the user account was created.

### 2. **Transaction Model**
   - **Collection Name:** `transactions`
   - **Fields:**
     - `userId` (ObjectId) - Reference to the user who owns the transaction.
     - `amount` (Number) - The amount of the transaction.
     - `date` (Date) - The date of the transaction.
     - `category` (String) - The category of the transaction (e.g., Food, Rent, Entertainment).
     - `description` (String) - A brief description of the transaction.
     - `type` (String) - The type of transaction, either `paid` or `received`.
     - `createdAt` (Date) - The date when the transaction was created.

### 3. **Category Model**
   - **Collection Name:** `categories`
   - **Fields:**
     - `userId` (ObjectId) - Reference to the user who owns the category.
     - `name` (String) - The name of the category.
     - `createdAt` (Date) - The date when the category was created.



## To-do

### Savings Goals
- **Set Savings Goals**: Users can set savings goals with a target amount and a target date.
- **Track Progress**: The system automatically tracks progress towards these goals based on the user's transactions.

### Reports
- **Visual Representations**: Reports include visual aids such as pie charts and bar graphs to represent spending categories.

### Responsiveness
- **Screen Optimization**: Ensure the application is fully responsive and works seamlessly on all screens.



## Author

- [@HarshGupta-2002](https://github.com/HarshGupta-2002)