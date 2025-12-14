export interface Lesson {
  id: string
  title: string
  duration: string
  content: string
  tips?: string[]
  steps?: {
    title: string
    description: string
  }[]
}

export interface Session {
  id: number
  title: string
  subtitle: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  audience: string
  description: string
  objectives: string[]
  lessons: Lesson[]
}

export const sessions: Session[] = [
  {
    id: 1,
    title: 'Foundation',
    subtitle: 'Understanding Archipelago & Drupal Basics',
    duration: '~90 minutes',
    difficulty: 'beginner',
    audience: 'All catalogers',
    description:
      'This foundational session introduces you to Archipelago, its philosophy, and the essential concepts you need to understand before creating digital objects. We will explore the Drupal terminology, understand how metadata is stored as JSON, and familiarize ourselves with the interface.',
    objectives: [
      'Understand what Archipelago is and its benefits for digital repositories',
      'Learn essential Drupal terminology (Nodes, Content Types, Fields)',
      'Grasp the concept of JSON-based flexible metadata',
      'Navigate the Archipelago admin interface confidently',
      'Understand user roles and what you can/cannot do',
    ],
    lessons: [
      {
        id: 's1-intro',
        title: 'What is Archipelago?',
        duration: '15 min',
        content: `
Archipelago is an open-source digital repository platform built on Drupal. Unlike traditional repository systems with rigid, pre-defined metadata schemas, Archipelago takes a radically flexible approach.

**The Philosophy:**
- **Simplification through Removal**: Rather than adding complexity, Archipelago removes unnecessary constraints while adding targeted innovations
- **Flexible Metadata**: All metadata is stored as JSON, allowing unlimited customization without database changes
- **User Empowerment**: Provides all the controls you need while remaining approachable for non-technical users

**Why institutions choose Archipelago:**
- Perfect for diverse collections (photographs, paintings, manuscripts, rare books)
- Supports IIIF for high-quality image delivery and zooming
- Flexible enough to accommodate our unique metadata needs
- Open-source with active community support
        `,
        tips: [
          'Archipelago is NOT a traditional database with fixed fields',
          'Think of it as a flexible container that adapts to your content',
          'The same system handles photographs, manuscripts, and 3D objects',
        ],
      },
      {
        id: 's1-drupal',
        title: 'Essential Drupal Terminology',
        duration: '20 min',
        content: `
Archipelago is built on Drupal, so understanding a few key terms will help you navigate the system.

**Node**: The basic unit of content in Drupal. Every Digital Object you create is a "node" behind the scenes. You don't need to think about this much, but you might see "node" mentioned in URLs (like /node/123).

**Content Type**: A template that defines what kind of content you're creating. In Archipelago, we primarily use the "Digital Object" content type for all our items.

**Field**: A piece of information attached to content. Traditional Drupal uses many individual fields (title field, date field, etc.). Archipelago is different—it stores almost everything in ONE special field called the Strawberry Field.

**Strawberry Field**: Archipelago's special field that holds all your metadata as JSON. This is what makes Archipelago so flexible. Instead of adding new database columns for each piece of metadata, everything goes into this one smart container.
        `,
        tips: [
          'You don\'t need to be a Drupal expert—just know these basics',
          'When you see "node" in a URL, it just means "content item"',
          'The Strawberry Field is the magic that makes Archipelago flexible',
        ],
      },
      {
        id: 's1-json',
        title: 'Understanding JSON Metadata',
        duration: '20 min',
        content: `
Archipelago stores all descriptive metadata as JSON (JavaScript Object Notation). Don't worry—you'll never have to write JSON directly. The webforms handle that for you.

**What JSON looks like:**
\`\`\`json
{
  "type": "Photograph",
  "label": "Portrait of Sorolla",
  "date_created": "1909",
  "creator": "Unknown photographer",
  "subject": ["Sorolla", "Portrait", "Artist"]
}
\`\`\`

**Why JSON matters:**
- **Flexibility**: Add any metadata field without changing the database
- **Hierarchy**: Organize related information together
- **Portability**: Easy to export, share, and transform
- **Queryability**: Search across any field in your metadata

**What you need to know:**
- Metadata has "keys" (like \`creator\`) and "values" (like \`Unknown photographer\`)
- Values can be text, numbers, dates, or even lists
- The webform translates your input into this structure automatically
        `,
        tips: [
          'You\'ll enter data through friendly forms, not raw JSON',
          'Understanding JSON helps when troubleshooting or doing advanced work',
          'JSON is pronounced "JAY-son"',
        ],
      },
      {
        id: 's1-interface',
        title: 'Navigating the Interface',
        duration: '20 min',
        content: `
Let's familiarize ourselves with the Archipelago interface.

**The Admin Toolbar:**
Located at the top of the screen when logged in. Key areas include:
- **Content**: Where you browse and create Digital Objects
- **Structure**: System configuration (usually for administrators only)
- **Tools**: Quick access to common operations

**Key Navigation Points:**
- \`/admin/content\` - Browse all content, filter and sort
- \`/node/add/digital_object\` - Create a new Digital Object
- \`/amiset/list\` - Access batch import tools (AMI)
- \`/search\` - Search the repository

**Your Dashboard:**
When you log in, you may see a personalized dashboard showing:
- Recently created or edited items
- Items awaiting review
- Quick action buttons
        `,
        steps: [
          {
            title: 'Log in to Archipelago',
            description: 'Navigate to the site and enter your credentials',
          },
          {
            title: 'Explore the Admin Toolbar',
            description: 'Click through Content, Structure, and Tools menus',
          },
          {
            title: 'Visit the Content List',
            description: 'Go to Content and try filtering by type or status',
          },
          {
            title: 'Try the Search',
            description: 'Search for an existing item to see how results appear',
          },
        ],
      },
      {
        id: 's1-roles',
        title: 'User Roles & Permissions',
        duration: '15 min',
        content: `
Different users have different capabilities in Archipelago. Understanding your role helps you know what you can do.

**Common Roles:**

**Content Creator / Cataloger:**
- Create new Digital Objects
- Edit objects they created
- Upload files
- Save items as drafts or submit for review

**Content Editor:**
- All Content Creator abilities
- Edit any Digital Object
- Publish content directly
- Manage collections

**Administrator:**
- Full system access
- Configure settings and permissions
- Manage users
- Access advanced tools

**What You Cannot Do (typically):**
- Change system configuration
- Delete published content (usually requires approval)
- Modify other users' permissions
- Access server files directly

When in doubt, save as Draft and ask a supervisor!
        `,
        tips: [
          'Always save your work before leaving a page',
          'When unsure about publishing, save as Draft first',
          'Ask your supervisor about your specific permissions',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Creating Digital Objects',
    subtitle: 'Your First Photograph in Archipelago',
    duration: '~90 minutes',
    difficulty: 'intermediate',
    audience: 'Active catalogers',
    description:
      'In this hands-on session, you\'ll create your first Digital Object in Archipelago. We\'ll walk through each step of the webform, learn how to upload files, add linked data from authority sources, and publish your completed object.',
    objectives: [
      'Create a complete Digital Object from start to finish',
      'Understand each webform section and field purpose',
      'Upload files and observe automatic metadata extraction',
      'Add linked data from Wikidata, Library of Congress, and Getty',
      'Know the difference between Draft and Published states',
      'Assign objects to collections',
    ],
    lessons: [
      {
        id: 's2-starting',
        title: 'Starting a New Digital Object',
        duration: '10 min',
        content: `
Let's create your first Digital Object—a photograph from your collection.

**Navigate to Create:**
1. Click **Content** in the admin toolbar
2. Click **Add content** button
3. Select **Digital Object**

**The Multi-Step Form:**
Archipelago uses a multi-step webform to guide you through the process:
1. **My Metadata** - Basic descriptive information
2. **Collections** - Where this object belongs
3. **Linked Data** - Connections to authority sources
4. **Upload Files** - The actual digital files
5. **Complete** - Review and save

Each step builds on the previous one. You can navigate back and forth using the buttons at the bottom.
        `,
        tips: [
          'You can save as Draft at any point to continue later',
          'Required fields are marked with a red asterisk (*)',
          'The form remembers your progress within a session',
        ],
      },
      {
        id: 's2-metadata',
        title: 'Entering Descriptive Metadata',
        duration: '25 min',
        content: `
The first step captures the core descriptive information about your object.

**Required Fields:**
- **Title**: A descriptive title for the object
- **Type**: Select from the dropdown (Photograph, Painting, Document, etc.)

**Common Fields for Photographs:**
- **Date Created**: When the photograph was taken
- **Creator**: The photographer (if known)
- **Description**: A narrative description of the content
- **Subject**: What or who is depicted
- **Physical Description**: Size, format, condition notes

**Best Practices:**
- Be consistent with date formats (YYYY or YYYY-MM-DD)
- Use standardized terms when possible
- Include enough detail for someone to understand the object without seeing it
- Note uncertainties with [brackets] or question marks

**Example Entry:**
- Title: "Joaquín Sorolla painting in his garden studio"
- Type: Photograph
- Date: 1910
- Creator: Unknown
- Description: "Black and white photograph showing the Spanish painter Joaquín Sorolla at work in his Madrid garden studio. He is seated at an easel, facing away from the camera."
        `,
        tips: [
          'Title should be descriptive but concise (under 255 characters)',
          'Use "Unknown" rather than leaving creator blank when uncertain',
          'Subject terms will be searchable—choose meaningful words',
        ],
      },
      {
        id: 's2-files',
        title: 'Uploading Files',
        duration: '15 min',
        content: `
The Upload Files step is where you attach the actual digital files to your metadata.

**Supported File Types:**
- **Images**: JPEG, TIFF, PNG
- **Documents**: PDF
- **Audio**: MP3, WAV
- **Video**: MP4, MOV

**What Happens When You Upload:**
1. File is uploaded to temporary storage
2. Archipelago extracts technical metadata (EXIF, file size, dimensions)
3. Preview thumbnail is generated
4. File is associated with your ADO

**For Photographs:**
- Upload the highest quality file available
- TIFF for preservation, JPEG for access is ideal
- Multiple files can be attached to one object (front/back, multiple views)

**Technical Metadata Extraction:**
Archipelago automatically reads embedded metadata:
- Camera information (EXIF)
- Dimensions and resolution
- Color space
- Creation date from file
        `,
        steps: [
          {
            title: 'Click "Choose Files" or drag files into the upload area',
            description: 'Select your photograph file from your computer',
          },
          {
            title: 'Wait for upload to complete',
            description: 'A progress bar shows upload status',
          },
          {
            title: 'Review extracted metadata',
            description: 'Check that technical information was captured correctly',
          },
          {
            title: 'Add additional files if needed',
            description: 'Repeat for verso images or related files',
          },
        ],
      },
      {
        id: 's2-linked-data',
        title: 'Adding Linked Data',
        duration: '20 min',
        content: `
Linked Data connects your object to established authority sources, adding context and standardization.

**Available Sources:**
- **Wikidata**: General knowledge base (people, places, concepts)
- **Library of Congress**: Subject headings, name authorities
- **Getty**: Art & architecture vocabulary (AAT, ULAN, TGN)

**How to Add Linked Data:**
1. Start typing in the autocomplete field
2. Select from suggested matches
3. The system stores both the label and the authority URI

**Example - Adding a Subject:**
- Type "Sorolla" in the subject field
- Select "Joaquín Sorolla (Spanish painter, 1863-1923)" from Wikidata
- The system captures: display name AND the Wikidata identifier (Q351746)

**Why This Matters:**
- Standardizes terminology across your collection
- Connects your data to global knowledge networks
- Enables advanced search and discovery
- Supports future linked data applications
        `,
        tips: [
          'Always verify you\'re selecting the correct authority (check dates, descriptions)',
          'If no match exists, you can enter free text',
          'Linked data for locations can include geographic coordinates',
        ],
      },
      {
        id: 's2-publishing',
        title: 'Publishing Workflow',
        duration: '15 min',
        content: `
The final step lets you review your work and choose how to save it.

**Save Options:**
- **Draft**: Saves your work but keeps it private. Only logged-in users can see drafts.
- **Published**: Makes the object visible to the public (or according to your permission settings).

**When to Use Draft:**
- Work in progress that needs more information
- Waiting for supervisor review
- Uncertain about any details
- Testing or learning

**When to Publish:**
- All required fields are complete
- Files are uploaded and verified
- Metadata has been reviewed for accuracy
- Ready for public access

**After Saving:**
- You'll be redirected to view your new object
- Check that everything displays correctly
- Note the URL/node number for reference
        `,
        steps: [
          {
            title: 'Review all entered information',
            description: 'Use the navigation to check each section',
          },
          {
            title: 'Select save status',
            description: 'Choose Draft or Published from the dropdown',
          },
          {
            title: 'Click Save',
            description: 'Your Digital Object is created',
          },
          {
            title: 'Verify the result',
            description: 'Check the display page for accuracy',
          },
        ],
      },
      {
        id: 's2-collections',
        title: 'Working with Collections',
        duration: '10 min',
        content: `
Collections help organize related objects and provide context for discovery.

**What is a Collection?**
A Collection is a special type of ADO that groups other objects together. Objects can belong to multiple collections.

**Adding to a Collection:**
In the Collections step of the webform:
1. Start typing the collection name
2. Select from matching collections
3. Add multiple collections if appropriate

**Collection Hierarchy:**
- Collections can contain other collections
- Example: "Sorolla Collection" > "Sorolla Photographs" > Your photograph

**Best Practices:**
- Add objects to the most specific appropriate collection
- If no collection exists, your supervisor can create one
- Leave blank for first objects (collections can be assigned later)
        `,
        tips: [
          'You can add collection membership later by editing the object',
          'Ask your supervisor about the collection structure',
          'One object can belong to multiple collections',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Batch Operations & Search',
    subtitle: 'AMI Imports and Finding Your Content',
    duration: '~90 minutes',
    difficulty: 'intermediate',
    audience: 'Power users',
    description:
      'Learn how to work with multiple objects efficiently. This session covers the Archipelago Multi-Importer (AMI) for batch imports, spreadsheet preparation, and effective search strategies.',
    objectives: [
      'Understand when and why to use AMI for batch imports',
      'Prepare a properly formatted import spreadsheet',
      'Execute a batch import and monitor its progress',
      'Search the repository using various strategies',
      'Perform batch find and replace operations',
      'Export data to CSV for analysis or backup',
    ],
    lessons: [
      {
        id: 's3-ami-intro',
        title: 'Introduction to AMI',
        duration: '15 min',
        content: `
The Archipelago Multi-Importer (AMI) lets you create or update many objects at once using spreadsheet data.

**When to Use AMI:**
- Importing a batch of similar objects (e.g., 100 photographs from one collection)
- Migrating data from another system
- Bulk updating metadata across multiple objects
- Creating objects from existing inventories or finding aids

**AMI Capabilities:**
- Import from CSV, Excel, or Google Sheets
- Create new objects or update existing ones
- Handle parent-child relationships (items within collections)
- Process remote file URLs automatically
- Support complex metadata transformations

**The AMI Workflow:**
1. Prepare your spreadsheet with required columns
2. Upload or connect to your data source
3. Configure mapping and import settings
4. Generate an AMI Set (preview)
5. Process the AMI Set to create objects

**Access AMI:**
Navigate to \`/amiset/list\` or Content > AMI Sets
        `,
        tips: [
          'Always test with a small batch (5-10 items) before large imports',
          'AMI Sets can be reprocessed if something goes wrong',
          'Keep your original spreadsheet as a backup',
        ],
      },
      {
        id: 's3-spreadsheet',
        title: 'Preparing Import Spreadsheets',
        duration: '25 min',
        content: `
A well-prepared spreadsheet is crucial for successful batch imports.

**Required Columns:**
- \`type\`: The object type (e.g., "Photograph", "Painting")
- \`label\`: The title for each object

**Common Columns:**
- \`node_uuid\`: Unique identifier (auto-generated if blank)
- \`date_created\`: Creation date
- \`creator\`: Creator/artist name
- \`description\`: Narrative description
- \`subject\`: Subject terms (use | to separate multiple)
- \`file\`: Path or URL to the digital file
- \`ismemberof\`: Collection membership

**Formatting Rules:**
- First row must be column headers
- One object per row
- Consistent date formats throughout
- Multiple values separated by | (pipe character)
- Empty cells are okay for optional fields

**Example Spreadsheet:**
| type | label | date_created | creator | file |
|------|-------|--------------|---------|------|
| Photograph | Sorolla Portrait 1 | 1910 | Unknown | https://files.example.com/img001.jpg |
| Photograph | Sorolla Portrait 2 | 1912 | J. Laurent | https://files.example.com/img002.jpg |
        `,
        tips: [
          'Use Google Sheets for easy sharing and collaboration',
          'Save as CSV for final upload (UTF-8 encoding)',
          'Check for hidden characters or formatting issues',
          'Column names are case-sensitive',
        ],
      },
      {
        id: 's3-import-process',
        title: 'Running a Batch Import',
        duration: '20 min',
        content: `
Let's walk through the AMI import process step by step.

**Step 1: Create New AMI Set**
- Go to Content > AMI Sets > Add AMI Set
- Choose your data source (CSV Upload, Google Sheets, etc.)
- Upload your file or enter the Google Sheets URL

**Step 2: Configure Mapping**
- Select the Content Type (usually "Digital Object")
- Map spreadsheet columns to Archipelago fields
- Set default values for unmapped fields

**Step 3: Set Processing Options**
- Choose whether to create new or update existing
- Set file handling (download from URLs, reference only)
- Configure parent-child relationships if needed

**Step 4: Generate AMI Set**
- Review the preview showing planned operations
- Check for errors or warnings
- The system creates a queue of objects to process

**Step 5: Process the AMI Set**
- Click "Process" to begin creating objects
- Monitor progress in the queue
- Review results when complete
        `,
        steps: [
          {
            title: 'Navigate to AMI Sets',
            description: 'Go to Content > AMI Sets',
          },
          {
            title: 'Create new AMI Set',
            description: 'Click Add AMI Set and select your data source',
          },
          {
            title: 'Upload your spreadsheet',
            description: 'Select your prepared CSV file',
          },
          {
            title: 'Configure column mapping',
            description: 'Match spreadsheet columns to Archipelago fields',
          },
          {
            title: 'Generate and review',
            description: 'Check the preview for errors',
          },
          {
            title: 'Process the set',
            description: 'Click Process and monitor progress',
          },
        ],
      },
      {
        id: 's3-search',
        title: 'Searching Effectively',
        duration: '15 min',
        content: `
Archipelago uses Apache Solr for powerful search capabilities.

**Basic Search:**
- Use the search box on the main page
- Enter keywords separated by spaces (AND is implied)
- Results show matching objects with snippets

**Advanced Search Techniques:**
- **Exact phrase**: Use quotes "portrait of Sorolla"
- **OR search**: painting OR photograph
- **Exclude terms**: sorolla -landscape
- **Wildcards**: soroll* (matches sorolla, sorollas, etc.)

**Faceted Search:**
- Filter results by type, date, collection
- Narrow down large result sets
- Combine multiple facets

**Field-Specific Search:**
Some interfaces allow searching specific fields:
- creator:sorolla
- date_created:1910
- type:photograph

**Search Tips:**
- Start broad, then narrow with facets
- Try synonyms if initial search yields few results
- Check spelling of names and terms
        `,
        tips: [
          'Use facets to quickly narrow large result sets',
          'Save useful searches for repeated use',
          'Search is not case-sensitive',
        ],
      },
      {
        id: 's3-find-replace',
        title: 'Batch Find and Replace',
        duration: '10 min',
        content: `
Need to update the same information across many objects? Use batch find and replace.

**When to Use:**
- Correcting a spelling error across multiple records
- Updating a term to a standardized version
- Adding missing information to a set of objects

**Safety First:**
- Always test on a small set first
- Review changes before applying
- Keep records of what you changed and when

**Access:**
Navigate to the Find and Replace tools in the admin menu (exact location may vary).

**Process:**
1. Define your search criteria (what to find)
2. Define the replacement value
3. Preview affected objects
4. Confirm and execute
5. Review results

**Limitations:**
- Cannot undo easily—be certain before applying
- Complex transformations may require IT assistance
- Some fields may be protected from bulk changes
        `,
        tips: [
          'Document your find/replace operations',
          'Ask a supervisor before making large batch changes',
          'Consider exporting data first as a backup',
        ],
      },
      {
        id: 's3-export',
        title: 'Exporting to CSV',
        duration: '10 min',
        content: `
Export your data for backup, analysis, or sharing.

**Why Export:**
- Create backups of your metadata
- Analyze data in spreadsheet software
- Share information with colleagues
- Prepare data for reports

**Export Options:**
- **All fields**: Complete metadata export
- **Selected fields**: Choose specific columns
- **Filtered results**: Export only search results

**How to Export:**
1. Navigate to Content list or search results
2. Select objects to export (or select all)
3. Choose "Export to CSV" from actions
4. Configure export options
5. Download the resulting file

**Working with Exports:**
- Open in Excel, Google Sheets, or similar
- UTF-8 encoding preserves special characters
- Large exports may take time to generate
        `,
        tips: [
          'Regular exports provide useful backups',
          'Exports can serve as templates for batch imports',
          'Check encoding if special characters appear wrong',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Advanced Features',
    subtitle: 'Display, IIIF, Annotations & More',
    duration: '~90 minutes',
    difficulty: 'advanced',
    audience: 'Supervisors & power users',
    description:
      'Explore advanced Archipelago features including display customization, IIIF image serving, annotations for visual materials, embargo controls, and when to escalate issues to IT.',
    objectives: [
      'Understand display modes and how they affect presentation',
      'Know the benefits of IIIF for image delivery',
      'Create annotations on photographs and artworks',
      'Apply embargo restrictions when needed',
      'Identify issues that require IT support',
    ],
    lessons: [
      {
        id: 's4-display-modes',
        title: 'Understanding Display Modes',
        duration: '20 min',
        content: `
Display modes control how your Digital Objects appear to viewers.

**What are Display Modes?**
Display modes (or View Modes) determine which fields show and how they're formatted when viewing an object.

**Common Display Modes:**
- **Full**: Complete view with all metadata and viewers
- **Teaser**: Compact view for search results and lists
- **IIIF Viewer**: Focused on image viewing with Mirador
- **PDF Viewer**: Optimized for document display

**How Display Modes Work:**
Each display mode applies "formatters" to fields. For example:
- The Strawberry Field might use an "IIIF Manifest" formatter in one mode
- The same field might use a "Metadata Table" formatter in another

**For Catalogers:**
- You typically don't configure display modes
- Understanding them helps troubleshoot display issues
- If something doesn't appear correctly, the display mode configuration may need adjustment

**Requesting Changes:**
If you need a display to work differently:
- Document what you see vs. what you expect
- Note the object URL and display mode
- Contact your supervisor or IT
        `,
        tips: [
          'Display mode issues are usually configuration, not data problems',
          'The same metadata can appear differently in different contexts',
          'Screenshot issues to help IT understand the problem',
        ],
      },
      {
        id: 's4-iiif',
        title: 'IIIF and Image Serving',
        duration: '20 min',
        content: `
IIIF (International Image Interoperability Framework) is a standard for delivering high-quality images on the web.

**What IIIF Provides:**
- **Deep Zoom**: Explore high-resolution images in detail
- **Efficient Delivery**: Only loads the portion you're viewing
- **Standard Format**: Works with tools across institutions
- **Annotations**: Add scholarly notes directly on images

**The IIIF Viewers:**
Archipelago includes several viewers:
- **OpenSeadragon**: Basic zoom and pan
- **Mirador**: Full-featured viewer with comparison tools
- **Universal Viewer**: Alternative with different features

**For Visual Materials:**
IIIF is especially valuable for:
- Detailed photographs where users need to zoom
- Paintings and artworks with fine details
- Manuscripts and documents with small text
- Any image where resolution matters

**What You Need to Know:**
- IIIF works automatically for uploaded images
- Large images are processed to enable tiling
- Thumbnails are generated automatically
- Processing may take time for very large files
        `,
        tips: [
          'IIIF processing happens in the background after upload',
          'Very large files may take longer to become zoomable',
          'If zoom isn\'t working, the image may still be processing',
        ],
      },
      {
        id: 's4-annotations',
        title: 'Creating Annotations',
        duration: '20 min',
        content: `
Annotations let you add notes and highlights directly on images.

**What are Annotations?**
Digital notes attached to specific regions of an image. They can include:
- Text descriptions
- Tags or categories
- Links to related resources
- Scholarly commentary

**Creating Annotations:**
1. View the object in the IIIF viewer (OpenSeadragon)
2. Hold Shift and click-drag to draw a region
3. Enter your annotation text
4. Save the annotation

**Annotation Types:**
- **Rectangle**: Draw a box around an area
- **Polygon**: Draw a freehand shape

**Saving Annotations:**
- Annotations are stored in the object's JSON metadata
- Click Edit on the object to save permanently
- Annotations persist across sessions

**Common Use Cases:**
- Identify figures in group photographs
- Note condition issues on artworks
- Mark significant details in manuscripts
- Add provenance or exhibition notes
        `,
        steps: [
          {
            title: 'Open the object in full view',
            description: 'Navigate to the Digital Object page',
          },
          {
            title: 'Enter annotation mode',
            description: 'Look for annotation tools in the viewer',
          },
          {
            title: 'Draw your region',
            description: 'Hold Shift and drag to create a selection',
          },
          {
            title: 'Add annotation text',
            description: 'Enter your note in the popup',
          },
          {
            title: 'Save to the object',
            description: 'Edit the object to permanently save annotations',
          },
        ],
      },
      {
        id: 's4-embargo',
        title: 'Embargo and Access Control',
        duration: '15 min',
        content: `
Sometimes materials need restricted access. Archipelago provides several embargo options.

**When to Use Embargo:**
- Pre-publication materials
- Donor-restricted content
- Sensitive personal information
- Materials under copyright restrictions

**Embargo Types:**

**Date-Based Embargo:**
- Files hidden until a specific date
- Metadata remains visible
- Automatically lifts when date passes

**IP-Based Embargo:**
- Files visible only from specific IP addresses
- Useful for on-site only access
- Metadata visible to everyone

**Role-Based Access:**
- Certain roles can bypass embargoes
- Researchers might have special access
- Staff can always view embargoed materials

**Setting an Embargo:**
1. Edit the Digital Object
2. Locate embargo fields (may vary by setup)
3. Enter embargo date or IP restrictions
4. Save the object

**Important Notes:**
- Test embargo settings after applying
- Document why items are embargoed
- Set calendar reminders to review embargoes
        `,
        tips: [
          'Embargoes affect files, not necessarily metadata',
          'Always test from a non-staff perspective',
          'Keep records of embargo reasons and lift dates',
        ],
      },
      {
        id: 's4-troubleshooting',
        title: 'When to Escalate to IT',
        duration: '15 min',
        content: `
Know when an issue requires technical support.

**Handle Yourself:**
- Typos and metadata corrections
- Adding objects to collections
- Basic webform questions
- Search and navigation issues
- Understanding display differences

**Ask Your Supervisor:**
- Permission or access questions
- Batch operation approval
- Policy clarifications
- Unusual metadata situations

**Escalate to IT:**
- System errors (500 errors, crashes)
- Login or authentication problems
- Files not uploading or processing
- Viewer not loading or broken
- Missing expected features
- Performance issues (very slow)
- Data that appears corrupted

**How to Report Issues:**
Include:
1. What you were trying to do
2. What happened instead
3. URL of the affected page
4. Screenshots of any errors
5. Steps to reproduce the problem
6. When the issue started

**Emergency Contacts:**
[Contact your IT department]
        `,
        tips: [
          'Document issues with screenshots and URLs',
          'Note if the problem is consistent or intermittent',
          'Try clearing your browser cache before reporting',
          'Check if colleagues experience the same issue',
        ],
      },
    ],
  },
]
