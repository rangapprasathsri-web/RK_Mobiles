# Deploying RK MOBILES to Vercel & Accessing the Owner Portal

This guide provides step-by-step instructions for deploying the **RK MOBILES** web application to [Vercel](https://vercel.com) and accessing the Owner Management Dashboard.

---

## 🚀 How to Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: ready for vercel deployment"
   git push origin main
   ```

2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New..."** ➔ **"Project"**.
   - Select your GitHub repository (`rk-mobiles`).
   - Leave Framework Preset as **Next.js** (detected automatically).
   - Root Directory: `./` (or leave default).

3. **Configure Environment Variables** (in Vercel project settings):
   Add the following environment variables:

   | Variable Name | Recommended Value | Description |
   | :--- | :--- | :--- |
   | `AUTH_SECRET` | `rk-mobiles-auth-secret-production-2026-secure` | Strong random string for session auth |
   | `JWT_SECRET` | `rk-mobiles-jwt-key-dharapuram-2026-secret` | Strong secret for signing tokens |
   | `OWNER_EMAIL` | `owner@rkmobiles.com` | Primary login email for owner |
   | `OWNER_PASSWORD` | `RKMobiles@2026` | Secure password for owner |
   | `OWNER_NAME` | `RK Mobiles Owner` | Owner display name |
   | `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` | Your live production Vercel URL |
   | `DATABASE_URL` *(Optional)* | `postgresql://...` | Neon / Supabase / Vercel Postgres connection string |

   > **Zero Database Blocker**: If you do not have a PostgreSQL database connected yet, **the application will still deploy and run 100% smoothly**! All public pages, customer enquiry forms, and owner dashboard views have built-in resilient in-memory fallbacks. When ready, you can attach a free PostgreSQL database from [Neon.tech](https://neon.tech) or Vercel Postgres.

4. **Click "Deploy"**:
   - Vercel installs dependencies, runs `prisma generate` automatically via `postinstall`, builds the application, and gives you your live production URL in ~1 minute!

---

### Option B: Deploy via Vercel CLI

If you have the Vercel CLI installed:
```bash
npm i -g vercel
vercel login
vercel
# For production:
vercel --prod
```

---

## 🔐 How to Access the Owner Portal

You can access the Owner Management Dashboard in two convenient ways:

### 1. Direct URL
- **Local URL**: [http://localhost:3000/owner/login](http://localhost:3000/owner/login)
- **Production URL**: `https://your-vercel-domain.vercel.app/owner/login`

### 2. One-Click Navigation Links on the Website
- **Desktop**: Scroll to the footer at the bottom of any page. In the copyright row, click **🔒 Owner Portal**.
- **Mobile**: Tap the menu button (`☰`) and click **🔒 Owner Portal Login** at the bottom of the drawer.

---

## 🔑 Default Owner Login Credentials

Use the following credentials to log in:

- **Email / Phone**: `owner@rkmobiles.com` *(or shop mobile number `9865013529`)*
- **Password**: `RKMobiles@2026`

*(You can customize these credentials in your Vercel Environment Variables anytime).*

---

## 📱 Features in the Owner Dashboard

Once logged in at `/owner/dashboard`:
1. **Enquiries (`/owner/dashboard/enquiries`)**: Review customer repair/visit enquiries, filter by status, trigger direct WhatsApp/Calls, and manage notes.
2. **Mobiles (`/owner/dashboard/mobiles`)**: Track stock availability, models, specs, and pricing.
3. **Accessories (`/owner/dashboard/accessories`)**: Monitor inventory of chargers, tempered glass, cables, and cases.
4. **Services (`/owner/dashboard/services`)**: Manage listed repair services and featured items.
5. **Offers (`/owner/dashboard/offers`)**: Manage promotional banners and discount deals.
6. **Customers (`/owner/dashboard/customers`)**: View customer visit history and previous service requests.
7. **Settings (`/owner/dashboard/settings`)**: Update store phone numbers, address, and Google Maps link.
