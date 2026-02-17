"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { formatINR } from "@/lib/car-data"
import type { CarType, FuelType, TransmissionType } from "@/lib/car-data"

interface Filters {
  types: CarType[]
  fuels: FuelType[]
  transmissions: TransmissionType[]
  priceRange: [number, number]
}

interface FilterSidebarProps {
  filters: Filters
  onChange: (filters: Filters) => void
}

const CAR_TYPES: CarType[] = ["Sedan", "SUV", "Hatchback", "MUV", "Coupe", "Convertible"]
const FUEL_TYPES: FuelType[] = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"]
const TRANSMISSION_TYPES: TransmissionType[] = ["Manual", "Automatic"]

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const toggleArray = <T extends string>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]

  return (
    <aside className="space-y-6 rounded-xl border bg-background p-5" aria-label="Filters">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Car Type</h3>
        <div className="space-y-2.5">
          {CAR_TYPES.map((type) => (
            <label key={type} className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={filters.types.includes(type)}
                onCheckedChange={() =>
                  onChange({ ...filters, types: toggleArray(filters.types, type) })
                }
              />
              <span className="text-sm text-foreground/80">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t pt-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Price Range{" "}
          <span className="font-normal text-muted-foreground">
            ({formatINR(filters.priceRange[0])} - {formatINR(filters.priceRange[1])}/day)
          </span>
        </h3>
        <Slider
          min={500}
          max={15000}
          step={100}
          value={filters.priceRange}
          onValueChange={(val) =>
            onChange({ ...filters, priceRange: val as [number, number] })
          }
          className="my-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatINR(500)}</span>
          <span>{formatINR(15000)}</span>
        </div>
      </div>

      <div className="border-t pt-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Fuel Type</h3>
        <div className="space-y-2.5">
          {FUEL_TYPES.map((fuel) => (
            <label key={fuel} className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={filters.fuels.includes(fuel)}
                onCheckedChange={() =>
                  onChange({ ...filters, fuels: toggleArray(filters.fuels, fuel) })
                }
              />
              <span className="text-sm text-foreground/80">{fuel}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t pt-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Transmission</h3>
        <div className="space-y-2.5">
          {TRANSMISSION_TYPES.map((trans) => (
            <label key={trans} className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={filters.transmissions.includes(trans)}
                onCheckedChange={() =>
                  onChange({
                    ...filters,
                    transmissions: toggleArray(filters.transmissions, trans),
                  })
                }
              />
              <span className="text-sm text-foreground/80">{trans}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
