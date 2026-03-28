'use client'

export function Icon({ name, filled = false }: { name: string; filled?: boolean }) {
  return (
    <span className={`material-symbols-outlined ${filled ? 'filled' : ''}`}>
      {name}
    </span>
  )
}
