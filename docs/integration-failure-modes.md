# Integration Failure Modes

This document explains what happens when things go wrong in the Dialysis Care Plan Taskboard,
and how to extend the system with new roles or task types.

---

## What Happens When Something Fails?

### 1. Can't load the patient list
If the server is down or the `/patients` API fails, the taskboard will show a
red error message — **"Failed to load patients."** — instead of crashing silently.
React Query will automatically retry up to 3 times before giving up.

### 2. Can't load tasks for a patient
If tasks fail to load for one patient, only that patient's row is affected.
Other patients on the board load and work normally. The failed row simply shows no tasks.

### 3. Creating a task fails
When you hit "Create Task", the task appears on the board immediately (optimistic update).
If the server then rejects it, the task automatically disappears and a
**"Failed to create task."** message shows in the modal. No stale data is left behind.

### 4. Updating a task fails
Same idea — the task visually updates right away. If the server returns an error,
the task snaps back to its previous state. The user always sees accurate data.

---

## How to Add a New Role (e.g. Physiotherapist)

1. Open `frontend/src/constants/index.js` → add `PHYSIOTHERAPIST: 'physiotherapist'` to `ROLES`
2. Open `backend/models/Task.js` → add `'physiotherapist'` to the `role` enum array
3. Open [components/FilterBar.jsx](cci:7://file:///c:/Jano%20Healthcare%20Solutions/dialysis-assignment/frontend/src/components/FilterBar.jsx:0:0-0:0) → add a new `<option>` for physiotherapist
4. Open [components/TaskCard.jsx](cci:7://file:///c:/Jano%20Healthcare%20Solutions/dialysis-assignment/frontend/src/components/TaskCard.jsx:0:0-0:0) → add a color for it in `ROLE_COLORS`

That's it — the modal dropdown picks it up automatically from the constants.

---

## How to Add a New Task Type (e.g. Vaccination)

1. Open `frontend/src/constants/index.js` → add `VACCINATION: 'vaccination'` to `TASK_TYPES`
2. Open `backend/models/Task.js` → add `'vaccination'` to the `type` enum array
3. Open [components/CreateTaskModal.jsx](cci:7://file:///c:/Jano%20Healthcare%20Solutions/dialysis-assignment/frontend/src/components/CreateTaskModal.jsx:0:0-0:0) → add `'vaccination'` to the `TYPES` array

The dropdown in the create form will now include the new type.
