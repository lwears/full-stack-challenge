# full-stack-challenge

This is a code test application built for NC to demonstrate my development skillset, specifically: firebase and frontend
The project is built using Vite & React and Tailwind CSS & DaisyUI.

## 🌐 Deployed app

<https://lwears-21-08.web.app>

## 📱 Usage

Using the app is straightforward. Follow these steps to authenticate using your phone number:

1. Input your phone number in international format, for example: `+460740741234`.

2. Click the **"Send Code"** button. This will trigger a verification code to be sent to your phone.

3. Once you receive the code, enter it into the verification code field.

4. Click the **"Verify Code"** button to complete the verification process.

After successfully verifying the code, you will be redirected to the profile page.

## 🚀 Getting Started

### 📋 Prerequisites

- [Node.js (v16.x or higher) and Yarn](https://nodejs.org/en/download/) (for the frontend)

### ▶️ Run All Firebase emulators

From the root level run:

```bash
yarn
yarn serve
```

Browse to <http://localhost:5000>

## 🚧 Future Improvements

- Implement Testing
- Setup AppCheck
- There is a bug when hitting enter on verification code on login page. It essentially executes the first button initiating another request for verification code.

## 📦 Dependencies

### 🖥️ Frontend

- [Tailwind CSS](https://tailwindcss.com/)(CSS utility classes)
- [Daisyui](https://daisyui.com/)(Component class names for Tailwind CSS)
- [Zod](https://zod.dev/)(Schema validation)
- [ReactFire](https://github.com/FirebaseExtended/reactfire)(Hooks to make working with firebase easier)
- [React-Hook-Form](https://react-hook-form.com/)(Form management for login and profile updating)
- [Sonner](https://sonner.emilkowal.ski/)(Simple Toasts)

## 🛠️ GitHub Workflows

I set up GitHub workflows to automate the deployment process for both the frontend and Firebase Cloud Functions:

- **Frontend Deployment:** The workflow automatically builds and deploys the frontend to Firebase Hosting whenever changes are pushed to the main branch. This ensures that the latest version of the app is always live.

- **Firebase Functions Deployment:** Another workflow handles the deployment of Firebase Cloud Functions. It triggers whenever updates are made to the Firebase functions directory, so the backend code is updated seamlessly.

These workflows help streamline the deployment process and keep the development workflow efficient. Feel free to check out the `.github/workflows` directory in the repository for the configuration details.

## 📝 Note to Reviewers

Thank you for taking the time to review this project. I’d like to provide some context about my development process and the choices I made during the project:

1. **Learning Curve with Firebase:**  
   This was my first time working with Firebase and its ecosystem, including emulators, deployment, callable functions, and Firestore. It took me approximately 12 hours to become comfortable with these concepts and tools. During this time, I spent a lot of time experimenting and learning to understand how Firebase works and how to integrate its services effectively.

2. **Commit History:**  
   You may notice that one of the first commits contained a huge amount of code. I acknowledge that committing everything at once is not the best practice. This was a result of getting lost in the process of learning and building the application. I hope this does not detract from the overall review, and I appreciate your understanding.

3. **Testing Challenges:**  
   I started working on adding tests but ran into some issues getting them to work properly, specifically mocking firebase. I ran out of time to finalize them, so I’ve included the initial test setup in the commit. Although these tests are not functioning as intended, I left them in place for your reference and to demonstrate the effort I made in trying to implement them.

4. **Project Enjoyment:**  
   Overall, this project was a lot of fun. Even though there were some bumps along the way, diving into Firebase was a great learning experience. I picked Firebase Hosting, Functions, and Firestore because they all work well together and I thought it would make things easier to connect everything smoothly. I choose the frontend frameworks (React, RHF, Zod etc) simply because I have the most experience with them.
5. **Firebase Deployment**:
   The app is deployed to the us-central1 region. Initially, I considered changing it to a European location, but found that once a Firebase project is created, its region cannot be changed. Additionally, Firebase Auth can only have its region set to us-central1. This was a limitation I encountered during the setup.

Thank you for your understanding and for reviewing my work. If you have any questions or need further clarifications, please feel free to ask.
