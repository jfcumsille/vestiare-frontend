export const MOVEMENT_EVENTS = [
  'link.credentials_changed',
  'account.refresh_intent.succeeded',
  'account.refresh_intent.failed',
  'account.refresh_intent.rejected',
  'account.refresh_intent.movements_removed',
];

export const SUBSCRIPTION_INTENT_EVENTS = [
  'subscription_intent.succeeded',
  'subscription_intent.failed',
  'subscription_intent.rejected',
  'subscription.activated',
  'subscription.canceled',
  'charge.succeeded',
  'charge.failed',
];

export const PAYMENT_EVENTS = [
  'payment_intent.succeeded',
  'payment_intent.failed',
  'payment_intent.rejected',
];

export const INVOICES_EVENTS = [
  'link.refresh_intent.succeeded',
  'link.refresh_intent.failed',
];
