import { User } from '@/interfaces/entities/user';

declare global {
  interface Window { analytics: SegmentAnalytics.AnalyticsJS; }
}

export const identify = (user: User) => {
  window.analytics.identify(user.id, {
    email: user.email,
    name: user.name,
    defaultOrganizationId: user.defaultOrganizationId,
  });
};

export const page = (name: string) => {
  window.analytics.page(name);
};

export const track = (name: string, properties: Record<string, string>) => {
  window.analytics.track(name, properties);
};
