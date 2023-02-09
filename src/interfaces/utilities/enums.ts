export enum Mode {
  Live = 'live',
  Test = 'test',
}

export enum CountryCode {
  CL = 'cl',
  MX = 'mx',
}

export enum CountryName {
  Chile = 'Chile',
  Mexico = 'Mexico',
}

export enum Product {
  Movements = 'movements',
  Invoices = 'invoices',
  Subscriptions = 'subscription',
  SubscriptionIntents = 'subscriptions',
  Payments = 'payments',
  Income = 'income',
  RefreshIntent = 'refresh_intent',
  TaxStatements = 'tax_statements',
  TaxReturns = 'tax_returns',
  Charges = 'charges',
}

export enum Plan {
  Trial = 'trial',
  Free = 'free',
  Paid = 'paid',
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
  Hug = 'Hug',
}

export enum PositionType {
  Absolute = 'absolute',
  Relative = 'relative',
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

export enum DateStyle {
  Full = 'full',
  Long = 'long',
  Medium = 'medium',
  Short = 'short',
}

export enum Role {
  Admin = 'admin',
  Member = 'member',
}

export enum OrganizationRole {
  FinanceManagement = 'finance_management',
  Developer = 'developer',
  Operations = 'operations',
  Other = 'other',
}

export enum InvitationStatus {
  Accepted = 'accepted',
  Rejected = 'rejected',
  InvitationSent = 'invitation_sent',
}

export enum BadgeStatus {
  Danger = 'danger',
  Warning = 'warning',
  Success = 'success',
  Main = 'main',
}

export enum PaymentStatus {
  Succeeded = 'succeeded',
  Rejected = 'rejected',
  Failed = 'failed',
  InProgress = 'in_progress',
}

export enum LinkFilterType {
  Active = 'active',
  Password = 'password',
}

export enum PaymentIntentFilterType {
  Status = 'status',
  CreationDate = 'creation date',
  FintocID = 'fintoc id'
}

export enum FileFormat {
  Csv = '.csv',
  Excel = '.xls'
}
