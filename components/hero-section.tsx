"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ALL_BRANDS, BRAND_MODELS } from "@/lib/car-data"

interface HeroSectionProps {
  onSearch: (brand: string, model: string, condition: string) => void
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [condition, setCondition] = useState("")
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")

  const models = useMemo(() => {
    if (!brand) return []
    return BRAND_MODELS[brand] || []
  }, [brand])

  const handleBrandChange = (val: string) => {
    setBrand(val)
    setModel("")
  }

  const handleSearch = () => {
    onSearch(brand, model, condition)
    const el = document.getElementById("cars")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const handleExplore = () => {
    const el = document.getElementById("cars")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="relative flex min-h-[600px] items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-showroom.jpg"
        alt="Luxury car showroom"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-foreground/60" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl text-balance">
          Find Your Dream Car
        </h1>
        <p className="mb-10 max-w-xl text-lg text-white/80 text-pretty leading-relaxed">
          Discover the perfect vehicle for your lifestyle from top Indian and international brands
        </p>

        <div className="w-full max-w-3xl rounded-2xl bg-background p-4 shadow-xl md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Condition</label>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger className="h-11 bg-foreground text-background">
                  <SelectValue placeholder="New / Used" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New Cars</SelectItem>
                  <SelectItem value="used">Used Cars</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Brand</label>
              <Select value={brand} onValueChange={handleBrandChange}>
                <SelectTrigger className="h-11 bg-foreground text-background">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_BRANDS.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Model</label>
              <Select value={model} onValueChange={setModel} disabled={!brand}>
                <SelectTrigger className="h-11 bg-foreground text-background">
                  <SelectValue placeholder={brand ? "Select Model" : "Pick a brand first"} />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button size="lg" className="h-11 gap-2 md:px-8" onClick={handleSearch}>
              <Search className="h-4 w-4" />
              Search Cars
            </Button>
          </div>
        </div>

        <Button
          variant="outline"
          className="mt-8 gap-2 border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
          onClick={handleExplore}
        >
          Explore Our Collection
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
