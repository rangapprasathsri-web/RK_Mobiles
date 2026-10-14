// Shared in-memory store for RK MOBILES (backed by Prisma DB when connected)
// All initial demo/fake enquiries and customers have been removed.

export interface EnquiryItem {
  id: string;
  name: string;
  phone: string;
  deviceBrand: string | null;
  deviceModel: string | null;
  serviceRequired: string;
  preferredDate: string | null;
  preferredTime: string | null;
  message: string | null;
  type: string;
  productName: string | null;
  status: "new" | "contacted" | "visit_planned" | "completed" | "cancelled";
  ownerNotes?: string | null;
  createdAt: string;
  customer?: { id?: string; name: string; phone: string };
}

export interface CustomerItem {
  id: string;
  name: string;
  phone: string;
  device?: string;
  issue?: string;
  preferredDate?: string;
  status?: string;
  lastContactDate?: string;
  enquiriesCount?: number;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
  enquiries?: Array<{
    id: string;
    serviceRequired?: string;
    deviceBrand?: string | null;
    deviceModel?: string | null;
    status: string;
    createdAt: string;
    message?: string | null;
    notes?: string | null;
  }>;
}

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  brand: string;
  model?: string;
  ram?: string;
  storage?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  availability: "in_stock" | "low_stock" | "out_of_stock";
  isFeatured: boolean;
  isActive: boolean;
  createdAt?: string;
}

export interface AccessoryItem {
  id: string;
  name: string;
  category: string;
  brand?: string;
  price: number;
  stock: number;
  isActive: boolean;
}

export interface OfferItem {
  id: string;
  title: string;
  description: string;
  discountText: string;
  productType: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  shortDescription: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
}

export interface StoreSettings {
  businessName: string;
  tagline: string;
  description: string;
  address: string;
  addressLine2: string;
  city: string;
  phone1: string;
  phone2: string;
  whatsappNumber: string;
  mapLink: string;
}

// Global store attached to globalThis to persist across API route invocations in Node runtime
const globalStore = globalThis as unknown as {
  __rkStore?: {
    enquiries: EnquiryItem[];
    customers: CustomerItem[];
    products: ProductItem[];
    accessories: AccessoryItem[];
    offers: OfferItem[];
    services: ServiceItem[];
    settings: StoreSettings;
  };
};

