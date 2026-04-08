import { Building2, Home, House, BedDouble } from "lucide-react";

const featureListingData = [
  {
    id: 1,
    tag: "Condo",
    title: "2BR Condo at One Serendra, BGC",
    location: "Bonifacio Global City, Taguig",
    price: "₱55,000",
    status: "available",
    gradientClass: "bg-gradient-to-br from-primary/10 to-primary/30",
    icon: Building2,
  },
  {
    id: 2,
    tag: "Studio",
    title: "Studio Unit at Avida Towers",
    location: "Quezon City, Metro Manila",
    price: "₱18,000",
    status: "available",
    gradientClass: "bg-gradient-to-br from-base-200 to-base-300",
    icon: BedDouble,
  },
  {
    id: 3,
    tag: "House",
    title: "3BR House in Filinvest Homes",
    location: "Muntinlupa City, Metro Manila",
    price: "₱70,000",
    status: "available",
    gradientClass: "bg-gradient-to-br from-warning/10 to-warning/30",
    icon: House,
  },
  {
    id: 4,
    tag: "1 Bedroom",
    title: "1BR Condo at Makati CBD",
    location: "Salcedo Village, Makati City",
    price: "₱30,000",
    status: "coming-soon",
    gradientClass: "bg-gradient-to-br from-error/10 to-error/30",
    icon: Home,
  },
];

export default featureListingData;
