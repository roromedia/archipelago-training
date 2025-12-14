import { Lightbulb, AlertTriangle, Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface TipBoxProps {
  tips: string[]
  variant?: 'tip' | 'warning' | 'info'
  title?: string
}

export function TipBox({ tips, variant = 'tip', title }: TipBoxProps) {
  const Icon = variant === 'warning' ? AlertTriangle : variant === 'info' ? Info : Lightbulb

  const variants = {
    tip: {
      bg: 'bg-gold/10 border-gold/30',
      icon: 'text-gold',
      title: 'Tips',
    },
    warning: {
      bg: 'bg-destructive/10 border-destructive/30',
      icon: 'text-destructive',
      title: 'Important',
    },
    info: {
      bg: 'bg-primary/10 border-primary/30',
      icon: 'text-primary',
      title: 'Note',
    },
  }

  const style = variants[variant]

  return (
    <Card className={cn('border', style.bg)}>
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <Icon className={cn('h-5 w-5 mt-0.5 shrink-0', style.icon)} />
          <div className="space-y-2">
            <h4 className="font-ui font-semibold text-sm">
              {title || style.title}
            </h4>
            <ul className="space-y-1.5">
              {tips.map((tip, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-baseline gap-2">
                  <span className="text-muted-foreground/50">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface AlertBoxProps {
  children: React.ReactNode
  variant?: 'tip' | 'warning' | 'info'
  title?: string
}

export function AlertBox({ children, variant = 'info', title }: AlertBoxProps) {
  const Icon = variant === 'warning' ? AlertTriangle : variant === 'info' ? Info : Lightbulb

  const variants = {
    tip: {
      bg: 'bg-gold/10 border-gold/30',
      icon: 'text-gold',
    },
    warning: {
      bg: 'bg-destructive/10 border-destructive/30',
      icon: 'text-destructive',
    },
    info: {
      bg: 'bg-primary/10 border-primary/30',
      icon: 'text-primary',
    },
  }

  const style = variants[variant]

  return (
    <div className={cn('flex gap-3 rounded-lg border p-4', style.bg)}>
      <Icon className={cn('h-5 w-5 shrink-0', style.icon)} />
      <div>
        {title && <h4 className="font-ui font-semibold text-sm mb-1">{title}</h4>}
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}
