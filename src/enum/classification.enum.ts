export enum ClassificationType {
  THREAT = 'Threat',
  WARNING = 'Warning',
  INFORMATION = 'Information',
  IMMEDIATE_ACTION = 'Immediate Action'
}

export interface IClassificationOption {
  type: ClassificationType;
  value: string;
  label: string;
  color: string;
}

export const ClassificationOptions = {
  THREAT: {
    value: 'threat',
    label: 'Threat',
    color: '#d32f2f'
  },
  WARNING: {
    value: 'warning',
    label: 'Warning',
    color: '#ed6c02'
  },
  INFORMATION: {
    value: 'information',
    label: 'Information',
    color: '#1976d2'
  },
  IMMEDIATE_ACTION: {
    value: 'immediate_action',
    label: 'Immediate Action',
    color: '#2e7d32'
  },
  OTHER: {
    value: 'other',
    label: 'Other',
    color: '#757575'
  }
} as const;


