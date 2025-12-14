import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  title: string
  description: string
}

interface StepGuideProps {
  steps: Step[]
}

export function StepGuide({ steps }: StepGuideProps) {
  return (
    <div className="relative pl-8">
      {/* Vertical connector line */}
      <div className="step-connector" />

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Step number circle */}
            <div className="absolute -left-8 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold bg-background font-ui text-sm font-semibold text-gold">
              {index + 1}
            </div>

            {/* Step content */}
            <div className="pt-1">
              <h4 className="font-ui font-semibold text-foreground">
                {step.title}
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface InteractiveStepGuideProps {
  steps: Step[]
  completedSteps: number[]
  onToggleStep: (index: number) => void
}

export function InteractiveStepGuide({
  steps,
  completedSteps,
  onToggleStep,
}: InteractiveStepGuideProps) {
  return (
    <div className="relative pl-8">
      {/* Vertical connector line */}
      <div className="step-connector" />

      <div className="space-y-6">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index)

          return (
            <div key={index} className="relative">
              {/* Step number/check circle */}
              <button
                onClick={() => onToggleStep(index)}
                className={cn(
                  'absolute -left-8 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300',
                  isCompleted
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-gold bg-background text-gold hover:bg-gold/10'
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="font-ui text-sm font-semibold">
                    {index + 1}
                  </span>
                )}
              </button>

              {/* Step content */}
              <div className="pt-1">
                <h4
                  className={cn(
                    'font-ui font-semibold transition-colors',
                    isCompleted
                      ? 'text-muted-foreground line-through'
                      : 'text-foreground'
                  )}
                >
                  {step.title}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
