export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: "admin" | "owner" | "organizer" | "client";
  is_verified: boolean;
  is_banned: boolean;
  subscription?: Subscription;
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: number;
  property_id: number;
  url: string;
  is_primary: boolean;
  order: number;
}

export interface Property {
  id: number;
  user_id: number;
  title: string;
  description: string;
  type: "sale" | "rent" | "hotel";
  category: "apartment" | "house" | "villa" | "studio" | "office" | "land" | "hotel_room";
  price: number;
  currency: "XOF" | "EUR" | "USD";
  city: string;
  address: string;
  latitude?: number;
  longitude?: number;
  bedrooms?: number;
  bathrooms?: number;
  surface?: number;
  amenities?: string[];
  is_featured: boolean;
  is_verified: boolean;
  status: "active" | "pending" | "inactive";
  images: PropertyImage[];
  owner?: User;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: number;
  user_id: number;
  property_id: number;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  payment_status: "pending" | "paid" | "refunded";
  notes?: string;
  property?: Property;
  user?: User;
  created_at: string;
  updated_at: string;
}

export interface TicketType {
  id: number;
  event_id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  sold: number;
  is_available: boolean;
}

export interface Event {
  id: number;
  user_id: number;
  title: string;
  description: string;
  category: string;
  city: string;
  venue: string;
  address: string;
  start_date: string;
  end_date: string;
  image?: string;
  is_published: boolean;
  is_featured: boolean;
  ticket_types: TicketType[];
  organizer?: User;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: number;
  user_id: number;
  event_id: number;
  ticket_type_id: number;
  qr_code: string;
  status: "valid" | "used" | "cancelled";
  quantity: number;
  total_price: number;
  event?: Event;
  ticket_type?: TicketType;
  user?: User;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: number;
  user_id: number;
  payable_type: string;
  payable_id: number;
  amount: number;
  currency: string;
  method: "wave" | "orange_money" | "stripe" | "paypal";
  status: "pending" | "completed" | "failed" | "refunded";
  transaction_id?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: number;
  user_id: number;
  plan: "free" | "starter" | "pro" | "enterprise";
  status: "active" | "cancelled" | "expired";
  starts_at: string;
  ends_at: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  is_read: boolean;
  data?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

export interface SearchFilters {
  city?: string;
  type?: "sale" | "rent" | "hotel";
  category?: string;
  price_min?: number;
  price_max?: number;
  bedrooms?: number;
}

export interface RegisterData {
  name: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
  role?: "owner" | "organizer" | "client";
}

export interface PropertyCreateData {
  title: string;
  description: string;
  type: "sale" | "rent" | "hotel";
  category: string;
  price: number;
  currency: "XOF" | "EUR" | "USD";
  city: string;
  address: string;
  bedrooms?: number;
  bathrooms?: number;
  surface?: number;
  amenities?: string[];
}

export interface EventCreateData {
  title: string;
  description: string;
  category: string;
  city: string;
  venue: string;
  address: string;
  start_date: string;
  end_date: string;
}

export interface AdminStats {
  total_users: number;
  total_properties: number;
  total_events: number;
  total_tickets: number;
  total_revenue: number;
  pending_properties: number;
  active_subscriptions: number;
  this_month_revenue: number;
  this_month_properties: number;
  this_month_users: number;
}

export interface Boost {
  id: number;
  property_id: number;
  user_id: number;
  level: "standard" | "featured" | "premium";
  starts_at: string;
  ends_at: string;
  amount: number;
  status: "active" | "expired" | "pending";
  property?: Property;
  user?: User;
  created_at: string;
  updated_at: string;
}
