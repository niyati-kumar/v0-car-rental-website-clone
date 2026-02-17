"use client"

import { Car, Phone, Mail, MapPin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Car className="h-6 w-6" />
              <span className="text-lg font-bold">CarRental</span>
            </div>
            <p className="text-sm leading-relaxed text-background/60">
              India&apos;s trusted car rental service offering premium vehicles across 15+ cities with transparent pricing.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-sm text-background/60" aria-label="Footer quick links">
              <a href="#home" className="transition-colors hover:text-background">Home</a>
              <a href="#cars" className="transition-colors hover:text-background">Browse Cars</a>
              <a href="#best-sellers" className="transition-colors hover:text-background">Best Sellers</a>
              <a href="#about" className="transition-colors hover:text-background">About Us</a>
            </nav>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Top Brands</h3>
            <nav className="flex flex-col gap-2 text-sm text-background/60" aria-label="Footer top brands">
              <span>Maruti Suzuki</span>
              <span>Hyundai</span>
              <span>Tata Motors</span>
              <span>Mahindra</span>
              <span>Toyota</span>
            </nav>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Contact Us</h3>
            <div className="space-y-2.5 text-sm text-background/60">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                42 MG Road, Gurugram, Haryana 122001
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                info@carrental.in
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                +91 98765 43210
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-background/10 pt-6 text-center text-xs text-background/40">
          2026 CarRental India. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
