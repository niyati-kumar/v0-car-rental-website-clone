export type CarType = "Sedan" | "SUV" | "Hatchback" | "MUV" | "Coupe" | "Convertible"
export type FuelType = "Petrol" | "Diesel" | "Electric" | "Hybrid" | "CNG"
export type TransmissionType = "Manual" | "Automatic"

export interface CarItem {
  id: string
  name: string
  brand: string
  type: CarType
  fuel: FuelType
  transmission: TransmissionType
  seats: number
  pricePerDay: number
  rating: number
  image: string
  popular: boolean
}

export interface BookingExtras {
  gps: boolean
  insurance: boolean
  childSeat: boolean
  driver: boolean
}

export interface Booking {
  id: string
  refId: string
  car: CarItem
  startDate: string
  endDate: string
  city: string
  extras: BookingExtras
  driverName: string
  driverPhone: string
  driverEmail: string
  driverLicense: string
  subtotal: number
  gst: number
  total: number
  createdAt: string
}

export const BRAND_MODELS: Record<string, string[]> = {
  "Maruti Suzuki": ["Swift", "Baleno", "Brezza", "Ertiga", "Dzire", "Alto K10", "WagonR", "XL6", "Ciaz", "Ignis"],
  "Hyundai": ["Creta", "Venue", "i20", "Verna", "Tucson", "Alcazar", "Aura", "Grand i10 Nios", "Exter"],
  "Tata": ["Nexon", "Punch", "Harrier", "Safari", "Tiago", "Altroz", "Tigor EV", "Nexon EV", "Curvv"],
  "Mahindra": ["Thar", "XUV700", "Scorpio N", "XUV400", "Bolero", "XUV300", "BE 6"],
  "Honda": ["City", "Amaze", "Elevate", "WR-V"],
  "Toyota": ["Fortuner", "Innova Crysta", "Hyryder", "Glanza", "Innova HyCross", "Hilux"],
  "Kia": ["Seltos", "Sonet", "Carens", "EV6", "Carnival"],
  "MG": ["Hector", "Astor", "ZS EV", "Gloster", "Comet EV"],
  "Skoda": ["Slavia", "Kushaq", "Kodiaq", "Superb"],
  "Volkswagen": ["Taigun", "Virtus", "Tiguan"],
}

export const ALL_BRANDS = Object.keys(BRAND_MODELS)

export const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
  "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
  "Chandigarh", "Goa", "Kochi", "Gurgaon", "Noida",
]

export const EXTRA_PRICES: Record<keyof BookingExtras, number> = {
  gps: 150,
  insurance: 300,
  childSeat: 200,
  driver: 800,
}

export const GST_RATE = 0.18

