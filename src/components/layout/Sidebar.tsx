import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { sessions } from '@/content/sessions'
import { ChevronRight } from 'lucide-react'

interface SidebarProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
  getSessionProgress: (sessionId: number) => {
    completed: number
    total: number
    percentage: number
  }
  className?: string
}

export function Sidebar({
  activeSection,
  onNavigate,
  getSessionProgress,
  className,
}: SidebarProps) {
  return (
    <aside className={cn('flex flex-col border-r bg-card/50', className)}>
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-6 px-4">
          {/* Welcome section */}
          <div>
            <button
              onClick={() => onNavigate('welcome')}
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left font-ui text-sm transition-colors',
                activeSection === 'welcome'
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <ChevronRight
                className={cn(
                  'h-4 w-4 transition-transform',
                  activeSection === 'welcome' && 'rotate-90'
                )}
              />
              Welcome
            </button>
          </div>

          {/* Glossary section */}
          <div>
            <button
              onClick={() => onNavigate('glossary')}
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left font-ui text-sm transition-colors',
                activeSection === 'glossary'
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <ChevronRight
                className={cn(
                  'h-4 w-4 transition-transform',
                  activeSection === 'glossary' && 'rotate-90'
                )}
              />
              Key Concepts
            </button>
          </div>

          {/* Sessions */}
          {sessions.map((session) => {
            const progress = getSessionProgress(session.id)
            const isActiveSession = activeSection.startsWith(`session-${session.id}`)

            return (
              <div key={session.id} className="space-y-1">
                {/* Session header */}
                <button
                  onClick={() => onNavigate(`session-${session.id}`)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors',
                    isActiveSession
                      ? 'bg-primary/10'
                      : 'hover:bg-muted'
                  )}
                >
                  <Badge
                    variant={
                      session.difficulty === 'beginner'
                        ? 'beginner'
                        : session.difficulty === 'intermediate'
                          ? 'intermediate'
                          : 'advanced'
                    }
                    className="h-6 w-6 justify-center p-0 text-xs"
                  >
                    {session.id}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        'font-ui text-sm truncate',
                        isActiveSession
                          ? 'text-primary font-medium'
                          : 'text-foreground'
                      )}
                    >
                      {session.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress
                        value={progress.percentage}
                        className="h-1 flex-1"
                      />
                      <span className="font-ui text-xs text-muted-foreground whitespace-nowrap">
                        {progress.completed}/{progress.total}
                      </span>
                    </div>
                  </div>
                </button>

                {/* Lesson links */}
                {isActiveSession && (
                  <div className="ml-4 space-y-0.5 border-l pl-4">
                    {session.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => onNavigate(lesson.id)}
                        className={cn(
                          'block w-full rounded-md px-2 py-1.5 text-left font-ui text-xs transition-colors',
                          activeSection === lesson.id
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        {lesson.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {/* Quick Reference */}
          <div>
            <button
              onClick={() => onNavigate('quick-reference')}
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left font-ui text-sm transition-colors',
                activeSection === 'quick-reference'
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <ChevronRight
                className={cn(
                  'h-4 w-4 transition-transform',
                  activeSection === 'quick-reference' && 'rotate-90'
                )}
              />
              Quick Reference
            </button>
          </div>
        </nav>
      </ScrollArea>
    </aside>
  )
}
