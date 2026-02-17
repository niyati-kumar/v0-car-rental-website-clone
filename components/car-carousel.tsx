"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Zap, Gauge, Clock } from "lucide-react"

const cars = [
  {
    id: 1,
    name: "Tesla Model S",
    variant: "Plaid",
    image: "/images/tesla-hero.jpg",
    price: 89,
    range: "396 mi",
    power: "1,020 hp",
    zeroToSixty: "1.99s",
    available: 3,
  },
  {
    id: 2,
    name: "BMW iX",
    variant: "xDrive50",
    image: "/images/bmw-ix.jpg",
    price: 72,
    range: "324 mi",
    power: "516 hp",
    zeroToSixty: "4.4s",
    available: 5,
  },
  {
    id: 3,
    name: "Porsche Taycan",
    variant: "Turbo S",
    image: "/images/porsche-taycan.jpg",
    price: 110,
    range: "280 mi",
    power: "750 hp",
    zeroToSixty: "2.4s",
    available: 2,
  },
]

export function CarCarousel() {
  const [current, setCurrent] = useState(0)
  const car = cars[current]

  const next = () => setCurrent((c) => (c + 1) % cars.length)
  const prev = () => setCurrent((c) => (c - 1 + cars.length) % cars.length)

  return (
    <div className="px-5 py-4">
      {/* Car Name & Price */}
      <div className="mb-3 flex items-end justify-between">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
                {car.name}
              </h1>
              <p className="text-sm font-mono text-primary glow-text">{car.variant}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">from</p>
          <p className="text-xl font-bold text-foreground">
            {"$"}{car.price}
            <span className="text-xs font-normal text-muted-foreground">/hr</span>
          </p>
        </div>
      </div>

      {/* Car Image */}
      <div className="relative mb-4 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
        <AnimatePresence mode="wait">
          <motion.div
            key={car.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[16/10]"
          >
            <Image
              src={car.image}
              alt={`${car.name} ${car.variant}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            className="flex h-8 w-8 items-center justify-center rounded-full glass"
            aria-label="Previous car"
          >
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </motion.button>
          <div className="flex gap-1.5">
            {cars.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-primary glow-sm" : "w-1.5 bg-muted-foreground/30"
                }`}
                layoutId={`dot-${i}`}
              />
            ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={next}
            className="flex h-8 w-8 items-center justify-center rounded-full glass"
            aria-label="Next car"
          >
            <ChevronRight className="h-4 w-4 text-foreground" />
          </motion.button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          className="glass rounded-xl p-3 text-center"
          whileTap={{ scale: 0.97 }}
        >
          <Zap className="mx-auto mb-1 h-4 w-4 text-primary" />
          <p className="text-xs text-muted-foreground">Range</p>
          <p className="text-sm font-bold font-mono text-foreground">{car.range}</p>
        </motion.div>
        <motion.div
          className="glass rounded-xl p-3 text-center"
          whileTap={{ scale: 0.97 }}
        >
          <Gauge className="mx-auto mb-1 h-4 w-4 text-primary" />
          <p className="text-xs text-muted-foreground">Power</p>
          <p className="text-sm font-bold font-mono text-foreground">{car.power}</p>
        </motion.div>
        <motion.div
          className="glass rounded-xl p-3 text-center"
          whileTap={{ scale: 0.97 }}
        >
          <Clock className="mx-auto mb-1 h-4 w-4 text-primary" />
          <p className="text-xs text-muted-foreground">0-60</p>
          <p className="text-sm font-bold font-mono text-foreground">{car.zeroToSixty}</p>
        </motion.div>
      </div>
    </div>
  )
}
