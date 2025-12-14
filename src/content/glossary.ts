export interface GlossaryTerm {
  term: string
  definition: string
  category: 'archipelago' | 'drupal' | 'technical'
}

export const glossary: GlossaryTerm[] = [
  // === FOUNDATIONAL: Drupal Basics ===
  {
    term: 'Node',
    definition: 'In Drupal, a "node" is any piece of content. Every Digital Object in Archipelago is stored as a Drupal node with a specific Content Type.',
    category: 'drupal',
  },
  {
    term: 'Content Type',
    definition: 'A template that defines what fields and settings are available for a type of content. Archipelago typically uses a "Digital Object" Content Type for all items.',
    category: 'drupal',
  },

  // === CORE: Archipelago Fundamentals ===
  {
    term: 'ADO',
    definition: 'Archipelago Digital Object - Any piece of content in your repository that uses the Strawberry Field for metadata storage. This could be a photograph, document, artwork, or any other digital item.',
    category: 'archipelago',
  },
  {
    term: 'JSON',
    definition: 'JavaScript Object Notation - A lightweight data format used by Archipelago to store metadata. It uses key-value pairs (like "title": "Goya Portrait") organized in a hierarchical structure.',
    category: 'technical',
  },
  {
    term: 'Strawberry Field',
    definition: 'A special Drupal field type that stores all metadata as flexible JSON. This is the heart of Archipelago\'s metadata system, allowing unlimited customization without database changes.',
    category: 'archipelago',
  },

  // === DATA ENTRY: Creating Content ===
  {
    term: 'Webform',
    definition: 'The form interface used for data entry in Archipelago. Webforms provide a user-friendly way to input metadata that gets stored as JSON in the Strawberry Field.',
    category: 'archipelago',
  },
  {
    term: 'Form Mode',
    definition: 'Controls which fields appear when editing an ADO. Different form modes can show different subsets of available fields for different workflows.',
    category: 'drupal',
  },
  {
    term: 'Linked Data',
    definition: 'Structured data that connects to external authority sources like Wikidata, Library of Congress, or Getty vocabularies. Adds context and standardization to your metadata.',
    category: 'technical',
  },

  // === DISPLAY: Viewing Content ===
  {
    term: 'Display Mode',
    definition: 'Also called "View Mode" - Controls how an ADO appears when viewed. Different display modes show different arrangements of metadata and media viewers.',
    category: 'drupal',
  },
  {
    term: 'Formatter',
    definition: 'A Drupal component that controls how a field\'s data is displayed. Archipelago has special formatters for showing images in viewers, rendering metadata, etc.',
    category: 'drupal',
  },
  {
    term: 'IIIF',
    definition: 'International Image Interoperability Framework - A standard for delivering and viewing images on the web. Archipelago uses IIIF to serve high-resolution images with zooming capabilities.',
    category: 'technical',
  },

  // === ORGANIZATION: Structuring Content ===
  {
    term: 'Collection',
    definition: 'A special ADO that groups related Digital Objects together. Objects can belong to multiple collections and collections can contain other collections.',
    category: 'archipelago',
  },
  {
    term: 'ap:entitymapping',
    definition: 'A special JSON key that tells Archipelago which file entities are attached to an ADO. Manages the relationship between metadata and actual files.',
    category: 'archipelago',
  },

  // === BATCH OPERATIONS: Working at Scale ===
  {
    term: 'AMI',
    definition: 'Archipelago Multi-Importer - The batch import tool for bringing multiple objects into Archipelago at once using spreadsheets (CSV, Excel, or Google Sheets).',
    category: 'archipelago',
  },
  {
    term: 'AMI Set',
    definition: 'A batch import job created by the Archipelago Multi-Importer. Contains the spreadsheet data, import settings, and allows reprocessing if needed.',
    category: 'archipelago',
  },

  // === SEARCH & PROCESSING: Behind the Scenes ===
  {
    term: 'Solr',
    definition: 'Apache Solr - The search engine that powers Archipelago\'s search functionality. It indexes your JSON metadata to make objects findable.',
    category: 'technical',
  },
  {
    term: 'Strawberry Runners',
    definition: 'Background processing tools that automatically extract technical metadata, generate thumbnails, OCR text, and perform other post-processing tasks.',
    category: 'archipelago',
  },

  // === ADVANCED: Power User Features ===
  {
    term: 'Twig',
    definition: 'A templating language used by Drupal and Archipelago to transform JSON metadata into different output formats (HTML displays, XML exports, etc.).',
    category: 'technical',
  },
  {
    term: 'Metadata Display',
    definition: 'A Twig template entity that transforms JSON metadata into formatted output. Can create HTML displays, XML exports, or any text-based format.',
    category: 'archipelago',
  },
  {
    term: 'Embargo',
    definition: 'A restriction that prevents public access to files or metadata until a specified date or condition is met. Used for pre-publication materials or sensitive content.',
    category: 'archipelago',
  },
]

export const glossaryByTerm = glossary.reduce(
  (acc, item) => {
    acc[item.term.toLowerCase()] = item
    return acc
  },
  {} as Record<string, GlossaryTerm>
)
