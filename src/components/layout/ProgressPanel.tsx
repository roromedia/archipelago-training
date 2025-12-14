import { CheckCircle2, RotateCcw, ListChecks } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import type { ProgressItem } from '@/hooks/useProgress'
import { sessions } from '@/content/sessions'

interface ProgressPanelProps {
  items: ProgressItem[]
  toggleItem: (id: string) => void
  resetProgress: () => void
  percentage: number
  completedCount: number
  totalCount: number
  getSessionProgress: (sessionId: number) => {
    completed: number
    total: number
    percentage: number
  }
}

export function ProgressPanel({
  items,
  toggleItem,
  resetProgress,
  percentage,
  completedCount,
  totalCount,
  getSessionProgress,
}: ProgressPanelProps) {
  const groupedItems = sessions.map((session) => ({
    session,
    items: items.filter((item) => item.sessionId === session.id),
    progress: getSessionProgress(session.id),
  }))

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="fixed bottom-6 right-6 z-50 gap-2 shadow-lg hover:shadow-xl transition-shadow no-print"
        >
          <ListChecks className="h-5 w-5" />
          <span className="font-ui">Progress</span>
          <Badge variant="secondary" className="ml-1">
            {percentage}%
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Training Progress
            </SheetTitle>
          </div>
          <SheetDescription>
            Track your progress through the Archipelago training sessions.
          </SheetDescription>
        </SheetHeader>

        {/* Overall progress */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between font-ui text-sm">
            <span className="text-muted-foreground">Overall Completion</span>
            <span className="font-medium">
              {completedCount} of {totalCount} topics
            </span>
          </div>
          <Progress value={percentage} className="h-3" />
          <p className="text-center font-display text-2xl font-semibold text-primary">
            {percentage}%
          </p>
        </div>

        <Separator className="my-6" />

        {/* Session checklists */}
        <ScrollArea className="h-[calc(100vh-340px)]">
          <div className="space-y-6 pr-4">
            {groupedItems.map(({ session, items: sessionItems, progress }) => (
              <div key={session.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-semibold">
                    Session {session.id}: {session.title}
                  </h3>
                  <Badge
                    variant={
                      progress.percentage === 100
                        ? 'default'
                        : progress.percentage > 0
                          ? 'secondary'
                          : 'outline'
                    }
                    className="font-ui text-xs"
                  >
                    {progress.completed}/{progress.total}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {sessionItems.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-muted cursor-pointer"
                    >
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="mt-0.5"
                      />
                      <span
                        className={`font-ui text-sm leading-tight ${
                          item.completed
                            ? 'text-muted-foreground line-through'
                            : 'text-foreground'
                        }`}
                      >
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator className="my-4" />

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetProgress}
            className="flex-1 gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Progress
          </Button>
          <SheetClose asChild>
            <Button variant="default" size="sm" className="flex-1">
              Continue Learning
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