if (!globalStore.__rkStore) {
  globalStore.__rkStore = {
    // Clean initial state: ZERO fake customer enquiries
    enquiries: [],
    // Clean initial state: ZERO fake customers
    customers: [],
    // Real mobile catalogue stock for RK MOBILES shop
    products: [
      {
        id: "prod-1",
        name: "Samsung Galaxy A55 5G",
        slug: "samsung-galaxy-a55-5g",
        brand: "Samsung",
        model: "Galaxy A55 5G",
        ram: "8GB",
        storage: "128GB",
        price: 27999,
        originalPrice: 29999,
        stock: 5,
        availability: "in_stock",
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "prod-2",
        name: "Samsung Galaxy A16",
        slug: "samsung-galaxy-a16",
        brand: "Samsung",
        model: "Galaxy A16",
        ram: "6GB",
        storage: "128GB",
        price: 13999,
        originalPrice: 15999,
        stock: 8,
        availability: "in_stock",
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "prod-3",
        name: "Xiaomi Redmi Note 13 Pro",
        slug: "xiaomi-redmi-note-13-pro",
        brand: "Xiaomi",
        model: "Redmi Note 13 Pro",
        ram: "8GB",
        storage: "256GB",
        price: 23999,
        originalPrice: 25999,
        stock: 4,
        availability: "in_stock",
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "prod-4",
        name: "Realme Narzo 70 Pro",
        slug: "realme-narzo-70-pro",
        brand: "Realme",
        model: "Narzo 70 Pro 5G",
        ram: "8GB",
        storage: "128GB",
        price: 17999,
        originalPrice: 19999,
        stock: 6,
        availability: "in_stock",
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "prod-5",
        name: "Vivo Y200e",
        slug: "vivo-y200e",
        brand: "Vivo",
        model: "Y200e 5G",
        ram: "6GB",
        storage: "128GB",
        price: 14999,
        originalPrice: 16999,
        stock: 7,
        availability: "in_stock",
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "prod-6",
        name: "OPPO A3 Pro",
        slug: "oppo-a3-pro",
        brand: "OPPO",
        model: "A3 Pro 5G",
        ram: "8GB",
        storage: "128GB",
        price: 18999,
        originalPrice: 20999,
        stock: 3,
        availability: "low_stock",
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ],
    // Real accessories categories
    accessories: [
      { id: "acc-1", name: "Premium Mobile Covers & Cases", category: "Mobile Covers", brand: "Generic", price: 299, stock: 25, isActive: true },
      { id: "acc-2", name: "9D Tempered Glass Screen Protector", category: "Tempered Glass", brand: "Generic", price: 199, stock: 30, isActive: true },
      { id: "acc-3", name: "25W Type-C Super Fast Charger", category: "Chargers", brand: "Samsung", price: 899, stock: 10, isActive: true },
      { id: "acc-4", name: "10000mAh Dual Output Power Bank", category: "Power Banks", brand: "Xiaomi", price: 1499, stock: 5, isActive: true },
      { id: "acc-5", name: "Wireless TWS Earbuds with ANC", category: "TWS Earbuds", brand: "boAt", price: 1999, stock: 8, isActive: true },
      { id: "acc-6", name: "Bluetooth Calling Smart Watch", category: "Smart Watches", brand: "Noise", price: 2499, stock: 4, isActive: true },
    ],
    // Real promotional offers
    offers: [
      {
        id: "off-1",
        title: "Screen Guard & Back Cover Combo Offer",
        description: "Get flat 20% discount when purchasing tempered glass and mobile back cover together.",
        discountText: "Combo 20% Off",
        productType: "Accessories",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
        isActive: true,
      },
    ],
    // Real mobile repair and service categories
    services: [
      { id: "svc-1", name: "Display Replacement", shortDescription: "Screen repair for cracked or damaged displays", isFeatured: true, isActive: true, sortOrder: 1 },
      { id: "svc-2", name: "Battery Replacement", shortDescription: "Battery service for phones with poor battery life", isFeatured: true, isActive: true, sortOrder: 2 },
      { id: "svc-3", name: "Charging Port Repair", shortDescription: "Repair or replacement of damaged charging ports", isFeatured: true, isActive: true, sortOrder: 3 },
      { id: "svc-4", name: "Charging Problems", shortDescription: "Diagnosis and repair of all charging issues", isFeatured: true, isActive: true, sortOrder: 4 },
      { id: "svc-5", name: "Software Service", shortDescription: "Software troubleshooting and optimization", isFeatured: true, isActive: true, sortOrder: 5 },
      { id: "svc-6", name: "Operating System Issues", shortDescription: "OS repair for boot issues and system failures", isFeatured: true, isActive: true, sortOrder: 6 },
      { id: "svc-7", name: "Camera Repair", shortDescription: "Front and rear camera repair and replacement", isFeatured: false, isActive: true, sortOrder: 7 },
      { id: "svc-8", name: "Speaker Repair", shortDescription: "Speaker diagnosis and repair", isFeatured: false, isActive: true, sortOrder: 8 },
      { id: "svc-9", name: "Microphone Repair", shortDescription: "Microphone repair for call issues", isFeatured: false, isActive: true, sortOrder: 9 },
      { id: "svc-10", name: "Network Issues", shortDescription: "Network and connectivity fixes", isFeatured: false, isActive: true, sortOrder: 10 },
      { id: "svc-11", name: "Water Damage Inspection", shortDescription: "Inspection for water-damaged phones", isFeatured: false, isActive: true, sortOrder: 11 },
      { id: "svc-12", name: "Other Mobile Repairs", shortDescription: "All other mobile repair services", isFeatured: false, isActive: true, sortOrder: 12 },
    ],
    // Shop settings
    settings: {
      businessName: "RK MOBILES",
      tagline: "Quality Service & Affordable Prices",
      description: "RK MOBILES is a local mobile sales and service shop providing mobile phones, accessories, mobile repair services and everyday digital services in Dharapuram.",
      address: "C.S.I. Boys School Complex",
      addressLine2: "Pollachi Road",
      city: "Dharapuram",
      phone1: "+91 98650 13529",
      phone2: "+91 83291 66021",
      whatsappNumber: "919865013529",
      mapLink: "https://maps.google.com/?q=Pollachi+Road+Dharapuram",
    },
  };
}

export const rkStore = globalStore.__rkStore;

// Helper to record new enquiry and link to customer
export function saveEnquiry(enquiryData: Omit<EnquiryItem, "id" | "createdAt" | "status">): EnquiryItem {
  const enquiryId = `enq-${Date.now()}`;
  const now = new Date().toISOString();

  const newEnquiry: EnquiryItem = {
    ...enquiryData,
    id: enquiryId,
    status: "new",
    createdAt: now,
    customer: {
      name: enquiryData.name,
      phone: enquiryData.phone,
    },
  };

  // Add to enquiries list (newest first)
  rkStore.enquiries.unshift(newEnquiry);

  // Find or create customer
  const cleanPhone = enquiryData.phone.replace(/\s/g, "");
  let customer = rkStore.customers.find((c) => c.phone === cleanPhone);

  const deviceSummary = [enquiryData.deviceBrand, enquiryData.deviceModel].filter(Boolean).join(" ");

  if (!customer) {
    customer = {
      id: `cust-${Date.now()}`,
      name: enquiryData.name,
      phone: cleanPhone,
      device: deviceSummary || "Mobile Device",
      issue: enquiryData.serviceRequired,
      preferredDate: enquiryData.preferredDate || "Not specified",
      status: "new",
      lastContactDate: now.split("T")[0],
      enquiriesCount: 1,
      notes: enquiryData.message || `Customer enquiry for ${enquiryData.serviceRequired}`,
      createdAt: now,
      updatedAt: now,
      enquiries: [
        {
          id: enquiryId,
          serviceRequired: enquiryData.serviceRequired,
          deviceBrand: enquiryData.deviceBrand,
          deviceModel: enquiryData.deviceModel,
          status: "new",
          createdAt: now,
          message: enquiryData.message,
          notes: "Submitted via website enquiry form",
        },
      ],
    };
    rkStore.customers.unshift(customer);
  } else {
    customer.name = enquiryData.name;
    customer.lastContactDate = now.split("T")[0];
    customer.status = "new";
    customer.enquiriesCount = (customer.enquiriesCount || 1) + 1;
    if (deviceSummary) customer.device = deviceSummary;
    if (enquiryData.serviceRequired) customer.issue = enquiryData.serviceRequired;
    if (!customer.enquiries) customer.enquiries = [];
    customer.enquiries.unshift({
      id: enquiryId,
      serviceRequired: enquiryData.serviceRequired,
      deviceBrand: enquiryData.deviceBrand,
      deviceModel: enquiryData.deviceModel,
      status: "new",
      createdAt: now,
      message: enquiryData.message,
      notes: "Submitted via website enquiry form",
    });
  }

  return newEnquiry;
}
