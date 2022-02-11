const goToWebhooksPage = () => {
  cy.login();
  cy.intercept(
    { method: 'GET', url: '**webhook_endpoints**' },
    (req) => {
      if (req.url.includes('mode=live')) {
        return req.reply({ status: 200, fixture: 'live_webhook_endpoints.json' });
      }
      return req.reply({ status: 200, fixture: 'test_webhook_endpoints.json' });
    },
  ).as('getEndpoints');
  cy.visit('/webhooks');
};

const goToWebhookDetailsPage = (endpointId) => {
  cy.login();
  cy.intercept(
    { method: 'GET', url: '**webhook_endpoints**' },
    (req) => {
      if (req.url.includes('mode=live')) {
        return req.reply({ status: 200, fixture: 'live_webhook_endpoints.json' });
      }
      return req.reply({ status: 200, fixture: 'test_webhook_endpoints.json' });
    },
  ).as('getEndpoints');

  cy.visit(`webhooks/${endpointId}`);
};

const testWebhooksTableLength = (length) => {
  cy.get('tbody tr:visible').should('have.length', length);
};

const testWebhooksTableContent = (endpoints) => {
  endpoints.forEach((endpoint) => {
    cy.contains(endpoint.url.toString()).parents('tr').then((endpointRow) => {
      if (endpoint.description) expect(endpointRow).to.include.text(endpoint.description);
      expect(endpointRow).to.include.text(endpoint.enabled_events.length);
      expect(endpointRow).to.include.text(endpoint.status === 'enabled' ? 'Sí' : 'No');
    });
  });
};

const testSubscribeWebhookButton = (isTestMode) => {
  cy.intercept(
    { method: 'GET', url: '**/webhook_event_types' },
    (req) => req.reply({ statusCode: 200, body: [] }),
  ).as('getEventTypes');
  cy.get('#subscribe-webhook-button').should('include.text', 'Suscribir webhook');
  const testText = isTestMode ? 'include.text' : 'not.include.text';
  cy.get('#subscribe-webhook-button').should(testText, 'de prueba');
  cy.get('#subscribe-webhook-button').click();
  cy.get('#new-webhook-modal').should('be.visible');
};

const testIsWebhookDetailsPage = () => {
  cy.get('table').should('have.length', 2);
  cy.contains('Detalles');
};

const testWebhookDetailsContent = (endpoint) => {
  cy.contains(endpoint.url);
  cy.contains(endpoint.mode);
  if (endpoint.description) cy.contains(endpoint.description);
  cy.contains(endpoint.status === 'enabled' ? 'Sí' : 'No');
  endpoint.enabled_events.forEach((event) => {
    cy.contains(event);
  });
};

const testShowWebhookSecretButton = () => {
  cy.intercept(
    { method: 'GET', url: '**secret**' },
    (req) => req.reply({ status: 200, fixture: 'webhook_secret.json' }),
  );
  cy.contains('Revelar').click();
  cy.fixture('webhook_secret.json').then((secretJson) => {
    cy.contains(secretJson.secret);
  });
};

describe('Webhook endpoints', () => {
  describe('live endpoints', () => {
    let liveEndpoints;
    before(() => {
      goToWebhooksPage();
      cy.fixture('live_webhook_endpoints.json').then((endpoints) => {
        liveEndpoints = endpoints;
      });
    });
    describe('index', () => {
      it('shows all endpoints', () => {
        testWebhooksTableLength(liveEndpoints.length);
      });

      it('shows correct params for each endpoint', () => {
        testWebhooksTableContent(liveEndpoints);
      });

      it('opens modal when clicking on "Suscribir webhook" button', () => {
        testSubscribeWebhookButton(false);
      });
    });

    describe('show', () => {
      let selectedEndpoint;
      before(() => {
        [,,, selectedEndpoint] = liveEndpoints;
        goToWebhookDetailsPage(selectedEndpoint.id);
      });

      it('shows endpoint details page', () => {
        testIsWebhookDetailsPage();
      });

      it('shows all params correctlly', () => {
        testWebhookDetailsContent(selectedEndpoint);
      });

      it('reveals webhook secret on click', () => {
        testShowWebhookSecretButton();
      });

      it('doesnt show \'Enviar webhook de prueba\' button', () => {
        cy.get('table').should('not.include.text', 'Enviar webhook de prueba');
      });
    });
  });

  describe('test endpoints', () => {
    let testEndpoints;
    before(() => {
      goToWebhooksPage();
      cy.fixture('test_webhook_endpoints.json').then((endpoints) => {
        testEndpoints = endpoints;
      });
      cy.get('.v-switch-input').first().click();
    });

    describe('index', () => {
      it('shows all endpoints', () => {
        testWebhooksTableLength(testEndpoints.length);
      });

      it('shows correct params for each endpoint', () => {
        testWebhooksTableContent(testEndpoints);
      });

      it('opens modal when clicking on "Suscribir webhook" button', () => {
        testSubscribeWebhookButton(true);
      });
    });

    describe('show', () => {
      let selectedEndpoint;
      before(() => {
        [,, selectedEndpoint] = testEndpoints;
        goToWebhookDetailsPage(selectedEndpoint.id);
      });

      it('shows endpoint details page', () => {
        testIsWebhookDetailsPage();
      });

      it('shows all params correctlly', () => {
        testWebhookDetailsContent(selectedEndpoint);
      });

      it('reveals webhook secret on click', () => {
        testShowWebhookSecretButton();
      });

      it('shows \'Enviar webhook de prueba\' button', () => {
        cy.get('table').should('include.text', 'Enviar webhook de prueba');
      });

      it('open send test webhook modal on click', () => {
        cy.get('#send-test-webhook').click();
        cy.get('#webhook-send-modal').should('be.visible');
      });
    });
  });
});
