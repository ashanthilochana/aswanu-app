
# Aswanu-App

A project built with a **React** front end, **Node.js** backend, and **Firebase** for authentication, Cloud Firestore, and real-time data.

---

## Steps to Start

To get the project up and running, follow these steps:

### 1. Clone the Repository

First, clone the project using the following command:

```bash
git clone https://github.com/ashanthilochana/aswanu-app.git
```
### 2. Backend Setup

1.  **Navigate to the `./backend` folder**:
    
	 ```bash
	cd ./backend
	```

2. **Create a `.env` file**:

-   In the `.env` file, add the following environment variable:
    
	```bash
	PORT=<your-preferred-port> # Make sure it's not 5000 as the React server runs on port 5000`
	```
3. **Firebase Configuration**:

-   Go to the `firebase` folder inside the `backend`:
	   ```bash 
	cd firebase
	```` 
    
-   There is a file named `firebase-key.json-example`. Read it and obtain a **service account key** from Firebase. 

-   Create a firebase-key.json file and paste your service account credentials to it.   

### 3. Installing Dependencies
Open two terminal windows:
1.  **Terminal 1 - Backend**:
    -   Navigate to the backend folder and install dependencies:
    ```bash   
    cd ./backend
    npm install
    ```
    -   After installation, start the development server:
        
    ```bash
	npm run dev
    ```
2.  **Terminal 2 - Frontend**:
    -   Navigate to the frontend folder and install dependencies:
     ```bash   
    cd ./backend
    npm install
    ```
   -   After installation, start the frontend server:
        
       ```bash
	   npm start
       ```
 
### 4. Happy Dev & Testing! 
