import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { glossary, glossaryByTerm, type GlossaryTerm as GlossaryTermType } from '@/content/glossary'

interface GlossaryTermProps {
  term: string
  children?: React.ReactNode
}

export function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const glossaryItem = glossaryByTerm[term.toLowerCase()]

  if (!glossaryItem) {
    return <span>{children || term}</span>
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="glossary-term">{children || term}</span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold">{glossaryItem.term}</span>
              <Badge variant="outline" className="text-xs">
                {glossaryItem.category}
              </Badge>
            </div>
            <p className="text-sm">{glossaryItem.definition}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface GlossaryListProps {
  category?: 'archipelago' | 'drupal' | 'technical'
}

export function GlossaryList({ category }: GlossaryListProps) {
  const items = category
    ? glossary.filter((item: GlossaryTermType) => item.category === category)
    : glossary

  return (
    <div className="space-y-4">
      {items.map((item: GlossaryTermType) => (
        <div key={item.term} className="group">
          <div className="flex items-start gap-3">
            <Badge
              variant="outline"
              className="mt-1 shrink-0 text-xs capitalize"
            >
              {item.category}
            </Badge>
            <div>
              <h4 className="font-display font-semibold text-foreground">
                {item.term}
              </h4>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {item.definition}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
