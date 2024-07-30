# Capstone 2 Task Manager Application

## Project Goal: 

The goal of the Task Manager application is to provide users with a robust platform for managing their tasks and tracking their progress. Key features include task creation, and status tracking, making it easier for users to organize their workload and increase productivity.

## Objectives:
- **Task Creation and Configuration:** Users can create tasks and configure styles for tasks based on importance.
- **Status Tracking:** Track the progress of each task from creation to completion, ensuring users stay on top of their responsibilities.
- **User-Friendly Interface:** Develop a user-friendly interface for easy navigation and task management.

## Target Users: 
The primary users of the Task Manager application are individuals looking to enhance their productivity and organization. This includes anyone interested in efficiently managing their tasks and projects.

## Platform: 
The Task Manager application will be a web-based platform accessible on both desktop and mobile devices, ensuring users can manage their tasks anytime, anywhere.

## Data Sources:
The application will primarily rely on user-generated data, including task details, and progress updates.

## Tech Stack:
- **Frontend:** Angular, TypeScript, HTML, SCSS
- **Backend:** Express.js, Apache Cassandra

## Project Breakdown:
### 1. Setting Up Project Environment:
- Install Node.js and Express.js for the backend.
- Install Angular CLI for frontend development.
- Set up CassandraDB for the database.
- Install necessary libraries and tools, such as `cassandra-express` for Cassandra DB interaction.

### 2. Create Models and Schemas:
- **User Model:** Define a model to store user information, including username, email, and password.
- **Task Model**: Define a model to store task details, including title, description, and activity

### 3. Authentication and Authorization:
- Implement middleware to check the validity of user data for adding, updating, and deleting lists and cards.
- Secure work area route to allow only authenticated users to access specific workspaces.

### 4. Task Management Features:
- **Task Creation:** Allow users to create tasks with relevant details.
- **Status Tracking:** Implement status tracking to show progress, including statuses like "Not Started," "In Progress," and "Completed."
- **Task Management:** Allow users to update or delete tasks.

### 5. Frontend Development:
- Set up Angular components and services for task management features.
- Implement routing to navigate between different views, such as task list, task details, and user profile.

### 6. Testing and Debugging:
- Test the application thoroughly using tools like Jasmine or Karma for Angular, and Mocha for backend testing.
- Debug any issues that arise during testing to ensure a smooth user experience.

### 7. Deployment:
- Deploy the backend using a cloud service like AWS or SupaBase.
- Deploy the frontend using a service like Netlify or Render.
- Ensure the application is secure, scalable, and ready for potential future updates.

## Stretch Goals:
- Integration with Google Calendar: Integrate with Google Calendar to streamline task management.
- Allow users to select from different workspace templates.
