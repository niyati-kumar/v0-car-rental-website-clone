"use client"

import { CalendarDays, MapPin, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatINR, type Booking } from "@/lib/car-data"

interface BookingsDrawerProps {
  open: boolean
  onClose: () => void
  bookings: Booking[]
  onCancel: (id: string) => void
}

export function BookingsDrawer({ open, onClose, bookings, onCancel }: BookingsDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            My Bookings
            {bookings.length > 0 && (
              <Badge variant="secondary" className="text-xs">{bookings.length}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <CalendarDays className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm font-medium text-foreground">No bookings yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Your confirmed bookings will appear here
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground">
                      {booking.car.brand} {booking.car.name}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-primary">{booking.refId}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => onCancel(booking.id)}
                    aria-label="Cancel booking"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <Separator className="my-3" />

                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{booking.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>{booking.startDate} to {booking.endDate}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Total (incl. GST)</span>
                  <span className="font-semibold text-foreground">{formatINR(booking.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
