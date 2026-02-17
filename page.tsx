"use client"

import { motion } from "framer-motion"
import { StatusBar } from "@/components/status-bar"
import { NavHeader } from "@/components/nav-header"
import { CarCarousel } from "@/components/car-carousel"
import { MapSection } from "@/components/map-section"
import { UnlockButton } from "@/components/unlock-button"
import { QuickActions } from "@/components/quick-actions"
import { BottomNav } from "@/components/bottom-nav"

export default function Component() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        className="relative w-full max-w-[390px] overflow-hidden rounded-[2.5rem] border border-border bg-background shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          boxShadow:
            "0 0 0 1px hsl(215 20% 14%), 0 0 80px -20px hsl(199 89% 48% / 0.15), 0 25px 50px -12px rgb(0 0 0 / 0.5)",
        }}
      >
        <div className="absolute left-1/2 top-0 z-50 flex -translate-x-1/2 items-center gap-2">
          <div className="h-7 w-32 rounded-b-2xl bg-background" />
        </div>

        <div className="relative h-[844px] overflow-y-auto scrollbar-hide">
          <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl">
            <StatusBar />
            <NavHeader />
          </div>

          <main>
            <CarCarousel />
            <QuickActions />
            <UnlockButton />
            <MapSection />

            <div className="px-5 py-4">
              <div className="glass rounded-2xl p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">Active Booking</h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-mono font-medium text-primary">
                    IN PROGRESS
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="text-primary"
                        aria-hidden="true"
                      >
                        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                        <circle cx="10" cy="10" r="3" fill="currentColor" />
                      </svg>
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Tesla Model S Plaid</p>
                    <p className="text-xs text-muted-foreground">{"Downtown SF \u2192 Golden Gate Park"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold font-mono text-foreground">2h 15m</p>
                    <p className="text-xs text-muted-foreground">remaining</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="h-1 w-full rounded-full bg-muted">
                    <motion.div
                      className="h-1 rounded-full bg-primary glow-sm"
                      initial={{ width: "0%" }}
                      animate={{ width: "65%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
                    <span>4:30 PM</span>
                    <span>6:45 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-20" />
          </main>

          <div className="sticky bottom-0 z-40">
            <BottomNav />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
