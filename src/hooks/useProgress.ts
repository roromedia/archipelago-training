import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'archipelago-training-progress'

export interface ProgressItem {
  id: string
  sessionId: number
  label: string
  completed: boolean
}

export function useProgress(initialItems: ProgressItem[]) {
  const [items, setItems] = useState<ProgressItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Merge with initial items to handle new items
        return initialItems.map((item) => {
          const storedItem = parsed.find((p: ProgressItem) => p.id === item.id)
          return storedItem ? { ...item, completed: storedItem.completed } : item
        })
      } catch {
        return initialItems
      }
    }
    return initialItems
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const toggleItem = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }, [])

  const resetProgress = useCallback(() => {
    setItems(initialItems.map((item) => ({ ...item, completed: false })))
  }, [initialItems])

  const completedCount = items.filter((item) => item.completed).length
  const totalCount = items.length
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const getSessionProgress = useCallback(
    (sessionId: number) => {
      const sessionItems = items.filter((item) => item.sessionId === sessionId)
      const completed = sessionItems.filter((item) => item.completed).length
      return {
        completed,
        total: sessionItems.length,
        percentage:
          sessionItems.length > 0
            ? Math.round((completed / sessionItems.length) * 100)
            : 0,
      }
    },
    [items]
  )

  return {
    items,
    toggleItem,
    resetProgress,
    completedCount,
    totalCount,
    percentage,
    getSessionProgress,
  }
}
