import { Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { StepGuide } from './StepGuide'
import { TipBox } from './TipBox'
import type { Lesson } from '@/content/sessions'

interface LessonSectionProps {
  lesson: Lesson
  sessionId: number
}

export function LessonSection({ lesson, sessionId }: LessonSectionProps) {
  // Parse markdown-like content into sections
  const contentSections = lesson.content.trim().split('\n\n')

  return (
    <section id={lesson.id} className="scroll-mt-24">
      <div className="mb-6 flex items-center gap-4">
        <Badge variant="outline" className="font-ui">
          Session {sessionId}
        </Badge>
        <div className="flex items-center gap-1 text-sm text-muted-foreground font-ui">
          <Clock className="h-4 w-4" />
          <span>{lesson.duration}</span>
        </div>
      </div>

      <h2 className="font-display text-2xl font-semibold mb-4">
        {lesson.title}
      </h2>

      <div className="prose prose-stone dark:prose-invert max-w-none">
        {contentSections.map((section, index) => (
          <ContentBlock key={index} content={section} />
        ))}
      </div>

      {lesson.steps && lesson.steps.length > 0 && (
        <div className="mt-8">
          <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              !
            </span>
            Step-by-Step Guide
          </h3>
          <StepGuide steps={lesson.steps} />
        </div>
      )}

      {lesson.tips && lesson.tips.length > 0 && (
        <div className="mt-8">
          <TipBox tips={lesson.tips} />
        </div>
      )}
    </section>
  )
}

function ContentBlock({ content }: { content: string }) {
  // Handle code blocks
  if (content.startsWith('```')) {
    const lines = content.split('\n')
    const language = lines[0].replace('```', '')
    const code = lines.slice(1, -1).join('\n')

    return (
      <div className="code-block my-4">
        <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">
            {language || 'code'}
          </span>
        </div>
        <pre className="overflow-x-auto p-4">
          <code className="font-mono text-sm">{code}</code>
        </pre>
      </div>
    )
  }

  // Handle single-line bold headers (e.g., **Header**)
  if (content.startsWith('**') && content.endsWith('**') && !content.includes('\n')) {
    return (
      <h3 className="font-display text-lg font-semibold mt-6 mb-3">
        {content.slice(2, -2)}
      </h3>
    )
  }

  // Helper to check if content has numbered list items
  const hasNumberedList = (text: string) => /\n\d+\.\s/.test(text) || /^\d+\.\s/.test(text)
  const hasBulletList = (text: string) => text.includes('\n- ') || text.startsWith('- ')

  // Handle headers followed by bullet lists (e.g., **The Philosophy:**\n- item1\n- item2)
  if (content.startsWith('**') && content.includes(':**') && hasBulletList(content)) {
    const firstLineEnd = content.indexOf('\n')
    const headerLine = content.slice(0, firstLineEnd)
    const headerText = headerLine.replace(/^\*\*/, '').replace(/:\*\*$/, '').replace(/\*\*$/, '')
    const lines = content.slice(firstLineEnd + 1).split('\n')
    const items = lines.filter((line) => line.startsWith('- '))

    return (
      <div className="my-4">
        <h4 className="font-ui font-semibold mb-3">{headerText}:</h4>
        <ul className="space-y-2 text-muted-foreground">
          {items.map((item, i) => (
            <li key={i} className="flex items-baseline gap-2">
              <span className="text-primary shrink-0">•</span>
              <span>{formatInlineText(item.slice(2))}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // Handle headers followed by numbered lists (e.g., **Navigate to Create:**\n1. Click...)
  if (content.startsWith('**') && content.includes(':**') && hasNumberedList(content)) {
    const firstLineEnd = content.indexOf('\n')
    const headerLine = content.slice(0, firstLineEnd)
    const headerText = headerLine.replace(/^\*\*/, '').replace(/:\*\*$/, '').replace(/\*\*$/, '')
    const lines = content.slice(firstLineEnd + 1).split('\n')
    const items = lines.filter((line) => /^\d+\.\s/.test(line))

    return (
      <div className="my-4">
        <h4 className="font-ui font-semibold mb-3">{headerText}:</h4>
        <ol className="space-y-2 text-muted-foreground list-none">
          {items.map((item, i) => (
            <li key={i} className="flex items-baseline gap-3">
              <span className="text-primary font-semibold shrink-0">{i + 1}.</span>
              <span>{formatInlineText(item.replace(/^\d+\.\s/, ''))}</span>
            </li>
          ))}
        </ol>
      </div>
    )
  }

  // Handle bold headers with inline content (e.g., **Node**: description text)
  if (content.startsWith('**') && content.includes(':**') && !hasBulletList(content) && !hasNumberedList(content)) {
    const colonIndex = content.indexOf(':**')
    const headerText = content.slice(2, colonIndex)
    const bodyText = content.slice(colonIndex + 3).trim()

    return (
      <div className="my-4">
        <h4 className="font-ui font-semibold mb-2">{headerText}:</h4>
        <p className="text-muted-foreground leading-relaxed">{formatInlineText(bodyText)}</p>
      </div>
    )
  }

  // Handle standalone bold headers (e.g., **Common Roles:**)
  if (content.startsWith('**') && content.endsWith(':**') && !content.includes('\n')) {
    return (
      <h4 className="font-ui font-semibold mt-6 mb-3">
        {content.slice(2, -2)}
      </h4>
    )
  }

  // Handle bullet lists
  if (hasBulletList(content)) {
    const lines = content.split('\n')
    const items = lines.filter((line) => line.startsWith('- '))
    const prefix = lines.find((line) => line.trim() && !line.startsWith('- '))

    return (
      <div className="my-4">
        {prefix && <p className="mb-2">{formatInlineText(prefix)}</p>}
        <ul className="space-y-2 text-muted-foreground">
          {items.map((item, i) => (
            <li key={i} className="flex items-baseline gap-2">
              <span className="text-primary shrink-0">•</span>
              <span>{formatInlineText(item.slice(2))}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // Handle numbered lists
  if (hasNumberedList(content)) {
    const lines = content.split('\n')
    const items = lines.filter((line) => /^\d+\.\s/.test(line))
    const prefix = lines.find((line) => line.trim() && !/^\d+\.\s/.test(line))

    return (
      <div className="my-4">
        {prefix && <p className="mb-2">{formatInlineText(prefix)}</p>}
        <ol className="space-y-2 text-muted-foreground list-none">
          {items.map((item, i) => (
            <li key={i} className="flex items-baseline gap-3">
              <span className="text-primary font-semibold shrink-0">{i + 1}.</span>
              <span>{formatInlineText(item.replace(/^\d+\.\s/, ''))}</span>
            </li>
          ))}
        </ol>
      </div>
    )
  }

  // Handle tables (simple markdown tables)
  if (content.includes('|') && content.includes('\n|')) {
    const lines = content.split('\n').filter((l) => l.trim())
    const headers = lines[0]
      .split('|')
      .filter((h) => h.trim())
      .map((h) => h.trim())
    const rows = lines.slice(2).map((row) =>
      row
        .split('|')
        .filter((c) => c.trim())
        .map((c) => c.trim())
    )

    return (
      <div className="my-4 overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="border bg-muted/50 px-4 py-2 text-left font-ui text-sm font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="border px-4 py-2 font-mono text-sm"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // Default paragraph
  return (
    <p className="my-4 leading-relaxed text-foreground/90">
      {formatInlineText(content)}
    </p>
  )
}

function formatInlineText(text: string): React.ReactNode {
  // Handle inline code
  const parts = text.split(/(`[^`]+`)/)

  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-accent"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    // Handle bold
    const boldParts = part.split(/(\*\*[^*]+\*\*)/)
    return boldParts.map((bp, j) => {
      if (bp.startsWith('**') && bp.endsWith('**')) {
        return (
          <strong key={`${i}-${j}`} className="font-semibold">
            {bp.slice(2, -2)}
          </strong>
        )
      }
      return bp
    })
  })
}
