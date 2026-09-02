import { supabase } from './supabaseClient';

export type EventType =
  | 'site_visit'
  | 'page_view'
  | 'category_view'
  | 'city_view'
  | 'showcase_impression'
  | 'showcase_click'
  | 'profile_view'
  | 'whatsapp_click'
  | 'phone_click'
  | 'gallery_open'
  | 'photo_view'
  | 'video_play'
  | 'search'
  | 'city_filter'
  | 'package_click'
  | 'application_click'
  | 'favorite_click'
  | 'presence';

export interface RealAnalyticsEvent {
  id: string;
  eventType: EventType;
  timestamp: string;
  sessionId: string;
  profileId?: string;
  profileName?: string;
  profileSlug?: string;
  packageType?: string;
  category?: string;
  city?: string;
  citySlug?: string;
  district?: string;
  deviceType?: 'mobile' | 'desktop' | 'tablet';
  os?: string;
  browser?: string;
  pagePath?: string;
  referrer?: string;
  trafficSource?: 'Google' | 'Direct' | 'Instagram' | 'Facebook' | 'WhatsApp' | 'Referral' | 'Other';
  searchQuery?: string;
  details?: string;
}

const STORAGE_KEY = 'tmv_real_analytics_events_v2';
const HEARTBEAT_INTERVAL = 30000;

function getSessionId(): string {
  if (typeof window === 'undefined') return 'server_session';
  let sid = sessionStorage.getItem('tmv_session_id');
  if (!sid) {
    sid = 'ses_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem('tmv_session_id', sid);
  }
  return sid;
}

function detectDevice(): 'mobile' | 'desktop' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua)) return 'mobile';
  return 'desktop';
}

function detectOS(): string {
  if (typeof window === 'undefined') return 'Unknown';
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) return 'Windows';
  if (/Android/i.test(ua)) return 'Android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  if (/Mac OS/i.test(ua)) return 'macOS';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Other';
}

function detectBrowser(): string {
  if (typeof window === 'undefined') return 'Unknown';
  const ua = navigator.userAgent;
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) return 'Chrome';
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari';
  if (/Edg/i.test(ua)) return 'Edge';
  if (/Firefox/i.test(ua)) return 'Firefox';
  return 'Other';
}

function detectTrafficSource(ref = ''): RealAnalyticsEvent['trafficSource'] {
  if (!ref) return 'Direct';
  const r = ref.toLowerCase();
  if (r.includes('google')) return 'Google';
  if (r.includes('instagram')) return 'Instagram';
  if (r.includes('facebook') || r.includes('fb.com')) return 'Facebook';
  if (r.includes('whatsapp') || r.includes('wa.me')) return 'WhatsApp';
  return 'Referral';
}

function isBot(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent.toLowerCase();
  return /bot|crawler|spider|googlebot|bingbot|yandex|slurp|duckduckbot|baiduspider/i.test(ua);
}

const lastEventMap = new Map<string, number>();

class AnalyticsEngine {
  private events: RealAnalyticsEvent[] = [];
  private presenceTimer: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) this.events = JSON.parse(stored);
      } catch {}

      if (!isBot()) {
        this.startPresenceHeartbeat();
      }
    }
  }

  private startPresenceHeartbeat() {
    this.logEvent('presence', {});
    this.presenceTimer = setInterval(() => {
      this.logEvent('presence', {});
    }, HEARTBEAT_INTERVAL);
  }

  public logEvent(eventType: EventType, details: Partial<RealAnalyticsEvent> = {}): void {
    if (isBot()) return;

    const sessionId = getSessionId();
    const dedupKey = `${sessionId}_${eventType}_${details.profileId || ''}_${details.searchQuery || ''}`;
    const now = Date.now();
    const lastTime = lastEventMap.get(dedupKey) || 0;

    if (now - lastTime < 2000 && eventType !== 'presence') {
      return;
    }
    lastEventMap.set(dedupKey, now);

    const event: RealAnalyticsEvent = {
      id: 'evt_' + now + '_' + Math.random().toString(36).substring(2, 7),
      eventType,
      timestamp: new Date().toISOString(),
      sessionId,
      profileId: details.profileId,
      profileName: details.profileName,
      profileSlug: details.profileSlug,
      packageType: details.packageType,
      category: details.category,
      city: details.city || (typeof window !== 'undefined' ? sessionStorage.getItem('tmv_detected_city') || 'izmir' : 'izmir'),
      citySlug: details.citySlug || (details.city || 'izmir').toLowerCase().replace(/[^a-z0-9]/g, ''),
      district: details.district,
      deviceType: detectDevice(),
      os: detectOS(),
      browser: detectBrowser(),
      pagePath: typeof window !== 'undefined' ? window.location.pathname : '/',
      referrer: typeof window !== 'undefined' ? document.referrer : '',
      trafficSource: detectTrafficSource(typeof window !== 'undefined' ? document.referrer : ''),
      searchQuery: details.searchQuery,
      details: details.details
    };

    this.events.unshift(event);
    if (this.events.length > 5000) this.events.pop();

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.events.slice(0, 500)));
    } catch {}

    try {
      supabase.from('analytics_events').insert({
        id: event.id,
        event_type: event.eventType,
        session_id: event.sessionId,
        profile_id: event.profileId,
        profile_name: event.profileName,
        package_type: event.packageType,
        city: event.city,
        city_slug: event.citySlug,
        district: event.district,
        device_type: event.deviceType,
        os: event.os,
        browser: event.browser,
        page_path: event.pagePath,
        traffic_source: event.trafficSource,
        search_query: event.searchQuery,
        created_at: event.timestamp
      }).then(() => {});
    } catch {}

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tmv_analytics_event', { detail: event }));
    }
  }

  public getEvents(limit = 1000): RealAnalyticsEvent[] {
    return this.events.slice(0, limit);
  }

  public getOnlineCount(): number {
    const twoMinAgo = Date.now() - 60000;
    const activeSessions = new Set<string>();

    this.events.forEach((e) => {
      const t = new Date(e.timestamp).getTime();
      if (t >= twoMinAgo) {
        activeSessions.add(e.sessionId);
      }
    });

    return Math.max(1, activeSessions.size);
  }

  public getTodayMetrics(): any {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayEvents = this.events.filter((e) => new Date(e.timestamp).getTime() >= startOfToday.getTime());

    return {
      online: this.getOnlineCount(),
      visitors: new Set(todayEvents.map((e) => e.sessionId)).size,
      views: todayEvents.filter((e) => e.eventType === 'showcase_impression').length,
      clicks: todayEvents.filter((e) => e.eventType === 'showcase_click').length,
      whatsapp: todayEvents.filter((e) => e.eventType === 'whatsapp_click').length,
      phone: todayEvents.filter((e) => e.eventType === 'phone_click').length
    };
  }
}

export const analytics = new AnalyticsEngine();
