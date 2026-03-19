Demo video Link -  https://drive.google.com/file/d/10dOEvymlm8uWmzf16HCFENDbtl0mmXe2/view?usp=drive_link

# 🏥 Dialysis Care Plan Taskboard

Managing a dialysis clinic is fast-paced and critical. Communication between **Nurses**, **Dieticians**, and **Social Workers** is essential. 

This **Patient-Centric Taskboard** is designed so clinicians never miss a beat. Instead of floating task cards where data can get mixed up, this dashboard anchors **every task strictly to the Patient Row**, ensuring 100% accurate care assignments.

---

## 🚀 Key Features

*   **📋 Patient-Centric Layout**: Rows are patients; columns are statuses (`Overdue`, `In Progress`, `Completed`). No mix-ups.
*   **🩺 Role-Based Clear Filters**: Instantly sort the board to view strictly **Nurse**, **Dietician**, or **Social Worker** assignments.
*   **⏰ Dynamic Auto-Overdue Calculation**: Tasks intelligently jump into the **Red "Overdue"** column the second their deadline has rolled into the past.
*   **⚡ Optimistic UI Updates**: Clinician tasks move instantly upon interaction. Marking "Complete" performs immediately before the server round‑trip finishes to keep workflows snappy.
*   **💾 Offline‑Safe Mock Persistence**: Perfect for sandboxing/testing. State preserves across refreshes using isolated caching layers.

---

## 🛠️ Tech Stack

*   **Frontend**: React (Vite) + Vanilla CSS
*   **State Management**: 
    *   **React Query**: Handles server state, automatic retries, and optimistic rollbacks on failures.
    *   **Zustand**: Clean, local UI filters.
*   **Mocks & Testing**: Mock Service Worker (MSW) for offline testing, Vitest for isolated component & hook verifying.

---

## 🏃 Getting Started (Local Setup)

To run this full-stack project locally, you will need two separate terminal windows:

### 1. 🗄 Backend (Database endpoints)
```bash
cd backend
npm install
npm run dev   # Starts server on http://localhost:5000
```

### 2. 🖥️ Frontend (Vite Dashboard)
```bash
cd frontend
npm install
npm run dev   # Starts Vite dashboard on http://localhost:5173
```
*Tip: In development loads, the frontend runs using **MSW** mock interception so you don’t strictly need a live MongoDB connection to test Dashboard CRUD workflows.*

---

## 🧪 Running Tests
We use **Vitest** to verify critical hook states such as optimistic update triggers and cache rollback upon server failure:

```bash
cd frontend
npx vitest
```

---

## 📂 Project Architecture

```text
├── backend/               # Express endpoints & Mongoose patient/task schemas
├── docs/                  # failure modes diagnostic guides & user setups
└── frontend/
    ├── src/
    │   ├── api/           # Axios handlers and endpoints client
    │   ├── components/    # Grid layouts, Column Filters, Task components
    │   ├── hooks/         # React Query mutation & Fetch lifecycle hooks
    │   ├── constants/     # Central Roles & Color mapped structures
    │   └── store/         # Zustand configuration points
```

*For more details on Partial Failures, Network Drops, or instructions on adding new roles, see `docs/integration-failure-modes.md`.*
