import { Clock, Users, ChevronRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { Session } from '@/content/sessions'

interface SessionCardProps {
  session: Session
  progress: {
    completed: number
    total: number
    percentage: number
  }
  onClick: () => void
}

export function SessionCard({ session, progress, onClick }: SessionCardProps) {
  return (
    <Card
      className="session-card cursor-pointer group decorative-border"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <Badge
            variant={
              session.difficulty === 'beginner'
                ? 'beginner'
                : session.difficulty === 'intermediate'
                  ? 'intermediate'
                  : 'advanced'
            }
          >
            Session {session.id} • {session.difficulty}
          </Badge>
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </div>
        <CardTitle className="mt-3 text-xl">{session.title}</CardTitle>
        <CardDescription className="font-body">
          {session.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {session.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground font-ui">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{session.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{session.audience}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between font-ui text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {progress.completed}/{progress.total} complete
            </span>
          </div>
          <Progress value={progress.percentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
