export const boot = (id: string, email: string, name: string) => {
  Intercom('boot', {
    api_base: 'https://api-iam.intercom.io',
    app_id: 'h2ah9pj0',
    user_id: `dashboard_${id}`,
    name,
    email,
  });
};
