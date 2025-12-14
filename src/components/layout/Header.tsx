import { Moon, Sun, Search, BookOpen, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/features/ThemeProvider'

interface HeaderProps {
  onMenuClick: () => void
  onSearchClick: () => void
}

export function Header({ onMenuClick, onSearchClick }: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Logo and title */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-lg font-semibold tracking-tight">
              Archipelago Training
            </h1>
            <p className="font-ui text-xs text-muted-foreground">
              Documentation & Guides
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search button */}
        <Button
          variant="outline"
          className="mr-2 hidden w-64 justify-start text-muted-foreground sm:flex"
          onClick={onSearchClick}
        >
          <Search className="mr-2 h-4 w-4" />
          <span className="font-ui text-sm">Search documentation...</span>
          <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        {/* Mobile search button */}
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 sm:hidden"
          onClick={onSearchClick}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={cycleTheme}
          title={`Current: ${theme}. Click to change.`}
        >
          {resolvedTheme === 'dark' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      {/* Decorative gold line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
    </header>
  )
}
