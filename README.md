# Overview
- This repository serves as a Web Client for Symptom Checker application.
- Web Client provides a user-friendly UI for users and is responsible for :
  - communication with **[Shared Backend](https://github.com/prak112/Symptom-Checker-backend)** 
  - authentication prompt modal to register as user or guest
  - main screen with input and analysis selection for diagnosing symptoms,
  - sidebar navigation with access to auth, profile, FAQs and history,
  - loading screen with approximate response times,
  - diagnosis screen with summarized display under symptom headings with symptom-relative scoring and redirection for further reading.
- <em>A disclaimer is clear displayed at the footer of the application UI at all times about possible inaccuracies that could be generated.</em>

- Prototype, plan and implementation of the Symptom Checker application are defined in the [prototype README](https://github.com/prak112/ICD11-SymptomChecker#overview)
- Tools and Technologies used : 
    - `react`
    - `material-ui`
    - `axios`


## Workflow
- Sequence Diagram rendered using *Mermaid*
- Refer [Backend Workflow](https://github.com/prak112/Symptom-Checker-backend#workflow)

```mermaid
sequenceDiagram
    box Blue CLIENT
    participant UI
    participant FRONTEND
    end

    box Purple SERVER
    participant BACKEND
    end

    UI->>+FRONTEND: User opens application
    FRONTEND-->>-UI: ReactJS : render <App />

    UI->>+FRONTEND: Auth : User registers from <Sidebar />
    FRONTEND-->>-UI: React Router : render <Signup /> modal
    alt Registration Valid
        UI->>+FRONTEND: Auth: User inputs information
        Note over FRONTEND: <Signup /> validation - PASSED
        FRONTEND->>+BACKEND: Auth Service : POST /public/auth/signup
        Note over BACKEND: Backend-Database validation - PASSED   
        BACKEND-->>-FRONTEND: Auth Controller : return User {username: '', symptom: []}
        Note over FRONTEND: <AlertProvider /> state success
        FRONTEND-->>-UI: React Router : redirect to <Login /> modal
    else Frontend Validation Error
        UI->>+FRONTEND: Auth: User inputs information
        Note over FRONTEND: <Signup /> validation - FAILED
        Note over FRONTEND: <AlertProvider /> state error
        FRONTEND-->>-UI: Alert Context : <AlertProvider /> show notification banner
    else Backend-Database Validation Error
        UI->>+FRONTEND: Auth: User inputs information
        Note over FRONTEND: <Signup /> validation - PASSED
        FRONTEND->>+BACKEND: Auth Service : POST /public/auth/signup
        Note over BACKEND: Backend-Database validation - FAILED
        BACKEND-->>-FRONTEND: Auth Controller : ErrorHandler forwards response
        FRONTEND-->>-UI: Alert Context : <AlertProvider /> show notification banner
    end
    alt Valid Login
        UI->>+FRONTEND: Auth : User enters login credentials
        Note over FRONTEND: <Login /> validation - PASSED
        FRONTEND->>+BACKEND: Auth Service : POST /public/auth/login
        Note over BACKEND: Backend-Database validation - PASSED
        BACKEND-->>-FRONTEND: Auth Controller : sessionStorage created<br>'auth_token' packed in Request Header
        Note over FRONTEND: <AlertProvider /> state success
        Note over FRONTEND: <AlertProvider /> show notification banner
        FRONTEND-->>-UI: User Context : User-specific session created
    else Frontend Validation Error
        UI->>+FRONTEND: Auth: User inputs information
        Note over FRONTEND: <Login /> validation - FAILED
        Note over FRONTEND: <AlertProvider /> state error
        FRONTEND-->>-UI: Alert Context : <AlertProvider /> show notification banner
    else Backend-Database Validation Error
        UI->>+FRONTEND: Auth: User inputs information
        Note over FRONTEND: <Login /> validation - PASSED
        FRONTEND->>+BACKEND: Auth Service : POST /public/auth/login
        Note over BACKEND: Backend-Database validation - FAILED
        BACKEND-->>-FRONTEND: Auth Controller : ErrorHandler forwards response
        Note over FRONTEND: <AlertProvider /> state error
        FRONTEND-->>-UI: Alert Context : <AlertProvider /> shows notification banner
    end

    alt Valid Input <SymptomForm />
        UI->>+FRONTEND: User : inputs symptoms in <SymptomForm />
        Note over FRONTEND: <SymptomForm /> validation - PASSED
        FRONTEND->>+BACKEND: POST /api/protected/symptoms/general or /specific
	    Note over BACKEND: Validate and Sanitize User input  
        BACKEND-->>-FRONTEND: SymptomChecker Controller: diagnosisData {'topResult': {}, 'includedResults': {}, 'excludedResults': {}}
        FRONTEND-->>-UI: <SymptomForm /> : render <Diagnosis />
    else No Input <SymptomForm />
        UI->>+FRONTEND: User : User clicks 'Diagnose' without input
        Note over FRONTEND: <SymptomForm /> validation - FAILED
        FRONTEND-->>-UI: prompt User to fill form
    end
    UI->>+FRONTEND: Auth : User logs out from <Sidebar />
    FRONTEND-->>-UI: Auth : <Logout /> modal asks confirmation
    alt User confirms Logout
        UI->>+FRONTEND: Auth : User confirms logout
        FRONTEND-->>-UI: User Context : sessionStorage cleared, User redirected to <App />
    else User cancels Logout
        UI->>+FRONTEND: Auth : User cancels logout
        FRONTEND-->>-UI: Auth : User redirected to <App />
    end
```

<hr>
<br>


# Usage
- Make sure you have `node`(v`20.11.0`) and `npm`(v`10.5.0`) installed on your machine before running these commands.

- Clone the project
```bash
    git clone https://github.com/prak112/Symptom-Checker-frontend.git
```

- Install dependencies using `npm`
```bash
    cd Symptom-Checker-frontend/symptom-checker-frontend
    npm install
```

- Run the development server
```bash
    npm run dev
```

<hr>
<br>

# Credits
- **Coding Assistants** : 
    - GitHub Copilot
    - Pieces Copilot
- **Documentation Tool** : Mermaid

<hr>
<hr>
