"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { SlidersHorizontal, ArrowUpDown, Shield, Headphones, IndianRupee, Clock } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { FilterSidebar } from "@/components/filter-sidebar"
import { CarCard } from "@/components/car-card"
import { BookingModal } from "@/components/booking-modal"
import { BookingsDrawer } from "@/components/bookings-drawer"
import { SiteFooter } from "@/components/site-footer"
import {
  CAR_INVENTORY,
  formatINR,
  type CarItem,
  type CarType,
  type FuelType,
  type TransmissionType,
  type Booking,
} from "@/lib/car-data"

type SortKey = "popular" | "price-asc" | "price-desc" | "rating"

interface Filters {
  types: CarType[]
  fuels: FuelType[]
  transmissions: TransmissionType[]
  priceRange: [number, number]
}

const DEFAULT_FILTERS: Filters = {
  types: [],
  fuels: [],
  transmissions: [],
  priceRange: [500, 15000],
}

export default function Component() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SortKey>("popular")
  const [searchBrand, setSearchBrand] = useState("")
  const [searchModel, setSearchModel] = useState("")
  const [bookingCar, setBookingCar] = useState<CarItem | null>(null)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem("car-rental-bookings")
      if (stored) setBookings(JSON.parse(stored))
    } catch {}
  }, [])

  const persistBookings = useCallback((next: Booking[]) => {
    setBookings(next)
    localStorage.setItem("car-rental-bookings", JSON.stringify(next))
  }, [])

  const filteredCars = useMemo(() => {
    let list = [...CAR_INVENTORY]

    if (searchBrand) list = list.filter((c) => c.brand === searchBrand)
    if (searchModel) list = list.filter((c) => c.name === searchModel)

    if (filters.types.length) list = list.filter((c) => filters.types.includes(c.type))
    if (filters.fuels.length) list = list.filter((c) => filters.fuels.includes(c.fuel))
    if (filters.transmissions.length) list = list.filter((c) => filters.transmissions.includes(c.transmission))
    list = list.filter((c) => c.pricePerDay >= filters.priceRange[0] && c.pricePerDay <= filters.priceRange[1])

    switch (sort) {
      case "popular":
        list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.rating - a.rating)
        break
      case "price-asc":
        list.sort((a, b) => a.pricePerDay - b.pricePerDay)
        break
      case "price-desc":
        list.sort((a, b) => b.pricePerDay - a.pricePerDay)
        break
      case "rating":
        list.sort((a, b) => b.rating - a.rating)
        break
    }
    return list
  }, [filters, sort, searchBrand, searchModel])

  const handleSearch = (brand: string, model: string) => {
    setSearchBrand(brand)
    setSearchModel(model)
  }

  const handleBook = (car: CarItem) => {
    setBookingCar(car)
    setBookingOpen(true)
  }

  const handleConfirm = (booking: Booking) => {
    const next = [booking, ...bookings]
    persistBookings(next)
    toast.success("Booking confirmed!", {
      description: `Ref: ${booking.refId} - ${booking.car.brand} ${booking.car.name}`,
    })
  }

  const handleCancelBooking = (id: string) => {
    const next = bookings.filter((b) => b.id !== id)
    persistBookings(next)
    toast.error("Booking cancelled")
  }

  const bestSellers = CAR_INVENTORY.filter((c) => c.popular).slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader bookingCount={bookings.length} onMyBookings={() => setDrawerOpen(true)} />

      <HeroSection onSearch={handleSearch} />

      {/* About / Trust badges */}
      <section id="about" className="border-b bg-muted/50 py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            { icon: Shield, title: "Trusted Across India", desc: "Verified vehicles with full documentation" },
            { icon: IndianRupee, title: "Transparent INR Pricing", desc: "No hidden charges, GST included in final bill" },
            { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock assistance in Hindi & English" },
            { icon: Clock, title: "Easy Booking", desc: "Book in under 2 minutes with instant confirmation" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 rounded-xl bg-background p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Car Listings */}
      <section id="cars" className="py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground text-balance">
                {searchBrand ? `${searchBrand}${searchModel ? ` ${searchModel}` : ""} Cars` : "Browse All Cars"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {filteredCars.length} {filteredCars.length === 1 ? "car" : "cars"} available
                {searchBrand && (
                  <button
                    onClick={() => { setSearchBrand(""); setSearchModel("") }}
                    className="ml-2 text-primary hover:underline"
                  >
                    Clear search
                  </button>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile filter toggle */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto p-4">
                  <FilterSidebar filters={filters} onChange={setFilters} />
                </SheetContent>
              </Sheet>

              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="w-[180px] gap-2">
                  <ArrowUpDown className="h-3.5 w-3.5" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Best Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <div className="hidden w-64 shrink-0 lg:block">
              <FilterSidebar filters={filters} onChange={setFilters} />
            </div>

            {/* Grid */}
            <div className="flex-1">
              {filteredCars.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border bg-muted/30 py-20 text-center">
                  <p className="text-sm font-medium text-foreground">No cars match your filters</p>
                  <p className="mt-1 text-xs text-muted-foreground">Try adjusting your filters or search criteria</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => { setFilters(DEFAULT_FILTERS); setSearchBrand(""); setSearchModel("") }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} car={car} onBook={handleBook} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section id="best-sellers" className="border-t bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-2 text-2xl font-bold text-foreground text-balance">Best Sellers</h2>
          <p className="mb-8 text-sm text-muted-foreground">Most booked cars by our customers across India</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bestSellers.map((car) => (
              <CarCard key={car.id} car={car} onBook={handleBook} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      <BookingModal
        car={bookingCar}
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        onConfirm={handleConfirm}
      />

      <BookingsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        bookings={bookings}
        onCancel={handleCancelBooking}
      />
    </div>
  )
}
