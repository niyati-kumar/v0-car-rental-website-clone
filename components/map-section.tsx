"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Navigation } from "lucide-react"

const carLocations = [
  { id: 1, x: 25, y: 35, model: "Model S", status: "available" },
  { id: 2, x: 60, y: 50, model: "iX", status: "available" },
  { id: 3, x: 45, y: 20, model: "Taycan", status: "in-use" },
  { id: 4, x: 75, y: 65, model: "Model 3", status: "available" },
  { id: 5, x: 35, y: 70, model: "EQS", status: "charging" },
]

function PinIcon({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    available: "bg-primary",
    "in-use": "bg-amber-400",
    charging: "bg-emerald-400",
  }
  return (
    <div className="relative">
      <motion.div
        className={`h-3 w-3 rounded-full ${colorMap[status] || "bg-primary"}`}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className={`absolute inset-0 h-3 w-3 rounded-full ${colorMap[status] || "bg-primary"} opacity-40 animate-ping`}
      />
    </div>
  )
}

export function MapSection() {
  return (
    <div className="px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Nearby Vehicles</h2>
          <p className="text-xs text-muted-foreground">5 cars within 2 miles</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 rounded-full glass px-3 py-1.5"
          aria-label="Navigate to nearest car"
        >
          <Navigation className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-foreground">Navigate</span>
        </motion.button>
      </div>

      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/10]">
          <Image
            src="/images/dark-map.jpg"
            alt="Map showing nearby available vehicles"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

          {/* Car Location Pins */}
          {carLocations.map((loc) => (
            <motion.div
              key={loc.id}
              className="absolute z-10 flex flex-col items-center"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: loc.id * 0.15, type: "spring" }}
            >
              <div className="glass rounded-lg px-2 py-1 mb-1">
                <p className="text-[10px] font-mono text-foreground">{loc.model}</p>
              </div>
              <PinIcon status={loc.status} />
            </motion.div>
          ))}

          {/* User location */}
          <motion.div
            className="absolute z-10"
            style={{ left: "50%", top: "48%" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary glow-md">
              <div className="h-2 w-2 rounded-full bg-primary-foreground" />
            </div>
          </motion.div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 z-10 flex gap-3">
          {[
            { label: "Available", color: "bg-primary" },
            { label: "In Use", color: "bg-amber-400" },
            { label: "Charging", color: "bg-emerald-400" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1">
              <div className={`h-2 w-2 rounded-full ${item.color}`} />
              <span className="text-[10px] text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
