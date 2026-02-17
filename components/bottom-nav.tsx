"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Home, Search, CarFront, Heart, User } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Explore" },
  { icon: CarFront, label: "Garage" },
  { icon: Heart, label: "Saved" },
  { icon: User, label: "Profile" },
]

export function BottomNav() {
  const [active, setActive] = useState(0)

  return (
    <nav className="glass-strong rounded-t-2xl" aria-label="Main navigation">
      <div className="flex items-center justify-around py-2 pb-4">
        {navItems.map((item, i) => (
          <motion.button
            key={item.label}
            className="relative flex flex-col items-center gap-1 py-1 px-3"
            whileTap={{ scale: 0.9 }}
            onClick={() => setActive(i)}
            aria-label={item.label}
            aria-current={i === active ? "page" : undefined}
          >
            {i === active && (
              <motion.div
                className="absolute -top-0.5 h-0.5 w-6 rounded-full bg-primary glow-sm"
                layoutId="nav-indicator"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <item.icon
              className={`h-5 w-5 transition-colors ${
                i === active ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <span
              className={`text-[10px] transition-colors ${
                i === active ? "text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>
    </nav>
  )
}
