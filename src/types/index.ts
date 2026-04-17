export interface Colors {
  background: string;
  backgroundAlt: string;
  surface: string;
  surfaceAlt: string;
  surfaceLight: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentPrimary: string;
  accentSecondary: string;
  accentLight: string;
  border: string;
  borderLight: string;
  buttonPrimary: string;
  buttonPrimaryText: string;
  buttonSecondary: string;
  buttonSecondaryText: string;
  overlay: string;
  overlayLight: string;
  overlayDark: string;
  cardShadow: string;
  inputBackground: string;
  inputBorder: string;
  success: string;
  warning: string;
  error: string;
}

export interface Icons {
  [key: string]: string;
}

export interface SEO {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  backgroundImage: string;
  backgroundImage2?: string;
  rating?: string;
  reviewCount?: string;
  badge?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}

export interface AboutData {
  sectionLabel: string;
  title: string;
  subtitle: string;
  history: string;
  philosophy: string;
  mission: string;
  image: string;
  interiorImage?: string;
  stats: Stat[];
  certifications: string[];
  values: Value[];
}

export interface Owner {
  name: string;
  title: string;
  bio: string;
  image: string;
  credentials: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  experience: string;
  bio: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SubService {
  id: string;
  name: string;
  duration: number;
  price: number;
  originalPrice?: number;
  description: string;
  icon: string;
  image?: string;
}

export interface Service {
  id: string;
  category: string;
  categoryIcon: string;
  categoryImage: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  startingPrice: number;
  currency: string;
  featured: boolean;
  subServices: SubService[];
}

export interface OtherService {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PriceItem {
  name: string;
  duration: string;
  price: number;
  icon: string;
}

export interface PriceCategory {
  title: string;
  icon: string;
  items: PriceItem[];
}

export interface PricingData {
  sectionLabel: string;
  title: string;
  subtitle: string;
  image: string;
  categories: PriceCategory[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
  service: string;
}

export interface DaySchedule {
  day: string;
  open: string | null;
  close: string | null;
  isOpen: boolean;
}

export interface Hours {
  sectionLabel: string;
  weekdays: { label: string; open: string; close: string };
  saturday: { label: string; open: string; close: string };
  sunday: { label: string; open: string; close: string | null };
  note: string;
  schedule: DaySchedule[];
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
  alt: string;
}

export interface GalleryData {
  sectionLabel: string;
  title: string;
  subtitle: string;
  categories: string[];
  images: GalleryImage[];
}

export interface Partner {
  id: string;
  name: string;
  logo: string | null;
}

export interface BookingData {
  sectionLabel: string;
  title: string;
  subtitle: string;
  timeSlots: string[];
  depositPolicy: string;
  cancellationPolicy: string;
  noShowPolicy: string;
  confirmationNote: string;
  stylistNote: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  handle: string;
}

export interface ContactData {
  sectionLabel: string;
  title: string;
  subtitle: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  fullAddress: string;
  phone: string;
  whatsapp: string;
  email: string;
  mapEmbedUrl: string;
  coordinates: { lat: number; lng: number };
  landmarks: string;
  parking: string;
  accessibility: string;
  socialLinks: SocialLink[];
}

export interface Amenity {
  title: string;
  description: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FooterData {
  tagline: string;
  copyright: string;
  legalLinks: { label: string; href: string }[];
  quickLinks: { label: string; href: string }[];
}

export interface SalonData {
  seo: SEO;
  name: string;
  tagline: string;
  shortName: string;
  logo: string;
  established: string;
  hero: HeroData;
  about: AboutData;
  owner: Owner;
  team: TeamMember[];
  navigation: NavItem[];
  services: Service[];
  otherServices: OtherService[];
  pricing: PricingData;
  testimonials: Testimonial[];
  hours: Hours;
  gallery: GalleryData;
  partners: Partner[];
  booking: BookingData;
  contact: ContactData;
  amenities: Amenity[];
  hygiene: string;
  faqs: FAQ[];
  footer: FooterData;
}

export interface SelectedService {
  serviceId: string;
  subServiceId: string;
  name: string;
  price: number;
  duration: number;
}

export interface BookingFormState {
  date: string;
  timeSlot: string;
  selectedServices: SelectedService[];
  stylistId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
}
