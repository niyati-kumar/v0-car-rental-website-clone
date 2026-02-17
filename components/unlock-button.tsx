"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Fingerprint, Check, Lock } from "lucide-react"

export function UnlockButton() {
  const [state, setState] = useState<"idle" | "scanning" | "unlocked">("idle")

  const handleUnlock = () => {
    if (state !== "idle") return
    setState("scanning")
    setTimeout(() => {
      setState("unlocked")
      setTimeout(() => setState("idle"), 3000)
    }, 2000)
  }

  return (
    <div className="px-5 py-4">
      <motion.button
        onClick={handleUnlock}
        className={`relative w-full overflow-hidden rounded-2xl py-5 transition-colors duration-500 ${
          state === "unlocked"
            ? "bg-emerald-500/20 border border-emerald-500/30"
            : state === "scanning"
              ? "bg-primary/10 border border-primary/30"
              : "bg-primary/10 border border-primary/20 hover:bg-primary/20"
        }`}
        whileTap={state === "idle" ? { scale: 0.98 } : {}}
        aria-label={
          state === "idle"
            ? "Tap to unlock car with biometric verification"
            : state === "scanning"
              ? "Scanning fingerprint"
              : "Car unlocked"
        }
      >
        {/* Scanning ring animation */}
        {state === "scanning" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-16 w-16 rounded-full border-2 border-primary/50"
              animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        )}

        {/* Glow effect on unlock */}
        {state === "unlocked" && (
          <motion.div
            className="absolute inset-0 bg-emerald-400/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        <div className="relative flex flex-col items-center gap-3">
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.div
                key="idle"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20"
              >
                <Fingerprint className="h-7 w-7 text-primary" />
              </motion.div>
            )}
            {state === "scanning" && (
              <motion.div
                key="scanning"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  scale: { duration: 1, repeat: Infinity },
                }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/30"
              >
                <Fingerprint className="h-7 w-7 text-primary" />
              </motion.div>
            )}
            {state === "unlocked" && (
              <motion.div
                key="unlocked"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/30"
              >
                <Check className="h-7 w-7 text-emerald-400" />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={state}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-center"
            >
              {state === "idle" && (
                <>
                  <p className="text-sm font-semibold text-foreground">Unlock Car</p>
                  <p className="text-xs text-muted-foreground">Tap for biometric verification</p>
                </>
              )}
              {state === "scanning" && (
                <>
                  <p className="text-sm font-semibold text-primary glow-text">Scanning...</p>
                  <p className="text-xs text-muted-foreground">Hold still for verification</p>
                </>
              )}
              {state === "unlocked" && (
                <>
                  <p className="text-sm font-semibold text-emerald-400">Car Unlocked</p>
                  <p className="text-xs text-muted-foreground">Tesla Model S Plaid is ready</p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  )
}
