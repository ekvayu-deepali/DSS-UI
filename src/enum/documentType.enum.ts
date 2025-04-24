export interface IDocumentTypeOption {
  value: string;
  label: string;
  allowedExtensions: string[];
}

export const DocumentTypeOptions: { [key: string]: IDocumentTypeOption } = {
  PDF: {
    value: 'pdf',
    label: 'PDF Document',
    allowedExtensions: ['application/pdf']
  },
  IMAGE: {
    value: 'image',
    label: 'Image',
    allowedExtensions: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
  },
  VIDEO: {
    value: 'video',
    label: 'Video',
    allowedExtensions: ['video/mp4', 'video/3gpp', 'video/quicktime']
  },
  AUDIO: {
    value: 'audio',
    label: 'Audio',
    allowedExtensions: ['audio/mpeg', 'audio/mp4', 'audio/aac', 'audio/ogg', 'audio/amr']
  },
  DOCUMENT: {
    value: 'document',
    label: 'Document',
    allowedExtensions: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  },
  SPREADSHEET: {
    value: 'spreadsheet',
    label: 'Spreadsheet',
    allowedExtensions: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
  },
  PRESENTATION: {
    value: 'presentation',
    label: 'Presentation',
    allowedExtensions: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']
  }
} as const;