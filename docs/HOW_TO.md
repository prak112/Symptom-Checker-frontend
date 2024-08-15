# How To Setup Frontend tests using `jest`

- To set up frontend tests using Jest in your project, follow these steps:

1. **Install Jest and Testing Library**:
   Navigate to your project directory and install Jest along with React Testing Library:

   ```sh
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```

2. **Configure Jest**:
   Create a `jest.config.js` file in the root of your project (e.g., `symptom-checker-frontend/jest.config.js`) with the following content:

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
   Add a test script to your `package.json` file to run Jest:

   ```json
   {
     "scripts": {
       "test": "jest"
     }
   }
   ```

6. **Run Tests**:
   You can now run your tests using the following command:

   ```sh
   npm test
   ```

By following these steps, you will have Jest set up for your frontend project, and you can start writing and running tests for your components.