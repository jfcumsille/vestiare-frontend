/// <reference types="@types/segment-analytics" />
export {};

declare global {
  interface Window { analytics: SegmentAnalytics.AnalyticsJS; }
}
