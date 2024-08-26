# Overview
- This file contains the README documentation for the Symptom Checker frontend project.
 
- The Symptom Checker frontend project is a web application that allows users to input their symptoms and receive possible diagnoses based on those symptoms.
- The application UI clearly displays a disclaimer at all times about the possible inaccuracies this application could generate.

- Prototype, plan and implementation of the Symptom Checker application are defined in the [prototype README](https://github.com/prak112/ICD11-SymptomChecker#overview)
- Tools and Technologies used : 
    - `react`
    - `material-ui`


## Workflow
```mermaid
sequenceDiagram
    box Blue CLIENT
    participant UI
    participant FRONTEND
    end
    box Purple SERVER
    participant BACKEND
    participant ICD11 API
    participant DATABASE
    end

    UI->>+FRONTEND: User : opens application
    FRONTEND-->>-UI: ReactJS : renders <App />
    loop Scheduled Renewal of Auth Token every hour
        BACKEND->>+ICD11 API: Api Auth Middleware : controllers/auth/apiAuthController.js
        ICD11 API-->>-BACKEND: Auth Token : Bearer, 3600 seconds validity
    end
    UI->>+FRONTEND: Auth : User registers from <Sidebar />
    FRONTEND-->>-UI: React-Router : renders <Signup /> modal
    UI->>+FRONTEND: Auth: User inputs information
    FRONTEND->>+BACKEND: Auth : call registerUser in services/auth.js
    BACKEND->>+DATABASE: Auth : create user in 'user' collection
    DATABASE-->>-BACKEND: Auth: return non-critical user information
    BACKEND-->>-FRONTEND: Auth : showAlert state success
    FRONTEND-->>-UI: Auth : redirects to <Login /> modal
    UI->>+FRONTEND: Auth : User enters login credentials
    FRONTEND->>+BACKEND: Auth : call authenticateUser in services/auth.js
    BACKEND->>+DATABASE: Auth : verify User login credentials
    DATABASE-->>-BACKEND: Auth : User exists
    BACKEND-->>-FRONTEND: Auth : sessionStorage created, 'auth_token' packed in httpCookie
    FRONTEND-->>-UI: Auth : User-specific session created

    UI->>+FRONTEND: User : inputs symptoms in <SymptomForm />
    FRONTEND->>+BACKEND: Request : <SymptomForm /> via services/symptoms.js 
    BACKEND->>+DATABASE: Data Encryption : controllers/symptomChecker.js via models/symptom.js to MongoDB
    BACKEND->>+ICD11 API: Diagnose symptoms : controllers/symptomChecker.js
    ICD11 API-->>-BACKEND: Results from ICD : diagnosis with reference URIs
    BACKEND->>+ICD11 API: Lookup reference URIs : controllers/utils/lookupSearchData.js 
    ICD11 API-->>-BACKEND: Results from ICD : detailed info about each diagnosis
    BACKEND->>+DATABASE: Data Encryption : diagnosisData from controllers/symptomChecker.js via models/symptom.js to MongoDB
    BACKEND->>-FRONTEND: Response : returns diagnosisData to <SymptomForm />
    FRONTEND-->>-UI: <SymptomForm /> : renders <Diagnosis />

    UI->>+FRONTEND: Auth : User logs out from <Sidebar />
    FRONTEND-->>-UI: Auth : <Logout /> modal asks confirmation
    UI->>+FRONTEND: Auth : User confirms logout
    FRONTEND-->>-UI: Auth : sessionStorage cleared, user redirected to <App />
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
