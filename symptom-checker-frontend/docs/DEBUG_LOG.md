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

