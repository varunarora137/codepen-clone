# CodePen Clone

A web application that replicates the core functionality of CodePen, allowing users to create and save code snippets (pens) with HTML, CSS, and JavaScript. This clone utilizes Firebase for real-time database management and authentication, and CodeMirror as the code editor. Also it provides AI chatbot for fast problem solving.

## Hosted Link

[Click Here](https://codepen-clone-geek.netlify.app/)

## Images

### Landing Page

![Landing Page](https://github.com/varunarora137/codepen-clone/blob/main/src/imgs-for-readme/main.png)

### Home Page

![Home Page](https://github.com/varunarora137/codepen-clone/blob/main/src/imgs-for-readme/projects.png)

### Editor

![Editor](https://github.com/varunarora137/codepen-clone/blob/main/src/imgs-for-readme/code.png)

### AI Chatbot

![AI](https://github.com/varunarora137/codepen-clone/blob/main/src/imgs-for-readme/ai.png)

## Features

- **User Authentication**: Users can sign in with Google or GitHub accounts.
- **Real-Time Database**: Store and retrieve code snippets (pens) in real-time using Firebase Firestore.
- **Code Editor**: Integrated CodeMirror for a powerful and customizable code editing experience.
- **Create & Edit Pens**: Users can create, edit, and delete their code snippets.
- **Live Preview**: View HTML, CSS, and JavaScript changes in real-time.
- **AI Implementaion**: Ask any question on the fly without switching tabs.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Firebase**: Used for authentication and Firestore database.
  - **Firebase Authentication**: Google and GitHub OAuth for user sign-in.
  - **Firestore**: Real-time database for storing user data and code snippets.
- **React Router**: For managing navigation and routes within the application.
- **Redux**: State management for handling user and project data.
- **CodeMirror**: Syntax-highlighted code editor with customizable options.
- **React Icons**: For using icons in the user interface.
- **Gemini**: For AI Implementation

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine.
- Firebase project set up with Authentication (Google and GitHub) and Firestore enabled.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/codepen-clone.git
   cd codepen-clone

   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the development server:**

   ```sh
   npm start
   ```

4. **Setup Firebase**

   - Create a Firebase project and add the Firebase SDK to your React app.
   - Configure Firebase authentication (email/password).
   - Configure Firestore.
   - Store your Firebase credentials in a `.env` file.

5. **Gemini Setup**

   - Create API KEY for Gemini And add it to .env file

6. **Run the Application**

```sh
  npm run dev
```

## Usage

- **Sign In**: Use the Google or GitHub sign-in buttons to authenticate.
- **Create a Pen**: Click on "New Project" to start a new code snippet.
- **Edit and Save**: Edit your HTML, CSS, and JavaScript code using CodeMirror. Save your changes to the Firebase Firestore.
- **View and Manage Pens**: View all your saved pens on the home page, and click on any pen to edit or delete it.

## Project Structure

- `src/components`: Contains all the React components.
- `src/firebase.js`: Firebase configuration and initialization.
- `src/Store`: Redux store and slices for managing state.
- `src/App.jsx`: Main application component.

## Acknowledgements

- **Firebase**: Backend services for authentication and database.
- **CodeMirror**: In-browser code editor.
- **React**: Frontend library for building the UI.
- **Gemini API**: Provides chatbot functionality.
