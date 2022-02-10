describe.only('Movements product', () => {
  const defaultParams = {
    public_key: 'some_public_api_key',
    redirect_to: `${Cypress.config().baseUrl}/login`,
    webhook_url: 'https://www.somedomain.com/webhook',
  };

  describe('holder_type = business', () => {
    const params = { ...defaultParams, holder_type: 'business' };
    before(() => {
      cy.openWidget(params);
    });
    it('should ask for company rut', () => {
      cy.get('#holder-id-input').should('be.visible');
    });

    describe('when clicking on close button', () => {
      before(() => {
        cy.get('#exit-btn').click();
      });

      it('redirects to redirect_to param with result = user_exited in query', () => {
        cy.url().should('eq', `${params.redirect_to}?result=user_exited`);
      });
    });
  });

  describe('holder_type = individual', () => {
    const params = { ...defaultParams, holder_type: 'individual' };

    const testMovementLinkCreation = () => {
      it('should not ask for company rut', () => {
        cy.get('#holder-id-input').should('not.exist');
      });

      describe('when submitting credentials', () => {
        let pollingCount = 0;
        const maxPollingCount = 2;
        before(() => {
          cy.intercept(
            { method: 'POST', url: '**/link_intents/**' },
            (req) => req.reply({ status: 200, fixture: 'processing_link_intent.json' }),
          ).as('createLinkIntent');

          cy.intercept(
            { method: 'GET', url: '**/link_intents/**' },
            (req) => req.reply((res) => {
              if (pollingCount === maxPollingCount) {
                return res.send({ statusCode: 200, fixture: 'succeeded_link_intent.json' });
              }
              if (req.method === 'GET') pollingCount += 1;
              return res.send({ statusCode: 200, fixture: 'processing_link_intent.json' });
            }),
          ).as('getLinkIntent');

          cy.get('#bank-login-submit-btn').click();
        });

        it('posts to fintoc to create a link intent with correct params and polls until succeeded response', () => {
          cy.wait('@createLinkIntent').its('request').then((req) => {
            expect(req.body.callback_url).to.equal(params.webhook_url);
            expect(req.body.link_data).to.include({
              username: '416148503',
              password: 'jonsnow',
              holder_type: params.holder_type,
              product: 'movements',
            });
          });
          cy.wait('@getLinkIntent').its('request.url').should('include', 'li_OaWXV1prHnrznkrY');
          cy.wait('@getLinkIntent').its('request.url').should('include', 'li_OaWXV1prHnrznkrY');
          cy.wait('@getLinkIntent').its('response').then((res) => expect(res.body.status).to.equal('succeeded'));
        });

        it('redirects to redirect_to with correct query params', () => {
          cy.url().should('include', params.redirect_to);
          cy.url().should('include', 'link_id=link_xO8N9X6jiAxXyVBv');
          cy.url().should('include', 'username=416148503');
          cy.url().should('include', `holder_type=${params.holder_type}`);
        });
      });
    };

    describe('with product param = movements', () => {
      before(() => {
        params.product = 'movements';
        cy.openWidget(params);
      });

      testMovementLinkCreation();
    });

    describe('with no product in params', () => {
      before(() => {
        delete params.product;
        cy.openWidget(params);
      });

      testMovementLinkCreation();
    });
  });
});
