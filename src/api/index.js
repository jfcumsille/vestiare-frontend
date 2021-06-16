import accounts from './accounts';
import apiKeys from './apiKeys';
import auth0 from './auth0';
import country from './country';
import links from './links';
import linkIntents from './linkIntents';
import movements from './movements';
import onboarding from './onboarding';
import subscriptions from './subscriptions';
import widgetConfig from './widgetConfig';
import webhooks from './webhooks';


const apiClient = {
  accounts,
  apiKeys,
  auth0,
  country,
  links,
  linkIntents,
  movements,
  onboarding,
  subscriptions,
  widgetConfig,
  webhooks,
};

export default apiClient;
