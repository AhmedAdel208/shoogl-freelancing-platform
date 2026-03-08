export const NOTIFICATION_TYPES = {
  JOB_COMPLETED: 'JobCompleted',
  PROPOSAL_RECEIVED: 'ProposalReceived',
  JOB_REQUEST_CREATED: 'JobRequestCreated'
} as const;

export const NOTIFICATION_ROUTES = {
  JOB_REQUESTS: '/requests'
} as const;