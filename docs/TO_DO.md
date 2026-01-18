# Features:
- [X] [Guest user creation and authentication](#debug-guest-user-creation-and-authentication)
- [X] [Generate User history](#issue-generate-user-history)
- [X] [Setup Symptom analysis preference](#optional-setup-symptom-analysis-preference)
- [X] [Clear commented out code](#essential-clear-commented-out-code)
- [ ] [Generate inputs as badges](#optional-generate-inputs-as-badges)
- [ ] [Setup Frontend tests](#essential-setup-frontend-tests-using-jest)
- [ ] [Authenticated Users not recognised from Session Storage data](#debug-update-authcontext-to-use-sessionstorage)

<hr>
<hr>
<br>

# (debug) Guest user creation and authentication
 - ~~AuthPrompt modal does not close after choosing 'Continue as Guest'~~ 
   - Forgot to add `handleClose()` to event handler, `handleGuestLogin`.
 - ~~FRONTEND doesn't recognize registered Guest user, BACKEND recognizes Guest user~~
   - Forgot to access user specifically.
   - `user` Object returned by Backend consists of `username` property.
 - ~~'Diagnose' button works fine but UI doesn't change to <Diagnosis />~~
   - `<Header />` component throws error due to `user` Object in `<Avatar />` instead of String.
   - Resolved after `<Header />` issue correction.
 - Finalize Middleware order for 'userExtractor' and 'tokenExtractor' to handle : 
   - user authentication
   - frontend service requests

[Back to TODO log](#features)

# (issue) Generate User history
- GitHub Issue [#10](https://github.com/prak112/Symptom-Checker-frontend/issues/10)
- Components required :
   - ~~Sidebar route to `<History />` page after Authentication~~
   - State component to display data retrieved from *diagnoses* collection from MongoDB
   - `useEffect` hook to add searched symptoms into `<History />` page

- The above approach comes with the following complications :
   - Requires `submitted` state from `<SymptomForm />`
   - Leads to state drilling through components (`<SymptomForm />` to `<UserHistory />`)

- The possible alternatives are :
   0. Context : Creating context for global access of states via Provider in `main.jsx`

   1. Redux: A popular state management library that allows you to manage the state of your entire application in a single store. Components can connect to the store to read state and dispatch actions.

   2. Recoil: A state management library for React that provides a more fine-grained approach compared to Redux. It allows you to create shared state (atoms) and derived state (selectors) that components can subscribe to.

   3. Event Emitter: Use an event emitter to communicate between components. You can emit events from one component and listen for those events in another component.

   4. React Query: A data-fetching library that can also be used to manage and synchronize state across components. It provides hooks to fetch, cache, and update data.

   5. Custom Hooks: Create custom hooks that encapsulate the shared state and logic. These hooks can be used in multiple components to access and update the shared state.


- Using React Query (specifically for this purpose), establishes communication between `<SymptomForm />` and `<UserHistory />` to :
   - monitor changes in `submitted` state
   - execute custom `useUserHistory` hook everytime `submitted` state changes

- React Query approach overview :
   - React Query Provider: Wraps the application to provide React Query context.
   - Custom Hook: useUserHistory fetches user history data.
   - UserHistory Component: Uses useUserHistory to fetch and display user history.
   - SymptomForm Component: Uses useQueryClient and invalidateQueries to invalidate and refetch the user history query whenever the submitted state changes.
- This approach ensures that the useUserHistory hook in UserHistory.jsx is executed every time the submitted state changes in SymptomForm.jsx, without the need for state drilling.

- *React Query* **approach** : Complex to handle without fundamentals to start with.
- *React Context* **approach** : Implemented with previous references to `AuthenticationContext`

[Back to TODO log](#features)


# (optional) Setup Symptom analysis preference
- Setup radio buttons in `<SymptomForm />` to register user's preference for :
   - symptom-by-symptom diagnosis
   - combined symptoms diagnosis
- Capture preference by state variables, similar to `searchType`
- Redirect requests with preference (setup backend for processing)

[Back to TODO log](#features)


# (essential) Clear commented out code
- Before closing issue with PR

[Back to TODO log](#features)


# (optional) Generate inputs as badges
- To generate badges for entered user input in text format in `<SymptomForm />` :

- Step 1: Create a state to store the list of symptoms
   - Add a new state variable `symptomList` to store the list of symptoms.

- Step 2: Update the state when the user enters symptoms
   - Modify the `handleInputChange` function to update the `symptomList` state.

- Step 3: Render the badges
   - Use the `symptomList` state for each symptom inside a `<Box />` component using `<Chip />` component to display badges.
   ```jsx
            ...   
               ...
               <Box my={2}>
                  {symptomList.map((symptom, index) => (
                     <Chip key={index} label={symptom} sx={{ margin: '2px' }} />
                  ))}
               </Box>
               ...
            ...
   ```

[Back to TODO log](#features)


# (essential) Setup Frontend tests using `jest`

1. **Install Jest and Testing Library**:
   Navigate to directory and install Jest along with React Testing Library:

   ```sh
      npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```

2. **Configure Jest**:
   Create a `jest.config.js` file in the root of (e.g., `symptom-checker-frontend/jest.config.js`) with the following content:

   ```js
      module.exports = {
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
         moduleNameMapper: {
            '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
         },
      };
   ```

3. **Setup Testing Environment**:
   Create a `setupTests.js` file in your `src` directory (e.g., `symptom-checker-frontend/src/setupTests.js`) with the following content:

   ```js
      import '@testing-library/jest-dom/extend-expect';
   ```

4. **Write Tests**:
   Create test files alongside your components or in a separate `__tests__` directory. For example, to test the `Diagnosis` component, create a file named `Diagnosis.test.jsx` in the `components` directory:

   ```jsx
      // symptom-checker-frontend/src/components/Diagnosis.test.jsx
      import React from 'react';
      import { render, screen } from '@testing-library/react';
      import Diagnosis from './Diagnosis';

      test('renders Diagnosis component', () => {
      render(<Diagnosis />);
      const linkElement = screen.getByText(/Diagnosis/i);
      expect(linkElement).toBeInTheDocument();
      });
   ```

5. **Update `package.json`**:
   ```json
      {
      "scripts": {
         "test": "jest"
      }
      }
   ```

6. **Run Tests**:
   ```sh
      npm test
   ```

[Back to TODO log](#features)


# (debug) Update AuthContext to use SessionStorage
- `authenticatedUser` data is stored in Session Storage of the browser by `UserContext.jsx`
- This data is not used by `AuthenticationContext.jsx`.
- Due to this after every app reload, during the same session, the `AuthenticationPrompt.jsx` pops up and asks the user to login again.
- This is ineffecient and can be handled by using Session Storage data at the right places.

[Back to TODO log](#features)
