import { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ThemeProvider } from '@/components/features/ThemeProvider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { ProgressPanel } from '@/components/layout/ProgressPanel'
import { SearchCommand } from '@/components/features/SearchCommand'
import { SessionCard } from '@/components/content/SessionCard'
import { LessonSection } from '@/components/content/LessonSection'
import { TipBox } from '@/components/content/TipBox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useProgress } from '@/hooks/useProgress'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { sessions } from '@/content/sessions'
import { glossary } from '@/content/glossary'
import { checklistItems } from '@/content/checklist'
import { BookOpen, GraduationCap, Sparkles, FileText, ExternalLink } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // Build section IDs for scroll spy
  const sectionIds = useMemo(() => {
    const ids = ['welcome', 'glossary']
    sessions.forEach((session) => {
      ids.push(`session-${session.id}`)
      session.lessons.forEach((lesson) => {
        ids.push(lesson.id)
      })
    })
    ids.push('quick-reference')
    return ids
  }, [])

  const { activeSection, scrollToSection } = useScrollSpy(sectionIds, 100)

  // Progress tracking
  const {
    items: progressItems,
    toggleItem,
    resetProgress,
    percentage,
    completedCount,
    totalCount,
    getSessionProgress,
  } = useProgress(checklistItems)

  const handleNavigate = useCallback(
    (sectionId: string) => {
      setSidebarOpen(false)
      scrollToSection(sectionId)
    },
    [scrollToSection]
  )

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background paper-texture">
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onSearchClick={() => setSearchOpen(true)}
        />

        <div className="flex">
          {/* Desktop Sidebar */}
          <Sidebar
            className="hidden md:flex w-72 sticky top-16 h-[calc(100vh-4rem)] shrink-0"
            activeSection={activeSection}
            onNavigate={handleNavigate}
            getSessionProgress={getSessionProgress}
          />

          {/* Mobile Sidebar */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="w-72 p-0">
              <Sidebar
                className="h-full"
                activeSection={activeSection}
                onNavigate={handleNavigate}
                getSessionProgress={getSessionProgress}
              />
            </SheetContent>
          </Sheet>

          {/* Main Content */}
          <main className="flex-1 px-4 py-8 md:px-8 lg:px-12 max-w-4xl">
            {/* Welcome Section */}
            <motion.section
              id="welcome"
              className="scroll-mt-24 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="gold" className="mb-4">
                Welcome
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Archipelago Training
              </h1>
              <p className="font-display text-xl text-muted-foreground mb-6">
                Digital Repository Documentation
              </p>

              <div className="prose prose-stone dark:prose-invert max-w-none mb-8">
                <p className="text-lg leading-relaxed">
                  Welcome to the comprehensive training guide for Archipelago digital repository systems. This documentation will take you from beginner to confident user through four structured training sessions.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 mb-8">
                <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                  <BookOpen className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-ui font-semibold">4 Training Sessions</h3>
                    <p className="text-sm text-muted-foreground">
                      Progressive learning from basics to advanced features
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                  <GraduationCap className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-ui font-semibold">~6 Hours Total</h3>
                    <p className="text-sm text-muted-foreground">
                      Designed for 90-minute Zoom sessions
                    </p>
                  </div>
                </div>
              </div>

              <TipBox
                variant="info"
                title="How to Use This Documentation"
                tips={[
                  'Work through sessions in order for the best learning experience',
                  'Use the floating Progress button to track what you\'ve completed',
                  'Hover over underlined terms to see glossary definitions',
                  'Press ⌘K (or Ctrl+K) to quickly search for any topic',
                ]}
              />

              <Separator className="my-12" />

              {/* Session Overview Cards */}
              <h2 className="font-display text-2xl font-semibold mb-6">
                Training Sessions
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {sessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  >
                    <SessionCard
                      session={session}
                      progress={getSessionProgress(session.id)}
                      onClick={() => handleNavigate(`session-${session.id}`)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Glossary Section */}
            <motion.section
              id="glossary"
              className="scroll-mt-24 mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-4">
                Reference
              </Badge>
              <h2 className="font-display text-3xl font-semibold mb-4">
                Key Concepts
              </h2>
              <p className="text-muted-foreground mb-8">
                Essential terminology for working with Archipelago and Drupal.
                These terms appear throughout the training sessions.
              </p>

              <div className="space-y-4">
                {glossary.map((item, index) => (
                  <motion.div
                    key={item.term}
                    className="p-4 rounded-lg border bg-card hover:bg-card/80 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Badge
                      variant="outline"
                      className={cn(
                        'mb-2 capitalize',
                        item.category === 'archipelago' && 'border-primary text-primary',
                        item.category === 'drupal' && 'border-secondary text-secondary',
                        item.category === 'technical' && 'border-accent text-accent'
                      )}
                    >
                      {item.category}
                    </Badge>
                    <h3 className="font-display font-semibold">{item.term}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {item.definition}
                    </p>
                  </motion.div>
                ))}
              </div>

              <Separator className="my-12" />
            </motion.section>

            {/* Session Sections */}
            {sessions.map((session) => (
              <motion.div
                key={session.id}
                id={`session-${session.id}`}
                className="scroll-mt-24 mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-8">
                  <Badge
                    variant={
                      session.difficulty === 'beginner'
                        ? 'beginner'
                        : session.difficulty === 'intermediate'
                          ? 'intermediate'
                          : 'advanced'
                    }
                    className="mb-4"
                  >
                    Session {session.id} • {session.difficulty}
                  </Badge>
                  <h2 className="font-display text-3xl font-semibold mb-2">
                    {session.title}
                  </h2>
                  <p className="font-display text-lg text-muted-foreground mb-4">
                    {session.subtitle}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {session.description}
                  </p>

                  <div className="p-4 rounded-lg border bg-card mb-8">
                    <h4 className="font-ui font-semibold mb-3">
                      Learning Objectives
                    </h4>
                    <ul className="space-y-2">
                      {session.objectives.map((objective, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Sparkles className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Lessons */}
                <div className="space-y-12">
                  {session.lessons.map((lesson) => (
                    <LessonSection
                      key={lesson.id}
                      lesson={lesson}
                      sessionId={session.id}
                    />
                  ))}
                </div>

                <Separator className="mt-12" />
              </motion.div>
            ))}

            {/* Quick Reference Section */}
            <motion.section
              id="quick-reference"
              className="scroll-mt-24 mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="gold" className="mb-4">
                Reference
              </Badge>
              <h2 className="font-display text-3xl font-semibold mb-4">
                Quick Reference
              </h2>
              <p className="text-muted-foreground mb-8">
                Handy shortcuts and common URLs for everyday use.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Common URLs
                  </h3>
                  <ul className="space-y-2 font-mono text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Content list</span>
                      <code className="text-accent">/admin/content</code>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Add object</span>
                      <code className="text-accent">/node/add/digital_object</code>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">AMI Sets</span>
                      <code className="text-accent">/amiset/list</code>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Search</span>
                      <code className="text-accent">/search</code>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Keyboard Shortcuts
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Search docs</span>
                      <kbd className="px-2 py-1 rounded bg-muted font-mono text-xs">⌘K</kbd>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Toggle theme</span>
                      <span className="text-xs text-muted-foreground">Click sun/moon</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-lg border bg-card">
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  Additional Resources
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://docs.archipelago.nyc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Official Archipelago Documentation →
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/esmero/archipelago-deployment"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Archipelago GitHub Repository →
                    </a>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Footer */}
            <footer className="mt-16 py-8 border-t text-center text-sm text-muted-foreground">
              <p className="font-ui">
                Archipelago Training Documentation
              </p>
              <p className="mt-2 text-xs">
                Built with care by{' '}
                <a
                  href="https://www.roromedia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Roromedia GmbH
                </a>
              </p>
            </footer>
          </main>
        </div>

        {/* Progress Panel */}
        <ProgressPanel
          items={progressItems}
          toggleItem={toggleItem}
          resetProgress={resetProgress}
          percentage={percentage}
          completedCount={completedCount}
          totalCount={totalCount}
          getSessionProgress={getSessionProgress}
        />

        {/* Search Command */}
        <SearchCommand
          open={searchOpen}
          onOpenChange={setSearchOpen}
          onNavigate={handleNavigate}
        />
      </div>
    </TooltipProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="archipelago-training-theme">
      <AppContent />
    </ThemeProvider>
  )
}
