import { User } from '@/interfaces/entities/user';
import humps from 'humps';
import {
  MODAL_VIEWED,
  MODAL_CLOSED,
  LINK_CREATED,
  LINK_ACTIVE_CHANGED,
  WEBHOOK_ENDPOINT_CREATED,
  API_KEY_CREATED,
  API_KEY_DELETED,
} from '@/constants/analyticsEvents';
import { Link } from '@/interfaces/entities/links';
import { APIKey } from '@/interfaces/entities/apiKeys';
import { Product, Mode } from '@/interfaces/utilities/enums';

export const convertRecordKeysToSnakeCase = (
  record: Record<string, unknown>,
): Record<string, unknown> => {
  const snakeCaseKeyRecord: Record<string, unknown> = {};
  Object.keys(record).forEach((key) => {
    const snakeCaseKey = humps.decamelize(key);
    snakeCaseKeyRecord[snakeCaseKey] = record[key];
  });
  return snakeCaseKeyRecord;
};

export const identify = (user: User, organizationName: string | undefined = undefined) => {
  window.analytics.identify(user.id, {
    email: user.email,
    name: user.name,
    defaultOrganizationId: user.defaultOrganizationId,
    company: organizationName,
  });
};

export const page = (name: string, properties: Record<string, unknown> = {}) => {
  window.analytics.page(name, convertRecordKeysToSnakeCase(properties));
};

export const track = (name: string, properties: Record<string, unknown> = {}) => {
  window.analytics.track(name, convertRecordKeysToSnakeCase(properties));
};

export const trackModal = (opened: boolean, location: string, action: string) => {
  if (opened) {
    track(MODAL_VIEWED, {
      location,
      action,
    });
  } else {
    track(MODAL_CLOSED, {
      location,
      action,
    });
  }
};

export const trackLinkCreated = (link: Link, product: Product) => {
  track(LINK_CREATED, {
    mode: link.mode,
    linkId: link.id,
    institutionId: link.institution.id,
    holderType: link.holderType,
    holderId: link.holderId,
    username: link.username,
    createdAt: link.createdAt,
    product,
    origin: 'dashboard',
  });
};

export const trackLinkStatus = (link: Link) => {
  track(LINK_ACTIVE_CHANGED, {
    id: link.id,
    active: link.active,
  });
};

export const trackWebhookCreated = (enabledEvents: Array<string>) => {
  track(WEBHOOK_ENDPOINT_CREATED, {
    enabledEvents,
    origin: 'dashboard',
  });
};

export const trackAPIKeyCreated = () => {
  track(API_KEY_CREATED, {
    mode: Mode.Live,
    isPublic: 'false',
  });
};

export const trackAPIKeyDeleted = (key: APIKey) => {
  track(API_KEY_DELETED, {
    id: key.id,
    mode: key.mode,
    isPublic: key.isPublic.toString(),
  });
};

export const trackId = (name: string, id: string) => {
  track(name, {
    id,
    origin: 'dashboard',
  });
};
