export type PackageType = 'DIAMOND' | 'PREMIUM' | 'GOLD' | 'STANDART' | 'SILVER' | string;
export type CategoryType = 'masoz' | 'masor' | 'terapist' | 'spa' | 'hamam' | 'otel-spa' | 'wellness' | string;
export type CategorySlug = CategoryType;
export type ProfileType = 'individual' | 'business' | string;
export type CountryCode = 'TR' | 'NC' | 'KKTC' | string;

export interface StaffMember {
  id?: string;
  name?: string;
  title?: string;
  photo?: string;
  role?: string;
  [key: string]: any;
}

export interface District {
  id?: string;
  name?: string;
  slug?: string;
  [key: string]: any;
}

export interface City {
  id?: string;
  name?: string;
  slug?: string;
  plate?: string;
  districts?: District[] | any[];
  [key: string]: any;
}

export interface Category {
  id?: string;
  name?: string;
  title?: string;
  slug?: string;
  icon?: string;
  description?: string;
  [key: string]: any;
}

export interface ServiceItem {
  id?: string;
  name?: string;
  title?: string;
  slug?: string;
  category?: string;
  icon?: string;
  duration?: string;
  description?: string;
  [key: string]: any;
}

export interface PackageConfig {
  type?: PackageType;
  id?: string;
  name?: string;
  title?: string;
  price?: number;
  period?: string;
  badge?: string;
  features?: string[];
  isPopular?: boolean;
  capacity?: number;
  [key: string]: any;
}

export interface PackageOccupancy {
  active?: number;
  capacity?: number;
  remaining?: number;
  percentage?: number;
  isFull?: boolean;
  current?: number;
  max?: number;
  [key: string]: any;
}

export interface Story {
  id?: string;
  profileId?: string;
  profileName?: string;
  avatar?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'text' | string;
  text?: string;
  createdAt?: string;
  expiresAt?: string;
  [key: string]: any;
}

export interface Review {
  id?: string;
  profileId?: string;
  authorName?: string;
  rating?: number;
  comment?: string;
  createdAt?: string;
  status?: 'pending' | 'approved' | 'rejected' | string;
  approved?: boolean;
  [key: string]: any;
}

export interface Profile {
  id: string;
  slug: string;
  name: string;
  title?: string;
  type?: ProfileType;
  isBusiness?: boolean;
  category: CategoryType;
  categoryName?: string;
  packageType: PackageType;
  city: string;
  citySlug: string;
  cityName?: string;
  district?: string;
  districtSlug?: string;
  neighborhood?: string;
  serviceArea?: string;
  serviceAreas?: string[];
  phone: string;
  whatsapp: string;
  age?: number;
  height?: number;
  weight?: number;
  nationality?: string;
  languages?: string[];
  hairColor?: string;
  eyeColor?: string;
  bodyType?: string;
  experienceYears?: number;
  about?: string;
  description?: string;
  serviceDescription?: string;
  services: string[];
  price?: number;
  currency?: string;
  photos: string[];
  videos?: string[];
  coverPhoto?: string;
  available?: boolean;
  isAvailable?: boolean;
  verified?: boolean;
  isVerified?: boolean;
  rating?: number;
  reviewCount?: number;
  viewsCount?: number;
  whatsappClicks?: number;
  phoneClicks?: number;
  likesCount?: number;
  workingHours?: string;
  workingDays?: string;
  address?: string;
  showAddress?: boolean;
  staff?: StaffMember[];
  stories?: Story[];
  createdAt?: string;
  updatedAt?: string;
  badge?: string;
  [key: string]: any;
}

export interface AnalyticsEvent {
  id?: string;
  eventType: string;
  timestamp?: string;
  profileId?: string;
  packageType?: string;
  city?: string;
  district?: string;
  service?: string;
  searchQuery?: string;
  device?: string;
  referrer?: string;
  [key: string]: any;
}

export type Application = any;
export type Report = any;
export type User = any;
export type Setting = any;
export type AppSettings = any;

export type LocationCity = City;
export type UserReport = { id?: string; profileId?: string; reason?: string; createdAt?: string; status?: string; [key: string]: any; };
export type SiteSettings = { siteName?: string; maintenanceMode?: boolean; [key: string]: any; };
export type AdApplication = any;

export interface DaySchedule {
  day?: string;
  start?: string;
  end?: string;
  isOpen?: boolean;
  [key: string]: any;
}