export const CAR_INVENTORY: CarItem[] = [
  { id: "1", name: "Swift", brand: "Maruti Suzuki", type: "Hatchback", fuel: "Petrol", transmission: "Manual", seats: 5, pricePerDay: 1200, rating: 4.5, image: "/images/cars/swift.jpg", popular: true },
  { id: "2", name: "Creta", brand: "Hyundai", type: "SUV", fuel: "Petrol", transmission: "Automatic", seats: 5, pricePerDay: 2800, rating: 4.7, image: "/images/cars/creta.jpg", popular: true },
  { id: "3", name: "Nexon", brand: "Tata", type: "SUV", fuel: "Petrol", transmission: "Manual", seats: 5, pricePerDay: 2000, rating: 4.6, image: "/images/cars/nexon.jpg", popular: true },
  { id: "4", name: "Innova Crysta", brand: "Toyota", type: "MUV", fuel: "Diesel", transmission: "Automatic", seats: 7, pricePerDay: 3500, rating: 4.8, image: "/images/cars/innova.jpg", popular: true },
  { id: "5", name: "Thar", brand: "Mahindra", type: "SUV", fuel: "Diesel", transmission: "Manual", seats: 4, pricePerDay: 3200, rating: 4.7, image: "/images/cars/thar.jpg", popular: true },
  { id: "6", name: "City", brand: "Honda", type: "Sedan", fuel: "Petrol", transmission: "Automatic", seats: 5, pricePerDay: 2500, rating: 4.5, image: "/images/cars/city.jpg", popular: true },
  { id: "7", name: "Seltos", brand: "Kia", type: "SUV", fuel: "Petrol", transmission: "Automatic", seats: 5, pricePerDay: 2600, rating: 4.6, image: "/images/cars/seltos.jpg", popular: true },
  { id: "8", name: "Baleno", brand: "Maruti Suzuki", type: "Hatchback", fuel: "Petrol", transmission: "Manual", seats: 5, pricePerDay: 1400, rating: 4.4, image: "/images/cars/baleno.jpg", popular: false },
  { id: "9", name: "Fortuner", brand: "Toyota", type: "SUV", fuel: "Diesel", transmission: "Automatic", seats: 7, pricePerDay: 5500, rating: 4.9, image: "/images/cars/fortuner.jpg", popular: true },
  { id: "10", name: "XUV700", brand: "Mahindra", type: "SUV", fuel: "Diesel", transmission: "Automatic", seats: 7, pricePerDay: 3800, rating: 4.7, image: "/images/cars/xuv700.jpg", popular: true },
  { id: "11", name: "Venue", brand: "Hyundai", type: "SUV", fuel: "Petrol", transmission: "Manual", seats: 5, pricePerDay: 2000, rating: 4.3, image: "/images/cars/venue.jpg", popular: false },
  { id: "12", name: "Scorpio N", brand: "Mahindra", type: "SUV", fuel: "Diesel", transmission: "Automatic", seats: 7, pricePerDay: 3400, rating: 4.6, image: "/images/cars/scorpio.jpg", popular: true },
  { id: "13", name: "i20", brand: "Hyundai", type: "Hatchback", fuel: "Petrol", transmission: "Automatic", seats: 5, pricePerDay: 1800, rating: 4.4, image: "/images/cars/i20.jpg", popular: false },
  { id: "14", name: "Harrier", brand: "Tata", type: "SUV", fuel: "Diesel", transmission: "Automatic", seats: 5, pricePerDay: 3000, rating: 4.5, image: "/images/cars/harrier.jpg", popular: false },
  { id: "15", name: "Nexon EV", brand: "Tata", type: "SUV", fuel: "Electric", transmission: "Automatic", seats: 5, pricePerDay: 2800, rating: 4.6, image: "/images/cars/nexon-ev.jpg", popular: true },
  { id: "16", name: "Hector", brand: "MG", type: "SUV", fuel: "Petrol", transmission: "Automatic", seats: 5, pricePerDay: 2800, rating: 4.4, image: "/images/cars/hector.jpg", popular: false },
  { id: "17", name: "Dzire", brand: "Maruti Suzuki", type: "Sedan", fuel: "Petrol", transmission: "Automatic", seats: 5, pricePerDay: 1500, rating: 4.3, image: "/images/cars/dzire.jpg", popular: false },
  { id: "18", name: "Punch", brand: "Tata", type: "SUV", fuel: "Petrol", transmission: "Manual", seats: 5, pricePerDay: 1600, rating: 4.5, image: "/images/cars/punch.jpg", popular: true },
  { id: "19", name: "Sonet", brand: "Kia", type: "SUV", fuel: "Diesel", transmission: "Automatic", seats: 5, pricePerDay: 2200, rating: 4.5, image: "/images/cars/sonet.jpg", popular: false },
  { id: "20", name: "EV6", brand: "Kia", type: "SUV", fuel: "Electric", transmission: "Automatic", seats: 5, pricePerDay: 5000, rating: 4.8, image: "/images/cars/ev6.jpg", popular: false },
  { id: "21", name: "Ertiga", brand: "Maruti Suzuki", type: "MUV", fuel: "CNG", transmission: "Manual", seats: 7, pricePerDay: 2000, rating: 4.4, image: "/images/cars/ertiga.jpg", popular: false },
  { id: "22", name: "Verna", brand: "Hyundai", type: "Sedan", fuel: "Petrol", transmission: "Automatic", seats: 5, pricePerDay: 2400, rating: 4.5, image: "/images/cars/verna.jpg", popular: false },
  { id: "23", name: "Safari", brand: "Tata", type: "SUV", fuel: "Diesel", transmission: "Automatic", seats: 7, pricePerDay: 3200, rating: 4.5, image: "/images/cars/safari.jpg", popular: false },
  { id: "24", name: "Glanza", brand: "Toyota", type: "Hatchback", fuel: "Petrol", transmission: "Manual", seats: 5, pricePerDay: 1300, rating: 4.2, image: "/images/cars/glanza.jpg", popular: false },
]

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function generateRefId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = "CR-"
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
