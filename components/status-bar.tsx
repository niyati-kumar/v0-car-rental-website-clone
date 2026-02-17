"use client"

import { Signal, Wifi, Battery } from "lucide-react"

export function StatusBar() {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const timeString = `${hours}:${minutes}`

  return (
    <div className="flex items-center justify-between px-5 py-2 text-xs font-medium text-foreground">
      <span className="font-mono">{timeString}</span>
      <div className="flex items-center gap-1.5">
        <Signal className="h-3.5 w-3.5" />
        <Wifi className="h-3.5 w-3.5" />
        <Battery className="h-3.5 w-3.5" />
      </div>
    </div>
  )
}
