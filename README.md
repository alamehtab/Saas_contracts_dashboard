# SaaS Contracts Dashboard

A React + Tailwind single-page application (SPA) that simulates a SaaS contracts management dashboard.  
The app allows users to:
- Login with Firebase Authentication (mock authentication)
- Upload files (simulated uploads)
- View a contracts dashboard (list + Search filters + pagination)
- Explore contract insights (clauses, AI risks, evidence)

## Demo
Vercel Deployment Link : 

## Folder Structure
src/
├── components/ # Reusable UI components (Sidebar, Topbar, UploadModal, ClauseCard, EvidenceDrawer, InsightsList and ContractTable.)
├── layout/ # layout
├── pages/ # Page-level components (Login, Dashboard, ContractDetail and InsightPage)
├── redux/ # Redux store and slices (authSlice, contractsSlice)
├── services/ # Firebase Logic and Authentication.
├── App.jsx # Main app entry with routes
├── index.css # Tailwind styles
└── main.jsx # React root rendering
public/
├── contracts.json # Mock API data for contracts

## Tech Stack
- Frontend: React (functional components + hooks only)  
- Styling: Tailwind CSS  
- State Management: Redux Toolkit  
- Routing: React-Router-DOM  
- UI Components: PrimeReact (for DataTable, pagination, etc.)  
- Deployment: Vercel

## Features
## 1. Login Page
- Accepts only test@gmail.com.
- Password must be test123.
- On success, stores a mock JWT in Redux/localStorage.
- Redirects to dashboard.

## 2. Contracts Dashboard
- Sidebar (Contracts, Insights, Reports, Settings).
- Topbar with user profile + upload button.
- Table of contracts with:
  - Columns: Name, Parties, Expiry Date, Status, Risk.
  - Search + Status filter + Risk filter.
  - Pagination (10 rows per page).
- States: Loading, Empty, Error.

## 3. Contract Detail Page
- Shows metadata (title, parties, start/expiry, status, risk).
- Clauses cards (title, summary, confidence score).
- Insights list (risks + recommendations with severity).
- Evidence drawer with snippets + relevance score.

## 4. Upload Modal
- Drag & drop or file browse.
- Shows list of uploaded files with mock status (Uploading → Success/Error).
- Remove button to delete uploaded files before confirm.

## Installation & Setup
1. Clone the repo:
   git clone https://github.com/alamehtab/Saas_contracts_dashboard.git
   cd contracts-dashboard
   npm i/npm install -- to install dependencies and node modules
   npm run dev -- to run production server
   npm run build -- to run build server
   npm run preview -- to preview

## Assumptions Made
Contracts data is hosted locally in public/contracts.json.
Authentication is mocked:
Any email is accepted.
Email must be test@gmail.com and Password must be test123.
Uploads are simulated using timeouts — no real backend.
Insights, clauses, and evidence are mock data to demonstrate UI/UX.
Project is designed for demo purposes only (not production-ready).
