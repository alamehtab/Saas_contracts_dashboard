# SaaS Contracts Dashboard — UI/UX Developer Assignment

## What
A React + Tailwind single-page app that simulates a SaaS contracts manager. It includes login (Firebase, mocked), contracts list with search and pagination (PrimeReact DataTable), contract details with clauses/insights/evidence, and a simulated upload modal.

## Tech stack
- React functional components + hooks
- Tailwind CSS
- Redux Toolkit for state
- PrimeReact (DataTable & UI utilities)
- Firebase Auth (demo integration, mock rule password=test123)
- Axios for HTTP
- Deployed to Vercel/Netlify (add link here)

## Setup
1. Clone
2. `npm install`
3. Add Firebase config to `src/utils/firebase.js` or use env variables.
4. `npm start`
5. Deploy to Vercel / Netlify (point to main branch). Make sure environment variables are set if using real Firebase config.

## Decisions & Assumptions
- Using Redux Toolkit to centralize contracts and auth state.
- contracts.json is hosted in `/public/contracts.json` and fetched client-side for simplicity.
- Authentication: assignment asked to accept any username and password `test123`. We enforce password check in `authHelpers`. Firebase sign-in is attempted if credentials exist; otherwise we issue a mock token.
- No filters UI as requested — search bar is global filter implemented with PrimeReact DataTable.

## Notes / Future improvements
- Add real file upload backend & progress tracking
- Add tests
- Add better mobile sidebar toggle and responsive enhancements
