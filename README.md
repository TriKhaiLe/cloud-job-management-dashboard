# Cloud Job Dashboard

A modern cloud job management dashboard built with React, Vite, and Tailwind CSS. The dashboard offers an interactive user interface to view, create, filter, and track lifecycle transitions of compute jobs.

## Setup Instructions

Ensure you have Node.js installed, then follow these steps:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at the URL provided in the terminal (typically `http://localhost:5173`).

3. **Build for production**:
   ```bash
   npm run build
   ```

## Using Mock Data

To help visualize how the dashboard handles data, you can populate the list with pre-defined mock jobs:

1. Navigate to the bottom of the left sidebar.
2. Click the **Settings** button to open a dropdown menu.
3. Click **Load Mock Jobs** – this will dynamically append predefined jobs to the dashboard. You can click this multiple times to generate more variations of these jobs!

## Design Decisions
### Tech Stack Choices
- **Framework & Tooling**: Chosen **React** and **Vite** for a fast development loop and robust ecosystem. Employed **TypeScript** to provide strict typing, minimizing runtime errors.
- **Styling framework**: Used **Tailwind CSS v4** for utility-first, responsive, and easily maintainable styling without writing separate CSS files.
- **State Management Engine**: Used built-in React hooks (`useState`, `useMemo`) to hold and derive states keeping the app lightweight without requiring complex state libraries like Redux for the current scope.

### Project Structure

The `src` directory is partitioned by domain rather than file type to maintain a clean flow of data:

*   **types/** - Holds global TypeScript interfaces acting as the data contract across the app.
*   **data/** - Contains the mock data layer simulating backend responses.
*   **components/** - Generic, highly reusable UI building blocks (Buttons, Badges, Inputs).
*   **features/** - Complex, domain-specific assemblies (JobTable, JobDetailPanel, CreateJobModal).
*   **layouts/** - The structural application shell containing the sidebar navigation and header.

## What I Would Improve

If given more time and resources, here's what could be improved:
- **Loading States**: Implement loading skeletons for tables.
- **Scalability of Data Representation**: Implement pagination on tables.
- **Synchronization**: Synchronize the selected job details when job state updates. 
- **Handle Exceeding Limits**: Implement logic to handle the case when the user reaches the maximum number of tokens.
- **Responsive Design**: Enhance the dashboard's responsiveness for mobile and tablet devices, ensuring a seamless experience across all screen sizes.
- **Improve UI & UX**: Synchronize the text size and do some adjustments to match the design mockups. Add animations to enhance user experience.
