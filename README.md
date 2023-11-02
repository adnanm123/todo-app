# LAB - Context API

## To Do List Manager Phase 1

Incorporate configuration settings into the application.

### Overview

Currently, users can add todo tasks to the proof-of-life starter application. In this phase, we'll introduce default context settings into the app, allowing the user to view three incomplete todo tasks. Additionally, pagination will enable users to view any other incomplete tasks.

### Phase 1 Requirements

In this phase, we're refactoring a Todo app developed by another team. The aim is to make the application production-ready by integrating Context API, ensuring modularity, and incorporating the Mantine Component API for styling.

- Draft a detailed UML.
- Modularize the application (follow the proposed file structure).
- Incorporate the Context API for managing application settings.
- Default settings:
  - Display three items.
  - Hide completed tasks.
  - Sort by 'difficulty'.
- Style with Mantine Component API. Remember, achieving 80% of the design might consume only 20% of the time. Aim to get the design mostly right by the week's end.

![UML](uml.png)

## To Do List Manager Phase 2

### Overview

In this phase, we will further enhance our application by adding new features, refining the design, and ensuring that our app is more interactive and user-friendly. This will be achieved by integrating additional components, improving state management, and enhancing user experience through animations and transitions.

### Phase 2 Requirements

- **Enhanced Pagination:** Improve the pagination introduced in phase 1 to provide a more intuitive user experience. Include options for next, previous, and specific page numbers.
- **Interactive UI:** Introduce interactive elements such as hover effects, animations, and transitions to make the application more engaging.
- **Refined Design:** Revisit the design from phase 1 and refine it. Make sure all the components are consistent in terms of design, typography, and color scheme.
- **Additional Features:**
  - **Search Functionality:** Allow users to search for specific tasks using keywords.
  - **Filters:** Incorporate filters that let users view tasks based on categories or tags.
  - **Notifications:** Introduce a notification system to alert users about upcoming tasks or deadlines.
- **Testing:** Ensure that all the new features and components are well-tested. Incorporate unit tests, integration tests, and end-to-end tests.
- **Documentation:** Update the project documentation to include details about the new features, design decisions, and any changes made in phase 2.

Note: Ensure that the application remains modular. Avoid any monolithic components or functions. Keep the code clean, readable, and well-documented.

## To Do List Manager Phase 3

### Overview

In this final phase, we’ll be requiring that users be logged in, in order to see the to-do items. Additionally, based on their user type, they will be allowed (or denied) to perform actions such as editing or deleting them.

### Phase 3 Requirements

In Phase 3, we'd like to extend the functionality of the application by requiring users to be logged in to view items and also restrict access based on user type. The user stories from Phases 1 and 2 remain unchanged. For this phase, we are now adding the following new user stories.

- As a user, I want to provide a way for other users to create new accounts.
- As a user, I want to provide a way for all users to log in to their account.
- As a user, I want to make sure that my To-Do items are only viewable to users who have logged in with a valid account.
- As a user, I want to ensure that only fellow users who are allowed to "create," based on their user type, can add new To-Do Items.
- As a user, I want to ensure that only fellow users who are allowed to "update," based on their user type, can mark To-Do Items complete.
- As a user, I want to ensure that only fellow users who are allowed to "delete," based on their user type, can delete new To-Do Items.
