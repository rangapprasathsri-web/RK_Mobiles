import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding RK MOBILES database...");

  // Create owner
  const ownerEmail = process.env.OWNER_EMAIL || "owner@rkmobiles.com";
  const ownerPassword = process.env.OWNER_PASSWORD || "RKMobiles@2026";
  const ownerName = process.env.OWNER_NAME || "RK Mobiles Owner";

  const hashedPassword = await bcrypt.hash(ownerPassword, 12);

  const owner = await prisma.owner.upsert({
    where: { email: ownerEmail },
    update: {},
    create: {
      email: ownerEmail,
      password: hashedPassword,
      name: ownerName,
    },
  });
  console.log(`✅ Owner created: ${owner.email}`);

  // Create business settings
  await prisma.businessSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      businessName: "RK MOBILES",
      tagline: "Quality Service & Affordable Prices",
      description:
        "RK MOBILES is a local mobile sales and service shop providing mobile phones, accessories, mobile repair services and everyday digital services.",
      address: "C.S.I. Boys School Complex",
      addressLine2: "Pollachi Road",
      city: "Dharapuram",
      phone1: "+91 98650 13529",
      phone2: "+91 83291 66021",
      whatsappNumber: "919865013529",
    },
  });
  console.log("✅ Business settings created");

  // Create brands
  const brands = [
    "Samsung",
    "Xiaomi",
    "Realme",
    "OPPO",
    "Vivo",
    "OnePlus",
    "Apple",
    "Motorola",
    "Nokia",
    "POCO",
    "iQOO",
    "Nothing",
    "Google",
    "Tecno",
    "Infinix",
    "Lava",
    "Itel",
  ];

  for (const brandName of brands) {
    await prisma.brand.upsert({
      where: { slug: brandName.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: {
        name: brandName,
        slug: brandName.toLowerCase().replace(/\s+/g, "-"),
      },
    });
  }
  console.log(`✅ ${brands.length} brands created`);

  // Create accessory categories
  const accessoryCategories = [
    { name: "Mobile Covers", sortOrder: 1 },
    { name: "Tempered Glass", sortOrder: 2 },
    { name: "Camera Lens Protectors", sortOrder: 3 },
    { name: "Chargers", sortOrder: 4 },
    { name: "USB Cables", sortOrder: 5 },
    { name: "Lightning Cables", sortOrder: 6 },
    { name: "Adapters", sortOrder: 7 },
    { name: "Power Banks", sortOrder: 8 },
    { name: "Wired Earphones", sortOrder: 9 },
    { name: "TWS Earbuds", sortOrder: 10 },
    { name: "Bluetooth Speakers", sortOrder: 11 },
    { name: "Headphones", sortOrder: 12 },
    { name: "Smart Watches", sortOrder: 13 },
    { name: "Fitness Bands", sortOrder: 14 },
    { name: "Batteries", sortOrder: 15 },
    { name: "Other Accessories", sortOrder: 16 },
  ];

  for (const cat of accessoryCategories) {
    await prisma.accessoryCategory.upsert({
      where: { slug: cat.name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: {
        name: cat.name,
        slug: cat.name.toLowerCase().replace(/\s+/g, "-"),
        sortOrder: cat.sortOrder,
      },
    });
  }
  console.log(`✅ ${accessoryCategories.length} accessory categories created`);

  // Create services
  const services = [
    {
      name: "Display Replacement",
      shortDescription:
        "Professional display replacement for damaged, cracked or malfunctioning mobile screens.",
      symptoms: [
        "Cracked screen",
        "Touch not working",
        "Display flickering",
        "Black screen with backlight",
        "Dead pixels",
        "Display discoloration",
      ],
      iconName: "Smartphone",
      sortOrder: 1,
    },
    {
      name: "Battery Replacement",
      shortDescription:
        "Battery replacement service for phones with poor battery life or swollen batteries.",
      symptoms: [
        "Battery draining fast",
        "Phone shuts down unexpectedly",
        "Battery swelling",
        "Phone not holding charge",
        "Overheating during charging",
      ],
      iconName: "BatteryCharging",
      sortOrder: 2,
    },
    {
      name: "Charging Port Repair",
      shortDescription:
        "Repair or replacement of damaged charging ports for reliable charging.",
      symptoms: [
        "Charger not connecting properly",
        "Loose charging port",
        "Intermittent charging",
        "Phone not charging",
        "Debris in charging port",
      ],
      iconName: "Plug",
      sortOrder: 3,
    },
    {
      name: "Charging Problems",
      shortDescription:
        "Diagnosis and repair of all types of charging issues.",
      symptoms: [
        "Slow charging",
        "Phone not charging",
        "Charging stops at certain percentage",
        "Only charges when turned off",
        "Wireless charging not working",
      ],
      iconName: "Zap",
      sortOrder: 4,
    },
    {
      name: "Software Service",
      shortDescription:
        "Software troubleshooting, updates, and optimization services.",
      symptoms: [
        "Phone running slow",
        "Apps crashing",
        "Software glitches",
        "System update issues",
        "Virus/malware problems",
        "Data backup and restore",
      ],
      iconName: "Settings",
      sortOrder: 5,
    },
    {
      name: "Operating System Issues",
      shortDescription:
        "OS repair including boot issues, stuck screens, and system failures.",
      symptoms: [
        "Stuck on logo",
        "Boot loop",
        "System not responding",
        "Factory reset needed",
        "OS corruption",
      ],
      iconName: "Monitor",
      sortOrder: 6,
    },
    {
      name: "Camera Repair",
      shortDescription:
        "Front and rear camera repair and replacement services.",
      symptoms: [
        "Blurry photos",
        "Camera not opening",
        "Black camera screen",
        "Camera shaking",
        "Autofocus not working",
        "Flash not working",
      ],
      iconName: "Camera",
      sortOrder: 7,
    },
    {
      name: "Speaker Repair",
      shortDescription:
        "Speaker diagnosis and repair for distorted or no audio output.",
      symptoms: [
        "No sound",
        "Distorted audio",
        "Low volume",
        "Speaker crackling",
        "Earpiece not working",
      ],
      iconName: "Volume2",
      sortOrder: 8,
    },
    {
      name: "Microphone Repair",
      shortDescription:
        "Microphone repair for voice call and recording issues.",
      symptoms: [
        "Others cannot hear you",
        "Muffled voice during calls",
        "Voice recording not working",
        "Microphone noise",
      ],
      iconName: "Mic",
      sortOrder: 9,
    },
    {
      name: "Network Issues",
      shortDescription:
        "Diagnosis and fix for mobile network and connectivity problems.",
      symptoms: [
        "No network signal",
        "SIM not detected",
        "Mobile data not working",
        "Wi-Fi not connecting",
        "Bluetooth issues",
      ],
      iconName: "Wifi",
      sortOrder: 10,
    },
    {
      name: "Signal Problems",
      shortDescription:
        "Signal strength improvement and antenna-related repairs.",
      symptoms: [
        "Weak signal",
        "Frequent call drops",
        "No service in specific areas",
        "Signal fluctuation",
      ],
      iconName: "Signal",
      sortOrder: 11,
    },
    {
      name: "Power Issues",
      shortDescription:
        "Power-related repairs including motherboard and component issues.",
      symptoms: [
        "Phone not turning on",
        "Random shutdowns",
        "Power button not working",
        "Phone restarting automatically",
      ],
      iconName: "Power",
      sortOrder: 12,
    },
    {
      name: "Phone Not Turning On",
      shortDescription:
        "Dead phone diagnosis and repair services.",
      symptoms: [
        "Phone completely dead",
        "No response to charging",
        "No LED indicator",
        "Screen remains black",
      ],
      iconName: "PowerOff",
      sortOrder: 13,
    },
    {
      name: "Water Damage Inspection",
      shortDescription:
        "Inspection and recovery services for water-damaged phones.",
      symptoms: [
        "Phone fell in water",
        "Water damage indicators triggered",
        "Phone acting erratically after water exposure",
        "Corrosion visible",
      ],
      iconName: "Droplets",
      sortOrder: 14,
    },
    {
      name: "Performance Issues",
      shortDescription:
        "Performance optimization for slow or lagging phones.",
      symptoms: [
        "Phone running very slow",
        "Apps taking long to open",
        "Frequent freezing",
        "Storage full",
        "RAM management issues",
      ],
      iconName: "Gauge",
      sortOrder: 15,
    },
    {
      name: "Heating Problems",
      shortDescription:
        "Diagnosis and fix for overheating phones.",
      symptoms: [
        "Phone gets very hot",
        "Overheating during calls",
        "Overheating during charging",
        "Overheating during gaming",
        "Battery draining due to heat",
      ],
      iconName: "Thermometer",
      sortOrder: 16,
    },
    {
      name: "Button Problems",
      shortDescription:
        "Physical button repair including power, volume, and home buttons.",
      symptoms: [
        "Power button stuck",
        "Volume button not working",
        "Home button broken",
        "Button requiring excessive force",
      ],
      iconName: "ToggleLeft",
      sortOrder: 17,
    },
    {
      name: "Other Mobile Repairs",
      shortDescription:
        "All other mobile repair services not listed above. Contact us for any mobile issue.",
      symptoms: [
        "Any issue not listed",
        "Multiple issues",
        "General inspection needed",
        "Second opinion on diagnosis",
      ],
      iconName: "Wrench",
      sortOrder: 18,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: {
        name: service.name,
        slug: service.name.toLowerCase().replace(/\s+/g, "-"),
        shortDescription: service.shortDescription,
        symptoms: service.symptoms,
        iconName: service.iconName,
        sortOrder: service.sortOrder,
        isFeatured: service.sortOrder <= 6,
        isActive: true,
      },
    });
  }
  console.log(`✅ ${services.length} services created`);

  // Create sample products
  const samsung = await prisma.brand.findUnique({
    where: { slug: "samsung" },
  });
  const xiaomi = await prisma.brand.findUnique({ where: { slug: "xiaomi" } });
  const realme = await prisma.brand.findUnique({ where: { slug: "realme" } });
  const vivo = await prisma.brand.findUnique({ where: { slug: "vivo" } });
  const oppo = await prisma.brand.findUnique({ where: { slug: "oppo" } });

  if (samsung && xiaomi && realme && vivo && oppo) {
    const sampleProducts = [
      {
        name: "Samsung Galaxy A55 5G",
        slug: "samsung-galaxy-a55-5g",
        brandId: samsung.id,
        model: "Galaxy A55",
        variant: "5G",
        ram: "8GB",
        storage: "128GB",
        color: "Awesome Iceblue",
        network: "5G",
        price: 27999,
        originalPrice: 29999,
        description:
          "Samsung Galaxy A55 5G with Super AMOLED display, 50MP camera and long lasting battery.",
        stock: 5,
        isFeatured: true,
      },
      {
        name: "Samsung Galaxy A16",
        slug: "samsung-galaxy-a16",
        brandId: samsung.id,
        model: "Galaxy A16",
        variant: "4G",
        ram: "6GB",
        storage: "128GB",
        color: "Black",
        network: "4G",
        price: 13999,
        originalPrice: 15999,
        description:
          "Samsung Galaxy A16 with sleek design and reliable performance for everyday use.",
        stock: 8,
        isFeatured: true,
      },
      {
        name: "Xiaomi Redmi Note 13 Pro",
        slug: "xiaomi-redmi-note-13-pro",
        brandId: xiaomi.id,
        model: "Redmi Note 13 Pro",
        variant: "5G",
        ram: "8GB",
        storage: "256GB",
        color: "Midnight Black",
        network: "5G",
        price: 23999,
        originalPrice: 25999,
        description:
          "Xiaomi Redmi Note 13 Pro with 200MP camera and powerful Snapdragon processor.",
        stock: 4,
        isFeatured: true,
      },
      {
        name: "Realme Narzo 70 Pro",
        slug: "realme-narzo-70-pro",
        brandId: realme.id,
        model: "Narzo 70 Pro",
        variant: "5G",
        ram: "8GB",
        storage: "128GB",
        color: "Glass Green",
        network: "5G",
        price: 17999,
        originalPrice: 19999,
        description:
          "Realme Narzo 70 Pro with high-performance chipset and stunning display.",
        stock: 6,
        isFeatured: true,
      },
      {
        name: "Vivo Y200e",
        slug: "vivo-y200e",
        brandId: vivo.id,
        model: "Y200e",
        variant: "5G",
        ram: "6GB",
        storage: "128GB",
        color: "Satin Blue",
        network: "5G",
        price: 14999,
        originalPrice: 16999,
        description:
          "Vivo Y200e with AMOLED display, fast charging and sleek design.",
        stock: 7,
        isFeatured: true,
      },
      {
        name: "OPPO A3 Pro",
        slug: "oppo-a3-pro",
        brandId: oppo.id,
        model: "A3 Pro",
        variant: "5G",
        ram: "8GB",
        storage: "128GB",
        color: "Starlight White",
        network: "5G",
        price: 18999,
        originalPrice: 20999,
        description:
          "OPPO A3 Pro with durable design, beautiful camera and smooth performance.",
        stock: 3,
        isFeatured: true,
      },
    ];

    for (const product of sampleProducts) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: product,
      });
    }
    console.log(`✅ ${sampleProducts.length} sample products created`);
  }

  // Create a sample offer
  await prisma.offer.upsert({
    where: { slug: "grand-opening-offer" },
    update: {},
    create: {
      title: "Special Offer on Mobile Accessories",
      slug: "grand-opening-offer",
      description:
        "Get special discounts on selected mobile accessories. Visit RK MOBILES to avail the offer.",
      productType: "general",
      discountText: "Up to 20% Off on Accessories",
      isActive: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  });
  console.log("✅ Sample offer created");

  console.log("\n🎉 Seeding completed successfully!");
  console.log(`\n📧 Owner login: ${ownerEmail}`);
  console.log(`🔑 Owner password: ${ownerPassword}`);
  console.log("\n⚠️  Please change the owner password after first login.\n");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
