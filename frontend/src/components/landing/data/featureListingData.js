import condo1 from "../../../assets/condo1.jpg";
import condo2 from "../../../assets/condo2.jpg";
import house1 from "../../../assets/house1.jpg";
import studio1 from "../../../assets/studio1.jpg";

const featureListingData = [
  {
    id: 1,
    tag: "Condo",
    title: "2BR Condo at One Serendra, BGC",
    location: "Bonifacio Global City, Taguig",
    price: "₱55,000",
    status: "available",
    image: condo1,
  },
  {
    id: 2,
    tag: "Studio",
    title: "Studio Unit at Avida Towers",
    location: "Quezon City, Metro Manila",
    price: "₱18,000",
    status: "available",
    image: studio1,
  },
  {
    id: 3,
    tag: "House",
    title: "3BR House in Filinvest Homes",
    location: "Muntinlupa City, Metro Manila",
    price: "₱70,000",
    status: "available",
    image: house1,
  },
  {
    id: 4,
    tag: "Condo",
    title: "1BR Condo at Makati CBD",
    location: "Salcedo Village, Makati City",
    price: "₱30,000",
    status: "coming-soon",
    image: condo2,
  },
];

export default featureListingData;
