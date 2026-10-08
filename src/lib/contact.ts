// Utility functions for WhatsApp integration

export function getWhatsAppUrl(
  phoneNumber: string,
  message?: string
): string {
  // Remove spaces, dashes, and plus signs for the URL
  const cleanNumber = phoneNumber.replace(/[\s\-\+]/g, "");
  const baseUrl = `https://wa.me/${cleanNumber}`;
  
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  
  return baseUrl;
}

export function getProductEnquiryMessage(productName: string): string {
  return `Hi, I am interested in ${productName}. Is it available at RK MOBILES?`;
}

export function getServiceEnquiryMessage(serviceName: string): string {
  return `Hi, I would like to enquire about ${serviceName}.`;
}

export function getGeneralMessage(): string {
  return `Hi, I would like to contact RK MOBILES.`;
}

export function getCallUrl(phoneNumber: string): string {
  return `tel:${phoneNumber.replace(/\s/g, "")}`;
}

export function getDirectionsUrl(address?: string, mapLink?: string): string {
  if (mapLink) return mapLink;
  if (address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("RK MOBILES Dharapuram")}`;
}
