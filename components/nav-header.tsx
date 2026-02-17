"use client"

import { Bell, User } from "lucide-react"
import { motion } from "framer-motion"

export function NavHeader() {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <div className="flex items-center gap-3">
        <motion.div
          className="flex h-10 w-10 items-center justify-center rounded-full glass"
          whileTap={{ scale: 0.95 }}
        >
          <User className="h-5 w-5 text-foreground" />
        </motion.div>
        <div>
          <p className="text-xs text-muted-foreground">Welcome back</p>
          <p className="text-sm font-semibold text-foreground">Alex Chen</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <motion.button
          className="relative flex h-10 w-10 items-center justify-center rounded-full glass"
          whileTap={{ scale: 0.95 }}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </motion.button>
        <div className="flex h-10 items-center gap-1.5 rounded-full glass px-3">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono text-primary">LIVE</span>
        </div>
      </div>
    </div>
  )
}
