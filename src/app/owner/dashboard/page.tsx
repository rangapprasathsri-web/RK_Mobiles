import Link from "next/link";
import {
  MessageSquare,
  Smartphone,
  ShoppingBag,
  Tag,
  Plus,
  ArrowRight,
  Eye,
  TrendingUp,
  Users,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  // In production, this data comes from the database
  const stats = [
    {
      label: "Today's Enquiries",
      value: "3",
      icon: MessageSquare,
      color: "text-rk-purple",
      bg: "bg-rk-purple-50",
    },
    {
      label: "New Enquiries",
      value: "5",
      icon: AlertCircle,
      color: "text-rk-orange",
      bg: "bg-orange-50",
    },
    {
      label: "Active Offers",
      value: "1",
      icon: Tag,
      color: "text-rk-green",
      bg: "bg-rk-green-50",
    },
    {
      label: "Total Products",
      value: "6",
      icon: Smartphone,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  const recentEnquiries = [
    {
      id: "1",
      name: "Rahul",
      phone: "98XXX XXXXX",
      service: "Display Replacement",
      device: "Samsung Galaxy A55",
      status: "new",
      time: "2 hours ago",
    },
    {
      id: "2",
      name: "Priya",
      phone: "87XXX XXXXX",
      service: "Battery Replacement",
      device: "Xiaomi Redmi Note 12",
      status: "contacted",
      time: "5 hours ago",
    },
    {
      id: "3",
      name: "Kumar",
      phone: "90XXX XXXXX",
      service: "Software Service",
      device: "Vivo Y200",
      status: "new",
      time: "1 day ago",
    },
  ];

  const statusColors: Record<string, string> = {
    new: "bg-yellow-100 text-yellow-800",
    contacted: "bg-blue-100 text-blue-800",
    visit_planned: "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-gray-100 text-gray-800",
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here is an overview of your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-100 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/owner/dashboard/mobiles">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-rk-purple/30 text-rk-purple"
            >
              <Plus className="h-4 w-4" />
              Add Mobile
            </Button>
          </Link>
          <Link href="/owner/dashboard/accessories">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-rk-purple/30 text-rk-purple"
            >
              <Plus className="h-4 w-4" />
              Add Accessory
            </Button>
          </Link>
          <Link href="/owner/dashboard/services">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-rk-purple/30 text-rk-purple"
            >
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </Link>
          <Link href="/owner/dashboard/offers">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-rk-purple/30 text-rk-purple"
            >
              <Plus className="h-4 w-4" />
              Create Offer
            </Button>
          </Link>
          <Link href="/owner/dashboard/enquiries">
            <Button size="sm" className="gap-2 bg-rk-purple hover:bg-rk-purple-dark">
              <Eye className="h-4 w-4" />
              View Enquiries
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Enquiries */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Enquiries
          </h2>
          <Link
            href="/owner/dashboard/enquiries"
            className="text-sm text-rk-purple hover:underline flex items-center gap-1"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="space-y-4">
          {recentEnquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-900">{enquiry.name}</p>
                  <Badge
                    className={`text-xs ${
                      statusColors[enquiry.status] || statusColors.new
                    } border-0`}
                  >
                    {enquiry.status.replace("_", " ")}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {enquiry.device} — {enquiry.service}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {enquiry.time}
                </p>
              </div>
              <a href={`tel:${enquiry.phone}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 text-xs"
                >
                  Contact
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
