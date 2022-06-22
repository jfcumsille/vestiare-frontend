export enum Mode {
  Live = 'live',
  Test = 'test',
}

export enum CountryCode {
  CL = 'cl',
  MX = 'mx',
}

export enum Product {
  Movements = 'MOVEMENTS',
  Invoices = 'INVOICES',
  Subscriptions = 'SUBSCRIPTION',
  Payments = 'PAYMENTS',
  Income = 'INCOME',
  RefreshIntent = 'REFRESH_INTENT',
  TaxStatements = 'TAX_STATEMENTS',
  TaxReturns = 'TAX_RETURNS',
  Charges = 'CHARGES',
}

export enum HolderType {
  Individual = 'individual',
  Business = 'business',
}

export enum APIModule {
  Banking = 'Banking',
  Fiscal = 'Fiscal',
}

export enum ButtonType {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Outline = 'Outline',
  Text = 'Text',
  Danger = 'Danger',
}

export enum SizeType {
  Inline = 'Inline',
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  XLarge = 'XLarge',
}

export enum HorizontalPositionType {
  Left = 'Left',
  Right = 'Right',
}

export enum JustifyType {
  Start = 'justify-start',
  End = 'justify-end',
  Center = 'justify-center',
  Between = 'justify-between',
  Around = 'justify-around',
  Evenly = 'justify-evenly',
}

export enum Auth0EmailPasswordDatabase {
  EmailPasswordProduction = 'username-password-production',
  EmailPasswordStaging = 'username-password-staging',
  EmailPasswordLocal = 'username-password-local',
}

export enum Auth0SocialDatabase {
  Google = 'google-oauth2',
  GitHub = 'github',
}

export const Auth0Database = {
  ...Auth0EmailPasswordDatabase,
  ...Auth0SocialDatabase,
};

export type Auth0Database = Auth0SocialDatabase | Auth0EmailPasswordDatabase;
