# Blog App

The Blog App is a React native app for posting, allowing you to create and read posts.

## Requirements

-   NodeJS v16
-   Android Studio
-   JDK11

## How to run it locally

- Replace the BASE_URL in the constants file with your local ip address so it points to your local dev server.
- Run ```npm i``` in the project root to install dependencies.
- Navigate to ```./android``` and run ```./gradlew clean```.
- ```npm start``` in the project root.
- Ensure you have an Android device (with developer mode enabled) connected or an Android Emulator setup and running.
- Once the ```clean``` task has completed run ```npx react-native run-android``` to build the android app locally.
- The app will build onto the connected device. 
