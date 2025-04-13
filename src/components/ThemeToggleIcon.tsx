'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

const ThemeToggleIcon = ({ theme }: { theme: string }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />
}

export default ThemeToggleIcon
