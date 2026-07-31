import axios from "axios";
import type {
  ApiResponse,
  PaginatedResponse,
  Property,
  Event,
  User,
  Ticket,
  Payment,
  Subscription,
  Notification,
  SearchFilters,
  RegisterData,
  AdminStats,
  Boost,
  PropertyCreateData,
  EventCreateData,
} from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("kasafrik_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("kasafrik_token");
      localStorage.removeItem("kasafrik_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Normalise un objet propriété brut venant de l'API
// (prix string → number, images avec image_url → url, is_cover → is_primary)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProperty(raw: any): Property {
  return {
    ...raw,
    price: Math.round(parseFloat(String(raw.price ?? raw.price_raw ?? 0)) * 1000) || 0,
    images: (raw.images ?? raw.property_images ?? []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (img: any) => ({
        id: img.id ?? 0,
        property_id: img.property_id ?? raw.id ?? 0,
        url: img.image_url ?? img.url ?? "",
        is_primary: img.is_cover ?? img.is_primary ?? false,
        order: img.order ?? img.sort_order ?? 0,
      })
    ),
  } as Property;
}

export async function getProperties(
  params?: Record<string, string | number>
): Promise<PaginatedResponse<Property>> {
  const res = await api.get("/properties", { params });
  return {
    ...res.data,
    data: (res.data.data ?? []).map(mapProperty),
  };
}

export async function getProperty(id: number): Promise<ApiResponse<Property>> {
  const res = await api.get(`/properties/${id}`);
  return {
    ...res.data,
    data: mapProperty(res.data.data ?? res.data),
  };
}

export async function getFeaturedProperties(): Promise<PaginatedResponse<Property>> {
  const res = await api.get("/properties/featured");
  return {
    ...res.data,
    data: (res.data.data ?? []).map(mapProperty),
  };
}

export async function searchProperties(
  filters: SearchFilters
): Promise<PaginatedResponse<Property>> {
  const res = await api.get("/properties/search", { params: filters });
  return {
    ...res.data,
    data: (res.data.data ?? []).map(mapProperty),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEvent(raw: any): Event {
  const rawDate = raw.event_date || raw.date || raw.starts_at || null;
  const isoDate = rawDate ? String(rawDate).replace(" ", "T") : null;
  return {
    ...raw,
    id: raw.id,
    title: raw.title || raw.name || "",
    description: raw.description || raw.content || "",
    category: raw.category?.name || raw.category || "",
    city: raw.city || raw.location?.city || "",
    venue: raw.venue || raw.location?.name || "",
    address: raw.address || raw.location?.address || "",
    start_date: isoDate || new Date().toISOString(),
    end_date: isoDate
      ? new Date(new Date(isoDate).getTime() + 3 * 60 * 60 * 1000).toISOString()
      : new Date().toISOString(),
    image: raw.image || raw.cover_image || raw.thumbnail || raw.banner || "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ticket_types: (raw.ticket_types || raw.tickets || []).map((t: any) => ({
      id: t.id,
      event_id: t.event_id || raw.id,
      name: t.name || t.type || "",
      description: t.description || "",
      price: Math.round(parseFloat(String(t.price ?? 0)) * 1000),
      quantity: parseInt(String(t.quantity ?? t.total_seats)) || 100,
      sold: parseInt(String(t.sold ?? t.sold_seats ?? t.tickets_sold)) || 0,
      is_available: Boolean(
        t.is_available ??
          (parseInt(String(t.quantity ?? t.total_seats)) || 100) >
            (parseInt(String(t.sold ?? 0)) || 0)
      ),
    })),
    organizer: raw.organizer,
    is_published: Boolean(raw.is_published),
  } as Event;
}

export async function getEvents(
  params?: Record<string, string | number>
): Promise<PaginatedResponse<Event>> {
  const res = await api.get("/events", { params });
  return {
    ...res.data,
    data: (res.data.data ?? []).map(mapEvent),
  };
}

export async function getEvent(id: number): Promise<ApiResponse<Event>> {
  const res = await api.get(`/events/${id}`);
  return {
    ...res.data,
    data: mapEvent(res.data.data ?? res.data),
  };
}

export async function login(
  email: string,
  password: string
): Promise<{ token: string; user: User }> {
  const res = await api.post("/login", { email, password });
  const { token, user } = res.data;
  if (typeof window !== "undefined") {
    localStorage.setItem("kasafrik_token", token);
    localStorage.setItem("kasafrik_user", JSON.stringify(user));
  }
  return { token, user };
}

export async function register(
  data: RegisterData
): Promise<{ token: string; user: User }> {
  const res = await api.post("/register", data);
  const { token, user } = res.data;
  if (typeof window !== "undefined") {
    localStorage.setItem("kasafrik_token", token);
    localStorage.setItem("kasafrik_user", JSON.stringify(user));
  }
  return { token, user };
}

