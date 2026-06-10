export const COLORS = {
  navy: "#0a1628",
  navyLight: "#112240",
  teal: "#00c9b1",
  tealDark: "#00a896",
  cream: "#f5f0e8",
  amber: "#f4a261",
  white: "#ffffff",
  gray: "#8892a4",
  grayLight: "#e8edf5",
  red: "#e63946",
  green: "#06d6a0",
};

export const SERVICES = [
  { id: "wash-fold", name: "Wash & Fold", icon: "??", desc: "Clean and neatly folded clothes, ready for pickup", price: 1200, unit: "/kg", color: "#00c9b1" },
  { id: "dry-clean", name: "Dry Clean", icon: "?", desc: "Professional dry cleaning for delicate fabrics", price: 2500, unit: "/item", color: "#f4a261" },
  { id: "iron-press", name: "Iron & Press", icon: "??", desc: "Crisp, wrinkle-free garments professionally pressed", price: 600, unit: "/item", color: "#a78bfa" },
  { id: "express", name: "Express 4hr", icon: "?", desc: "Urgent cleaning done in 4 hours, door-to-door", price: 3500, unit: "/load", color: "#f43f5e" },
  { id: "bedding", name: "Bedding & Linen", icon: "???", desc: "Duvet, sheets, pillowcases, curtains and more", price: 1800, unit: "/set", color: "#34d399" },
  { id: "stain", name: "Stain Treatment", icon: "??", desc: "Expert stain removal on any fabric type", price: 1500, unit: "/item", color: "#fbbf24" },
];

export const PRODUCTS = [
  { id: "p1", name: "Casual T-Shirts", icon: "??", category: "Tops", basePrice: 400 },
  { id: "p2", name: "Dress Shirts", icon: "??", category: "Tops", basePrice: 700 },
  { id: "p3", name: "Trousers/Pants", icon: "??", category: "Bottoms", basePrice: 600 },
  { id: "p4", name: "Suits / Blazers", icon: "??", category: "Formal", basePrice: 2200 },
  { id: "p5", name: "Dresses", icon: "??", category: "Dresses", basePrice: 1200 },
  { id: "p6", name: "Jeans", icon: "??", category: "Bottoms", basePrice: 800 },
  { id: "p7", name: "Bedsheets", icon: "???", category: "Linen", basePrice: 1400 },
  { id: "p8", name: "Towels", icon: "??", category: "Linen", basePrice: 500 },
  { id: "p9", name: "Jackets / Coats", icon: "??", category: "Outerwear", basePrice: 2800 },
  { id: "p10", name: "Gym Wear", icon: "??", category: "Activewear", basePrice: 550 },
  { id: "p11", name: "Children's Wear", icon: "??", category: "Kids", basePrice: 350 },
  { id: "p12", name: "Traditional Wear", icon: "??", category: "Ethnic", basePrice: 1600 },
];

export const EMPLOYEES = [
  {
    id: "e_admin",
    name: "Admin Manager",
    email: "olumayowajones@gmail.com",
    password: "oluwaseun44@",
    role: "admin",
    employeeId: "ADM001",
    staffNumber: "CW-1001",
    department: "Operations",
    jobRole: "General Manager",
    salary: 450000,
    phone: "08087654321",
    address: "Head Office, Lagos",
  },
  {
    id: "e_staff1",
    name: "Chioma Okafor",
    email: "chioma@cleanwaves.ng",
    password: "staff123",
    role: "staff",
    employeeId: "STF002",
    staffNumber: "CW-2002",
    department: "Customer Service",
    jobRole: "Service Coordinator",
    salary: 150000,
    phone: "08023456789",
    address: "ojoo, Ibadan",
  },
  {
    id: "e_staff2",
    name: "Sam Ade",
    email: "sam@cleanwaves.ng",
    password: "staff456",
    role: "staff",
    employeeId: "STF003",
    staffNumber: "CW-2003",
    department: "Logistics",
    jobRole: "Pickup Driver",
    salary: 100000,
    phone: "08034567890",
    address: "Elewuro Akobo, Ibadan",
  },
];

export const ADMIN_HEAD_CONTACT = {
  name: "Admin Manager",
  phone: "+2348103034205",
  whatsapp: "+2348103034205",
  bankAlertNote: "Bank alert recorded for admin head: confirm payment with bank alert number 3144141448.",
};

export const DEMO_USERS = [
  { id: "u1", name: "Tunde Adeyemi", email: "tunde@example.com", password: "user123", role: "user", phone: "08012345678", address: "15 Broad St, Lagos Island" },
  { id: "admin", name: "Admin Manager", email: "olumayowajones@gmail.com", password: "oluwaseun44@", role: "admin", phone: "08087654321", address: "Head Office, Lagos" },
];
