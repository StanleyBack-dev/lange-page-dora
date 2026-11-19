import { z } from "zod";

// What the page reports to POST /api/events (anonymous; see
// features/analytics/lib/tracker.ts).
export const EVENT_TYPES = [
  "page_view",
  "section_view",
  "click",
  "video_play",
  "video_complete",
  "demo_step",
  "form_start",
  "form_submit",
  "form_success",
  "form_error",
  "scroll_depth",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

const slug = z
  .string()
  .trim()
  .max(80)
  .regex(/^[\w:./-]*$/);
const attribution = z.string().trim().max(100).optional();

export const analyticsEventSchema = z.object({
  type: z.enum(EVENT_TYPES),
  name: slug.optional(),
  path: z.string().trim().min(1).max(200).startsWith("/"),
});

export const analyticsBatchSchema = z.object({
  visitorId: z.uuid(),
  sessionId: z.uuid(),
  device: z.enum(["mobile", "tablet", "desktop"]),
  referrerHost: z.string().trim().max(200).optional(),
  utmSource: attribution,
  utmMedium: attribution,
  utmCampaign: attribution,
  events: z.array(analyticsEventSchema).min(1).max(25),
});

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;
export type AnalyticsBatch = z.infer<typeof analyticsBatchSchema>;
