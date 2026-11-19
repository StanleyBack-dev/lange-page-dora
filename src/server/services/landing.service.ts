import "server-only";
import { backendGraphql } from "@/server/graphql/backend-graphql";
import type { AnalyticsBatch } from "@/shared/contracts/analytics-event";
import type { Lead } from "@/shared/contracts/lead";

const SUBMIT_LEAD = /* GraphQL */ `
  mutation SubmitLandingLead($input: SubmitLandingLeadInput!) {
    submitLandingLead(input: $input)
  }
`;

const RECORD_EVENTS = /* GraphQL */ `
  mutation RecordLandingEvents($input: RecordLandingEventsInput!) {
    recordLandingEvents(input: $input)
  }
`;

/** Sends the contact form to the backend, which stores and e-mails it. */
export async function submitLead(lead: Lead, client: Headers): Promise<void> {
  await backendGraphql(
    SUBMIT_LEAD,
    {
      input: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone ?? null,
        condominium: lead.condominium ?? null,
        role: lead.role,
        unitsRange: lead.unitsRange ?? null,
        subject: lead.subject,
        message: lead.message,
        consent: lead.consent,
        visitorId: lead.visitorId ?? null,
        referrerHost: lead.referrerHost ?? null,
        utmSource: lead.utmSource ?? null,
        utmMedium: lead.utmMedium ?? null,
        utmCampaign: lead.utmCampaign ?? null,
      },
    },
    client,
  );
}

/** Forwards an analytics beacon (the API's enums are upper case). */
export async function recordEvents(
  batch: AnalyticsBatch,
  client: Headers,
): Promise<void> {
  await backendGraphql(
    RECORD_EVENTS,
    {
      input: {
        visitorId: batch.visitorId,
        sessionId: batch.sessionId,
        device: batch.device.toUpperCase(),
        referrerHost: batch.referrerHost ?? null,
        utmSource: batch.utmSource ?? null,
        utmMedium: batch.utmMedium ?? null,
        utmCampaign: batch.utmCampaign ?? null,
        events: batch.events.map((event) => ({
          type: event.type.toUpperCase(),
          name: event.name ?? null,
          path: event.path,
        })),
      },
    },
    client,
  );
}