export async function logout(): Promise<void> {
  await api.post("/logout");
  if (typeof window !== "undefined") {
    localStorage.removeItem("kasafrik_token");
    localStorage.removeItem("kasafrik_user");
  }
}

export async function getMe(): Promise<ApiResponse<User>> {
  const res = await api.get("/me");
  return res.data;
}

export async function createProperty(
  data: PropertyCreateData
): Promise<ApiResponse<Property>> {
  const res = await api.post("/properties", data);
  return res.data;
}

export async function createEvent(
  data: EventCreateData
): Promise<ApiResponse<Event>> {
  const res = await api.post("/events", data);
  return res.data;
}

export interface PaymentInitiateData {
  event_id: number;
  items: { ticket_type_id: number; quantity: number }[];
  payment_method: string;
  amount: number;
}

export interface PaymentInitiateResult {
  payment_url?: string;
  transaction_id: string;
  status: string;
  message?: string;
}

export async function initiatePayment(
  data: PaymentInitiateData
): Promise<ApiResponse<PaymentInitiateResult>> {
  const res = await api.post("/payments/initiate", data);
  return res.data;
}

export async function getMyProperties(): Promise<PaginatedResponse<Property>> {
  const res = await api.get("/my/properties");
  return res.data;
}

export async function getMyTickets(): Promise<PaginatedResponse<Ticket>> {
  const res = await api.get("/my/tickets");
  return res.data;
}

export async function getMyBookings(): Promise<PaginatedResponse<import("@/types").Booking>> {
  const res = await api.get("/my/bookings");
  return res.data;
}

export async function createBooking(data: {
  property_id: number;
  check_in: string;
  check_out: string;
  guests: number;
  notes?: string;
}): Promise<ApiResponse<import("@/types").Booking>> {
  const res = await api.post("/bookings", data);
  return res.data;
}

// ─── Admin ────────────────────────────────────────────────────────────────

export async function getAdminStats(): Promise<ApiResponse<AdminStats>> {
  const res = await api.get("/admin/stats");
  return res.data;
}

export async function getAdminUsers(
  params?: Record<string, string | number>
): Promise<PaginatedResponse<User>> {
  const res = await api.get("/admin/users", { params });
  return res.data;
}

export async function getAdminProperties(
  params?: Record<string, string | number>
): Promise<PaginatedResponse<Property>> {
  const res = await api.get("/admin/properties", { params });
  return res.data;
}

export async function getAdminEvents(
  params?: Record<string, string | number>
): Promise<PaginatedResponse<Event>> {
  const res = await api.get("/admin/events", { params });
  return res.data;
}

export async function getAdminTickets(
  params?: Record<string, string | number>
): Promise<PaginatedResponse<Ticket>> {
  const res = await api.get("/admin/tickets", { params });
  return res.data;
}

export async function getAdminPayments(
  params?: Record<string, string | number>
): Promise<PaginatedResponse<Payment>> {
  const res = await api.get("/admin/payments", { params });
  return res.data;
}

export async function getAdminSubscriptions(
  params?: Record<string, string | number>
): Promise<PaginatedResponse<Subscription>> {
  const res = await api.get("/admin/subscriptions", { params });
  return res.data;
}

export async function getAdminNotifications(
  params?: Record<string, string | number>
): Promise<PaginatedResponse<Notification>> {
  const res = await api.get("/admin/notifications", { params });
  return res.data;
}

export async function getAdminBoosts(
  params?: Record<string, string | number>
): Promise<PaginatedResponse<Boost>> {
  const res = await api.get("/admin/boosts", { params });
  return res.data;
}

export async function verifyProperty(id: number): Promise<ApiResponse<Property>> {
  const res = await api.post(`/admin/properties/${id}/verify`);
  return res.data;
}

export async function featureProperty(
  id: number,
  featured: boolean
): Promise<ApiResponse<Property>> {
  const res = await api.post(`/admin/properties/${id}/feature`, { featured });
  return res.data;
}

export async function deletePropertyAdmin(id: number): Promise<void> {
  await api.delete(`/admin/properties/${id}`);
}

export async function publishEvent(
  id: number,
  published: boolean
): Promise<ApiResponse<Event>> {
  const res = await api.post(`/admin/events/${id}/publish`, { published });
  return res.data;
}

export async function deleteEventAdmin(id: number): Promise<void> {
  await api.delete(`/admin/events/${id}`);
}

export async function banUser(id: number): Promise<ApiResponse<User>> {
  const res = await api.post(`/admin/users/${id}/ban`);
  return res.data;
}

export async function unbanUser(id: number): Promise<ApiResponse<User>> {
  const res = await api.post(`/admin/users/${id}/unban`);
  return res.data;
}

export async function markNotificationRead(
  id: number
): Promise<ApiResponse<Notification>> {
  const res = await api.post(`/admin/notifications/${id}/read`);
  return res.data;
}

export async function markAllNotificationsRead(): Promise<void> {
  await api.post("/admin/notifications/read-all");
}

export default api;
