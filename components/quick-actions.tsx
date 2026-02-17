"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, CreditCard, Settings } from "lucide-react"

const actions = [
  { icon: Calendar, label: "Reserve", color: "text-primary" },
  { icon: MapPin, label: "Locate", color: "text-emerald-400" },
  { icon: CreditCard, label: "Billing", color: "text-amber-400" },
  { icon: Settings, label: "Settings", color: "text-muted-foreground" },
]

export function QuickActions() {
  return (
    <div className="px-5 py-4">
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action, i) => (
          <motion.button
            key={action.label}
            className="flex flex-col items-center gap-2 rounded-xl glass py-4 px-2"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            aria-label={action.label}
          >
            <action.icon className={`h-5 w-5 ${action.color}`} />
            <span className="text-[11px] font-medium text-muted-foreground">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
