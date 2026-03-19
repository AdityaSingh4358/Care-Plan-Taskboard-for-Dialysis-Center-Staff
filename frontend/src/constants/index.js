// task status options
export const TASK_STATUS = {
    OVERDUE: 'overdue',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
}

// staff roles
export const ROLES = {
    NURSE: 'nurse',
    DIETICIAN: 'dietician',
    SOCIAL_WORKER: 'social_worker',
}

// task types
export const TASK_TYPES = {
    LAB: 'lab',
    ACCESS_CHECK: 'access_check',
    DIET_COUNSELLING: 'diet_counselling',
    VACCINATION: 'vaccination',
    SOCIAL_WORK: 'social_work',
    OTHER: 'other',
}

/**
 * @typedef {Object} Patient
 * @property {string} _id
 * @property {string} name
 * @property {number} age
 * @property {string} ward
 * @property {string} [bloodGroup]
 * @property {string} [contactNumber]
 */

/**
 * @typedef {Object} Task
 * @property {string} _id
 * @property {string} patientId
 * @property {string} title
 * @property {string} type
 * @property {'overdue'|'in_progress'|'completed'} status
 * @property {'nurse'|'dietician'|'social_worker'} role
 * @property {string} assignee
 * @property {string} dueDate
 * @property {string} [notes]
 */
