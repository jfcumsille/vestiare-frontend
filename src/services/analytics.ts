import { User } from '@/interfaces/entities/user';
import humps from 'humps';
import {
  MODAL_VIEWED,
  MODAL_CLOSED,
  DRESS_CREATED,
  DRESS_PUBLIC_CHANGED,
  DASHBOARD_ORIGIN,
} from '@/constants/analyticsEvents';
import { Dress } from '@/interfaces/entities/dresses';

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
    customLauncherSelector: '#my_custom_link',
    alignment: 'left',
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

export const trackDressCreated = (dress: Dress) => {
  track(DRESS_CREATED, {
    dressId: dress.id,
    userId: dress.userId,
    userName: dress.userName,
    createdAt: dress.createdAt,
    origin: DASHBOARD_ORIGIN,
  });
};

export const trackDressStatus = (dress: Dress) => {
  track(DRESS_PUBLIC_CHANGED, {
    id: dress.id,
    public: dress.public,
  });
};

export const trackId = (name: string, id: string) => {
  track(name, {
    id,
    origin: DASHBOARD_ORIGIN,
  });
};
