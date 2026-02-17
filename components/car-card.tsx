"use client"

import Image from "next/image"
import { Star, Fuel, Users, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatINR, type CarItem } from "@/lib/car-data"

interface CarCardProps {
  car: CarItem
  onBook: (car: CarItem) => void
}

export function CarCard({ car, onBook }: CarCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border bg-background shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {car.popular && (
          <Badge className="absolute left-3 top-3 text-[10px]">Popular</Badge>
        )}
      </div>
      <div className="p-4">
        <div className="mb-1 flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-foreground">{car.brand} {car.name}</h3>
            <p className="text-xs text-muted-foreground">{car.type}</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="font-medium">{car.rating}</span>
          </div>
        </div>

        <div className="my-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {car.seats} Seats
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" />
            {car.fuel}
          </span>
          <span className="flex items-center gap-1">
            <Settings2 className="h-3.5 w-3.5" />
            {car.transmission}
          </span>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <div>
            <span className="text-lg font-bold text-foreground">{formatINR(car.pricePerDay)}</span>
            <span className="text-xs text-muted-foreground">/day</span>
          </div>
          <Button size="sm" onClick={() => onBook(car)}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  )
}
