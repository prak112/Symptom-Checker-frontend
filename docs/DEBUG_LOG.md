# 1 - Missing communication link between Frontend and Backend
- **Context** :
    - Frontend POST request with form data from `SymptomForm.jsx` is rejected and `ERR_BAD_REQUEST` with response stateus 400 is thrown
    - However, GET request passes and returns with no data
    - In summary, no request gets logged in the backend, i.e., there is no communication link setup between the frontend and the backend
- **Reason** :
    - Possible issues could be lined up as follows:
        - [X] *Backend - Cross-origin resource sharing* - setup complete via `cors` dependency installation and usage in `app.js`
        - [X] *Backend - data validation or API setup* - verified, all good.
        - [X] *Frontend - API/service setup with `axios`*  - verified, all good.
        - [X] *vite.config.js proxy server setup to communicate with backend* - setup, request is Logged! 
- **Solution** :
    - Proxy server setup in the Frontend was the missing communication link between Frontend service and Backend endpoint
    ```javascript
        // essential imports
        ...

        export default defineConfig({
            plugins: [react()],
            server: {
                proxy: {
                    '/api/protected/symptoms': {
                        target: 'http://localhost:3003',
                        changeOrigin: true
                    },
                }
            },
        })
    ```

<hr>
<br>

# 2 - Backend : Debug `request` issues
- **Context** : 
    - The communication link is setup. Backend `requestBuilder.js`, controller utility module, improperly setup.
    - Error Information :
    ```bash
        Status POST https://id.who.int/icd/release/11/2024-01/mms/search :
        500
        ERROR during General search :  SyntaxError: Unexpected token 'I', "Internal S"... is not valid JSON
    ```
- **Reason** : 
    - Possible reasons for the 'Internal Server Error' in the Backend could be:
        - [X] Token saved in `request` Headers was saved as a `Promise` object, hence unraveling using `async/await` function setup
        - [X] *MOST Irritating Error - `SyntaxError: Unexpected end of JSON input`* - due to wrong request type setup for LOOKUP request
- **Solution** : 
    - Wrong `HTTP request` type for both LookUp and AutoSearch queries to ICD API, i.e., `POST` instead of `GET`
    - Correction chain : `requestOptions` variable --> `requestBuilder.js` controller utility module --> `symptomChecker.js` controller --> `lookupSearchData.js` controller utility module

<hr>
<br>


# 3 - Frontend : Render `diagnosis` data in `Diagnosis` component
- **Context** :
    - Rendering a `diagnosis` 'object with arrays as values' was challenging, since it was easier to render 'array of objects' with redundant keys
- **Reason** :
    - `diagnosis` data object was not directly passed to `Diagnosis` component to handle the rendering, instead complicated it by trying to render in `SymptomForm` component
    - Understanding the structure of the response object and iterating through it by thinking in terms of rendering `Pandas DataFrame` was not clear until I started *Rubber-Duck Debugging*
- **Solution** :
    - Move the `diagnosis` data handling and rendering to `Diagnosis` component
    - Unravelled or revisited several key ideas:
        - `MaterialUI` components such as `TableContainer`, 
        - `Object` and `Array` methods such as `Object.keys` and `Array.map` to maneuver through the `diagnosis` object keys and its Array values.
        
<hr>
<br>

# 4 - Backend : Diagnosis data gets overwritten
- **Context** : 
    - Diagnosis data keeps overwriting itself and accumulates test results
- **Solution** :
    - Confused as frontend state issue, but tracing it back to backend resulted in Controller logic being flawed.
    - Diagnosis data arrays were globally initialized but not seperately for each request call.

<hr>
<br>

# 5 - Frontend : React Router must route to Modal instead of Page
- **Context** : 
    - `SignupModal` must be opened when the user clicks `Sign Up` in the Sidebar menu.
    - ATM, it routes to a page.
- **Solution** :
    - Use `useLocation` and `useHistory` hooks from `react-router-dom` to setup routes
    - Setup a `ModalWrapper` component in `App.jsx`

<hr>
<br>


# 6 - Frontend : Redirect Modal from Signup to Login
- **Context** :
    - Redirect to login if 'already existing user' must move UI from the `SignupModal` to `LoginModal`
    - ATM, it is just routing whichever Modal is at `/auth`
    - Trying query search params to route using `useNavigate` hook from Signup to Login
- **Solution** :
    - In `Signup` Modal component, declare `loginRedirect` using `navigate` hook with search parameter as follows :
    ```javascript
        // reroute to login
        const loginRedirect = () => {
            navigate("/auth?public=login")
        }
    ```
    
    - In `App` component, refactor `ModalWrapper` component to conditionally render based on search parameters

<hr>
<br>

# 7 - Frontend : Clear Session data when user clicks 'Logout'
- **Context** :
    - FEAT-Logout : Setup logout process and clear user data
    - Requires 'handleLogout' event handler to clear 'user' State
    - Checking possibility of 'useContext' to handle user-related information on a higher level
- **Solution** :
    - Setup a `UserContext.jsx` to use as a Higher-level component than `App` and deep-tree reach
    - Import `UserContext` in all neccessary components requiring User info for conditional rendering such as :
        - `Header`, 
        - `Sidebar`, 
        - `UserProfile`
        - `Logout`

<hr>
<br>

# 8 - Frontend : `Modal` (MUI) component error revealed on proper `PropTypes` declaration
- **Context** :
    - `PropTypes` were declared inside the React components', which was a mistake.
    - After correctly declaring `PropTypes` *OUTSIDE* the React component, MUI threw `Modal` component error!
    - Multiple JSX elements were being rendered inside `Modal` component
    - According to the error and MUI documentation, only a *SINGLE* `<div>` or `<>`(empty div) tag were supposed to be present.
- **Solution** :
    - Redeclare `PropTypes` outside the component for `Signup`, `Login`, `Logout`, `UserContext`, `UserProfile`, `Header` and `Sidebar`.
    - In the `Modal` component, wrapped all the JSX elements inside a single React element and `<div>` tag.

<hr>
<br>

# 9 - Frontend : React Components and Context
- **COMPONENTS**
    - *Components* are better used without prop-drilling through related Components/Main Component.
    - Using *State* in the Main Component to manage the *props* from *children* Components gets complicated especially if it is repeated among multiple components, such as Alerts, User information, etc.
- **CONTEXT**
    - Enter *Context*
    - *Context* provides global access to the application components and makes it easier to import and manage *States*
    - Using *Context* instead of *Components* in the case of Alerts, promotes modularity reduces complexity and makes the codebase easier to maintain.
    - More importantly, it is the proper application of the SOLID principles - *Single Responsibility Principle (SRP)* and the *Dependency Inversion Principle (DIP)*.

<hr>
<br>

