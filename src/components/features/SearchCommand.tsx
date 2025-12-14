import { useEffect } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Search, GraduationCap, FileText, Sparkles } from 'lucide-react'
import { sessions } from '@/content/sessions'
import { glossary } from '@/content/glossary'

interface SearchCommandProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNavigate: (sectionId: string) => void
}

export function SearchCommand({
  open,
  onOpenChange,
  onNavigate,
}: SearchCommandProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, onOpenChange])

  const handleSelect = (sectionId: string) => {
    onOpenChange(false)
    onNavigate(sectionId)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search documentation..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Quick Links */}
        <CommandGroup heading="Quick Links">
          <CommandItem onSelect={() => handleSelect('welcome')}>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Welcome & Overview</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect('glossary')}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Key Concepts Glossary</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect('quick-reference')}>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Quick Reference</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Sessions */}
        <CommandGroup heading="Training Sessions">
          {sessions.map((session) => (
            <CommandItem
              key={session.id}
              onSelect={() => handleSelect(`session-${session.id}`)}
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Session {session.id}: {session.title}</span>
              <Badge
                variant={
                  session.difficulty === 'beginner'
                    ? 'beginner'
                    : session.difficulty === 'intermediate'
                      ? 'intermediate'
                      : 'advanced'
                }
                className="ml-auto"
              >
                {session.difficulty}
              </Badge>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Lessons */}
        <CommandGroup heading="Lessons">
          {sessions.flatMap((session) =>
            session.lessons.map((lesson) => (
              <CommandItem
                key={lesson.id}
                onSelect={() => handleSelect(lesson.id)}
              >
                <Search className="mr-2 h-4 w-4" />
                <span className="truncate">{lesson.title}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  Session {session.id}
                </span>
              </CommandItem>
            ))
          )}
        </CommandGroup>

        <CommandSeparator />

        {/* Glossary Terms */}
        <CommandGroup heading="Glossary Terms">
          {glossary.slice(0, 10).map((term) => (
            <CommandItem
              key={term.term}
              onSelect={() => handleSelect('glossary')}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>{term.term}</span>
              <Badge variant="outline" className="ml-auto text-xs">
                {term.category}
              </Badge>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
