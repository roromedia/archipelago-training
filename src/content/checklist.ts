import type { ProgressItem } from '@/hooks/useProgress'

export const checklistItems: ProgressItem[] = [
  // Session 1: Foundation
  {
    id: 's1-what-is-archipelago',
    sessionId: 1,
    label: 'Understand what Archipelago is and its philosophy',
    completed: false,
  },
  {
    id: 's1-drupal-basics',
    sessionId: 1,
    label: 'Know basic Drupal terminology (Nodes, Content Types)',
    completed: false,
  },
  {
    id: 's1-json-metadata',
    sessionId: 1,
    label: 'Understand JSON-based metadata concept',
    completed: false,
  },
  {
    id: 's1-navigate-interface',
    sessionId: 1,
    label: 'Can navigate the admin interface',
    completed: false,
  },
  {
    id: 's1-understand-roles',
    sessionId: 1,
    label: 'Understand user roles and permissions',
    completed: false,
  },

  // Session 2: Creating Digital Objects
  {
    id: 's2-create-object',
    sessionId: 2,
    label: 'Created a test digital object (photograph)',
    completed: false,
  },
  {
    id: 's2-webform-fields',
    sessionId: 2,
    label: 'Understand webform fields and their purpose',
    completed: false,
  },
  {
    id: 's2-file-uploads',
    sessionId: 2,
    label: 'Can upload and manage files',
    completed: false,
  },
  {
    id: 's2-linked-data',
    sessionId: 2,
    label: 'Can add linked data (Wikidata, LOC, Getty)',
    completed: false,
  },
  {
    id: 's2-publishing',
    sessionId: 2,
    label: 'Know the publishing workflow (Draft → Published)',
    completed: false,
  },
  {
    id: 's2-collections',
    sessionId: 2,
    label: 'Understand how collections work',
    completed: false,
  },

  // Session 3: Batch Operations & Search
  {
    id: 's3-ami-purpose',
    sessionId: 3,
    label: 'Understand AMI purpose and capabilities',
    completed: false,
  },
  {
    id: 's3-spreadsheet-prep',
    sessionId: 3,
    label: 'Can prepare an import spreadsheet',
    completed: false,
  },
  {
    id: 's3-search-basics',
    sessionId: 3,
    label: 'Can search the repository effectively',
    completed: false,
  },
  {
    id: 's3-find-replace',
    sessionId: 3,
    label: 'Know how to use batch find/replace',
    completed: false,
  },
  {
    id: 's3-export-csv',
    sessionId: 3,
    label: 'Can export data to CSV',
    completed: false,
  },

  // Session 4: Advanced Features
  {
    id: 's4-display-modes',
    sessionId: 4,
    label: 'Understand display modes and customization',
    completed: false,
  },
  {
    id: 's4-iiif-benefits',
    sessionId: 4,
    label: 'Know the benefits of IIIF image serving',
    completed: false,
  },
  {
    id: 's4-annotations',
    sessionId: 4,
    label: 'Can create annotations on visual materials',
    completed: false,
  },
  {
    id: 's4-embargo',
    sessionId: 4,
    label: 'Know how to apply embargo restrictions',
    completed: false,
  },
  {
    id: 's4-escalation',
    sessionId: 4,
    label: 'Know when and how to escalate to IT support',
    completed: false,
  },
]
