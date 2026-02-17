"use client"

import { useState, useMemo } from "react"
import { CalendarDays, MapPin, Shield, Navigation, Baby, UserCheck, ChevronRight, ChevronLeft, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  formatINR,
  generateRefId,
  GST_RATE,
  EXTRA_PRICES,
  CITIES,
  type CarItem,
  type BookingExtras,
  type Booking,
} from "@/lib/car-data"

interface BookingModalProps {
  car: CarItem | null
  open: boolean
  onClose: () => void
  onConfirm: (booking: Booking) => void
}

const STEPS = ["Dates & City", "Add Extras", "Driver Details", "Summary"]

export function BookingModal({ car, open, onClose, onConfirm }: BookingModalProps) {
  const [step, setStep] = useState(0)

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [city, setCity] = useState("")

  const [extras, setExtras] = useState<BookingExtras>({
    gps: false,
    insurance: false,
    childSeat: false,
    driver: false,
  })

  const [driverName, setDriverName] = useState("")
  const [driverPhone, setDriverPhone] = useState("")
  const [driverEmail, setDriverEmail] = useState("")
  const [driverLicense, setDriverLicense] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [confirmed, setConfirmed] = useState(false)
  const [refId, setRefId] = useState("")

  const dayCount = useMemo(() => {
    if (!startDate || !endDate) return 1
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 1
  }, [startDate, endDate])

  const extrasTotal = useMemo(() => {
    let total = 0
    if (extras.gps) total += EXTRA_PRICES.gps * dayCount
    if (extras.insurance) total += EXTRA_PRICES.insurance * dayCount
    if (extras.childSeat) total += EXTRA_PRICES.childSeat * dayCount
    if (extras.driver) total += EXTRA_PRICES.driver * dayCount
    return total
  }, [extras, dayCount])

  const subtotal = car ? car.pricePerDay * dayCount + extrasTotal : 0
  const gst = Math.round(subtotal * GST_RATE)
  const total = subtotal + gst

  const resetModal = () => {
    setStep(0)
    setStartDate("")
    setEndDate("")
    setCity("")
    setExtras({ gps: false, insurance: false, childSeat: false, driver: false })
    setDriverName("")
    setDriverPhone("")
    setDriverEmail("")
    setDriverLicense("")
    setErrors({})
    setConfirmed(false)
    setRefId("")
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  const validateStep1 = () => {
    const errs: Record<string, string> = {}
    if (!startDate) errs.startDate = "Start date is required"
    if (!endDate) errs.endDate = "End date is required"
    if (!city) errs.city = "City is required"
    if (startDate && endDate && new Date(endDate) <= new Date(startDate))
      errs.endDate = "End date must be after start date"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep3 = () => {
    const errs: Record<string, string> = {}
    if (!driverName.trim()) errs.driverName = "Name is required"
    if (!driverPhone.trim()) errs.driverPhone = "Phone is required"
    else if (!/^[6-9]\d{9}$/.test(driverPhone.trim())) errs.driverPhone = "Enter valid 10-digit Indian number"
    if (!driverEmail.trim()) errs.driverEmail = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(driverEmail.trim())) errs.driverEmail = "Enter valid email"
    if (!driverLicense.trim()) errs.driverLicense = "License number is required"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const goNext = () => {
    if (step === 0 && !validateStep1()) return
    if (step === 2 && !validateStep3()) return
    if (step === 3) {
      const ref = generateRefId()
      setRefId(ref)
      const booking: Booking = {
        id: Date.now().toString(),
        refId: ref,
        car: car!,
        startDate,
        endDate,
        city,
        extras,
        driverName,
        driverPhone,
        driverEmail,
        driverLicense,
        subtotal,
        gst,
        total,
        createdAt: new Date().toISOString(),
      }
      onConfirm(booking)
      setConfirmed(true)
      return
    }
    setErrors({})
    setStep((s) => s + 1)
  }

  if (!car) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {confirmed ? "Booking Confirmed!" : `Book ${car.brand} ${car.name}`}
          </DialogTitle>
        </DialogHeader>

        {!confirmed && (
          <div className="mb-4 flex items-center gap-1" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={4}>
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                    i <= step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className="hidden text-[10px] text-muted-foreground sm:block">{label}</span>
              </div>
            ))}
          </div>
        )}

        {confirmed ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">Thank you for your booking!</p>
              <p className="mt-1 text-sm text-muted-foreground">Your reference ID is</p>
              <p className="mt-1 font-mono text-xl font-bold text-primary">{refId}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              {car.brand} {car.name} in {city}
            </p>
            <p className="text-sm text-muted-foreground">
              {startDate} to {endDate} ({dayCount} {dayCount === 1 ? "day" : "days"})
            </p>
            <p className="text-lg font-bold text-foreground">Total: {formatINR(total)}</p>
            <Button onClick={handleClose} className="mt-2">Done</Button>
          </div>
        ) : (
          <>
            {step === 0 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.startDate && <p className="text-xs text-destructive">{errors.startDate}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split("T")[0]}
                  />
                  {errors.endDate && <p className="text-xs text-destructive">{errors.endDate}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>City</Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pickup city" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Add optional extras (per day pricing)</p>
                {([
                  { key: "gps" as const, label: "GPS Navigation", price: EXTRA_PRICES.gps, icon: Navigation },
                  { key: "insurance" as const, label: "Premium Insurance", price: EXTRA_PRICES.insurance, icon: Shield },
                  { key: "childSeat" as const, label: "Child Seat", price: EXTRA_PRICES.childSeat, icon: Baby },
                  { key: "driver" as const, label: "Personal Driver", price: EXTRA_PRICES.driver, icon: UserCheck },
                ]).map((item) => (
                  <label
                    key={item.key}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted"
                  >
                    <Checkbox
                      checked={extras[item.key]}
                      onCheckedChange={(checked) =>
                        setExtras((prev) => ({ ...prev, [item.key]: !!checked }))
                      }
                    />
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                    <span className="text-sm text-muted-foreground">{formatINR(item.price)}/day</span>
                  </label>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="driverName">Full Name</Label>
                  <Input id="driverName" value={driverName} onChange={(e) => setDriverName(e.target.value)} placeholder="Enter your full name" />
                  {errors.driverName && <p className="text-xs text-destructive">{errors.driverName}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="driverPhone">Phone Number</Label>
                  <Input id="driverPhone" value={driverPhone} onChange={(e) => setDriverPhone(e.target.value)} placeholder="10-digit mobile number" />
                  {errors.driverPhone && <p className="text-xs text-destructive">{errors.driverPhone}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="driverEmail">Email Address</Label>
                  <Input id="driverEmail" type="email" value={driverEmail} onChange={(e) => setDriverEmail(e.target.value)} placeholder="you@example.com" />
                  {errors.driverEmail && <p className="text-xs text-destructive">{errors.driverEmail}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="driverLicense">Driving License Number</Label>
                  <Input id="driverLicense" value={driverLicense} onChange={(e) => setDriverLicense(e.target.value)} placeholder="DL-0420110012345" />
                  {errors.driverLicense && <p className="text-xs text-destructive">{errors.driverLicense}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3 text-sm">
                <div className="rounded-lg bg-muted p-3">
                  <p className="font-semibold text-foreground">{car.brand} {car.name}</p>
                  <p className="text-muted-foreground">{formatINR(car.pricePerDay)}/day x {dayCount} {dayCount === 1 ? "day" : "days"}</p>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pickup City</span>
                  <span className="font-medium">{city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dates</span>
                  <span className="font-medium">{startDate} to {endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Driver</span>
                  <span className="font-medium">{driverName}</span>
                </div>

                {(extras.gps || extras.insurance || extras.childSeat || extras.driver) && (
                  <>
                    <Separator />
                    <p className="font-semibold">Extras</p>
                    {extras.gps && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">GPS Navigation</span>
                        <span>{formatINR(EXTRA_PRICES.gps * dayCount)}</span>
                      </div>
                    )}
                    {extras.insurance && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Premium Insurance</span>
                        <span>{formatINR(EXTRA_PRICES.insurance * dayCount)}</span>
                      </div>
                    )}
                    {extras.childSeat && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Child Seat</span>
                        <span>{formatINR(EXTRA_PRICES.childSeat * dayCount)}</span>
                      </div>
                    )}
                    {extras.driver && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Personal Driver</span>
                        <span>{formatINR(EXTRA_PRICES.driver * dayCount)}</span>
                      </div>
                    )}
                  </>
                )}

                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="font-medium">{formatINR(gst)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatINR(total)}</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setErrors({}); setStep((s) => s - 1) }}
                disabled={step === 0}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <Button size="sm" onClick={goNext} className="gap-1">
                {step === 3 ? "Confirm Booking" : "Next"}
                {step < 3 && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
