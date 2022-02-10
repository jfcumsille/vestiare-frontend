<template>
<div class="demo">
  <div class="demo-container">
    <p v-if="isOnboarding" class="font-sz-20 font-300 color-txt-body">
      Bienvenido a Fintoc, {{ name }}! </p>
    <div class="demo-title">{{title}}</div>
    <div class="demo-subtitle">{{subtitle}}</div>
    <div :class="containerClass">
      <div :class="(isOnboarding ? 'demo-container-left max-w-500' :
      'demo-container-left max-w-500')">
        <div class="highlight-title ml-2">País</div>
        <select class="demo-dropdown mt-1" v-model="selectedCountry">
          <option selected disabled>Elegir país…</option>
          <option v-for="(country, index) in countries" :value="country"
          :key="index">{{country.text}}</option>
        </select>

        <div v-if="isOnboarding">
          <div class="highlight-title ml-2 mt-4">Modo</div>
          <select class="demo-dropdown mt-1" v-model="selectedMode">
            <option selected disabled>Elegir modo…</option>
            <option v-for="(mode, index) in modes" :value="mode"
            :key="index">{{mode.text}}</option>
          </select>
        </div>

        <div v-if="!isOnboarding">
          <div class="highlight-title ml-2 mt-4">API</div>
          <select class="demo-dropdown mt-1" v-model="selectedAPI" @change="handleChangeAPI">
            <option selected disabled>Elegir API...</option>
            <option v-for="api in apis" :key="api">{{api}}</option>
          </select>
        </div>

        <div>
          <div class="highlight-title ml-2 mt-4">Producto</div>
          <select class="demo-dropdown mt-1" v-model="selectedProduct"
          :disabled="isOnboarding">
            <option selected disabled>Elegir producto...</option>
            <option v-for="(product, index) in products" :value="product"
            :key="index">{{product.text}}</option>
          </select>
        </div>

        <button class="demo-button w-full text-left mt-8"
        :disabled="isDemoLaunchDisabled" @click="launchDemo">
          {{buttonTitle}}</button>
        <div class="mt-4 ml-2 font-sz-14 font-300"
        v-if="isDemoLaunchDisabled">{{demoNotAvailableText}}</div>
      </div>
      <div v-if="!isOnboarding"
      :class="(windowWidth > 900 ? 'demo-container-right ml-24' :
        'demo-container-right mt-20')">
        <div class="product-title">{{selectedProduct.text}}</div>
        <div class="product-description">{{productDescription}}
          <a target="_blank" :href="moreInfoUrl"> Más información sobre este producto.</a>
        </div>
        <div v-if="!isOnboarding">
          <div class="sample-response-title highlight-title ml-2">Ejemplo de respuesta</div>
          <div class="code">
          <div class="tab-bar">
            <div class="tab-json">JSON</div>
            <div class="empty-space"/>
          </div>
          <pre class="product-sample-response">{{productResponseJSON}}</pre>
        </div>
      </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import apiClient from '../api/index';
import products from '../../sharedTypes/products';

export default {
  data() {
    return {
      widgetToken: null,
      windowWidth: 0,
      windowHeight: 0,
      selectedCountry: { text: 'Chile 🇨🇱', countryCode: 'cl' },
      countries: [
        { text: 'Chile 🇨🇱', countryCode: 'cl' },
        { text: 'México 🇲🇽', countryCode: 'mx' },
      ],
      selectedMode: { text: 'Test (Sandbox)', mode: 'test' },
      modes: [
        { text: 'Live', mode: 'live' },
        { text: 'Test (Sandbox)', mode: 'test' },
      ],
      selectedAPI: 'Banking API',
      apis: [
        'Banking API', 'Fiscal API',
      ],
      movements: { text: 'Movements', product: products.MOVEMENTS, disabledForSandbox: { cl: false, mx: false } },
      subscription: { text: 'Subscription', product: products.SUBSCRIPTION, disabledForSandbox: { cl: false, mx: true } },
      payments: { text: 'Payments', product: products.PAYMENTS, disabledForSandbox: { cl: false, mx: true } },
      refreshIntent: { text: 'Refresh Intent', product: products.REFRESH_INTENT, disabledForSandbox: { cl: true, mx: true } },
      taxReturns: { text: 'Tax Returns', product: products.TAX_RETURNS, disabledForSandbox: { cl: true, mx: true } },
      taxStatements: { text: 'Tax Statements', product: products.TAX_STATEMENTS, disabledForSandbox: { cl: true, mx: true } },
      // income: { text: 'Income', product: 'INCOME' },
      invoices: { text: 'Invoices', product: products.INVOICES, disabledForSandbox: { cl: true, mx: true } },
      selectedProduct: { text: 'Movements', product: products.MOVEMENTS, disabledForSandbox: { cl: false, mx: false } },
      subtitle: 'Con el Widget de Fintoc puedes conectar las cuentas bancarias o fiscales de tus usuarios dentro de tu página o aplicación.\nPrueba el Widget de Fintoc conectando una cuenta bancaria real o una cuenta bancaria de prueba.',
      demoNotAvailableText: 'Este producto sí está disponible en producción, pero el demo estará disponible próximamente 🏗️',
    };
  },
  computed: {
    ...mapGetters(['isUserLoggedIn', 'userApiKeys']),
    ...mapState({
      link: (state) => state.onboarding.link,
      mode: (state) => state.onboarding.mode,
      loggedInPublicKey: (state) => state.onboarding.publicKey,
      loggedInSecretKey: (state) => state.onboarding.apiKey,
      name: (state) => state.auth.name,
    }),
    publicKey() {
      if (this.isDemoPage) {
        return 'pk_test_dxtTSiAiCgz49HGQN_gN9ppy3pEdzyGG';
      }
      return this.loggedInPublicKey.token;
    },
    secretKey() {
      if (this.isDemoPage) {
        return 'sk_test_WHVrB4uupnD-qEZVdW43SePRwXgV2xF9';
      }
      return this.loggedInSecretKey.token;
    },
    containerClass() {
      if (this.windowWidth > 900 && this.isOnboarding) {
        return 'demo-container-row';
      } if (this.windowWidth > 900 && !this.isOnboarding) {
        return 'demo-container-row h-500';
      }
      return 'demo-container-col';
    },
    productDescription() {
      const descriptions = {
        MOVEMENTS: 'Accede a los movimientos bancarios históricos de tus usuarios. Los datos transaccionales pueden ser útiles para una cantidad infinita de aplicaciones, como la gestión de finanzas personales, informes de gastos, conciliación bancaria, flujo de efectivo, análisis de riesgo y más.',
        SUBSCRIPTION: 'Genera pagos recurrentes con el banco. Las suscripciones permiten que tus usuarios puedan realizar pagos recurrentes dentro de tu aplicación.',
        PAYMENTS: 'Permite a tus usuarios transferir o cobrar dinero entre cuentas bancarias chilenas desde tu aplicación.',
        REFRESH_INTENT: 'Genera actualizaciones on-demand de Links que ya están conectados a Fintoc y ve sus resultados. Recuerda que no es necesario utilizar recursos para consultar la API de Fintoc constantemente. A través de nuestro sistema de webhook, podemos avisar cada vez que se actualice una cuenta con los últimos movimientos disponibles en el banco.',
        TAX_RETURNS: 'Verifica rápidamente los ingresos y las capacidades financieras de tus usuarios. En Chile, el formulario de declaración anual de impuestos corresponde al formulario F22.',
        TAX_STATEMENTS: 'Accede a las declaraciones de impuestos mensuales y obtén detalles específicos sobre el historial de ingresos y las capacidades financieras de tus usuarios. En Chile, el formulario de declaración mensual de impuestos corresponde al formulario F29.',
        // INCOME: 'Receive Sii income documents like Boleta de Honorarios.',
        INVOICES: 'Accede a los registros de compra y venta de tus usuarios.',
      };
      return descriptions[this.selectedProduct.product];
    },
    productResponseJSON() {
      const jsons = {
        MOVEMENTS: '{\n    "id": "mov_BO381oEATXonG6bj",\n    "object": "movement",\n    "amount": 59400,\n    "post_date": "2020-04-17T00:00:00.000Z",\n    "description": "Traspaso de:Fintoc SpA",\n    "transaction_date": "2020-04-16T11:31:12.000Z",\n    "currency": "CLP",\n    "reference_id": "123740123",\n    "type": "transfer",\n    "pending": false,\n    "recipient_account": null,\n    "sender_account": {\n        "holder_id": "771806538",\n        "holder_name": "Comercial y Producción SpA",\n        "number": "1530108000",\n        "institution": {\n          "id": "cl_banco_de_chile",\n          "name": "Banco de Chile",\n          "country": "cl"\n        }\n    },\n    "comment": "Pago factura 198"\n}',
        SUBSCRIPTION: '{\n    "id": "sub_n3WxkLAoC3k1l0wO",\n    "object": "subscription",\n    "amount_limit": null,\n    "customer_id": "111111111",\n    "account_id": "acc_3g9Lo1MTWKxoOP8r",\n    "created_at": "2021-07-09T01:42:41.197Z",\n    "active": true\n}',
        PAYMENTS: '{\n  "id": "pi_BO381oEATXonG6bj",\n  "object": "payment_intent",\n  "amount": 1000,\n  "currency": "CLP",\n  "widget_token": "pi_BO381oEATXonG6bj_sec_a4xK32BanKWYn",\n  "status": "created",\n  "reference_id": "90123712",\n  "transaction_date": "2021-10-15T15:24:15.474Z",\n  "mode": "live",\n  "recipient_account": {\n    "holder_id": "183917137",\n    "number": "123456",\n    "type": "checking_account",\n    "institution_id": "cl_banco_de_chile"\n  },\n  "sender_account": {\n    "holder_id": "192769065",\n    "number": "123456",\n    "type": "checking_account",\n    "institution_id": "cl_banco_estado"\n  },\n  "created_at": "2021-10-15T15:23:11.474Z",\n}',
        REFRESH_INTENT: '{\n    "id": "mov_BO381oEATXonG6bj",\n    "object": "movement",\n    "amount": 59400,\n    "post_date": "2020-04-17T00:00:00.000Z",\n    "description": "Traspaso de:Fintoc SpA",\n    "transaction_date": "2020-04-16T11:31:12.000Z",\n    "currency": "CLP",\n    "reference_id": "123740123",\n    "type": "transfer",\n    "pending": false,\n    "recipient_account": null,\n    "sender_account": {\n        "holder_id": "771806538",\n        "holder_name": "Comercial y Producción SpA",\n        "number": "1530108000",\n        "institution": {\n          "id": "cl_banco_de_chile",\n          "name": "Banco de Chile",\n          "country": "cl"\n        }\n    },\n    "comment": "Pago factura 198"\n}',
        TAX_RETURNS: '"{\n  "id": "taxret_nMNejK7BT8oGbvO4",\n  "object": "tax_return",\n  "institution_id": "cl_fiscal_sii",\n  "interval_unit": "annual",\n  "period": "2021",\n  "fiscal_year": "2021",\n  "currency": "CLP",\n  "document_number": "12345",\n  "taxpayer": {\n    "id": "777777777",\n    "name": "Fintoc SpA",\n    "institution_tax_payer": {\n      "phone": "999999999",\n      "email": "hello@fintoc.com",\n      "addresses": [\n        {\n          "city": "Santiago",\n          "code": "84345463",\n          "type": "DOMICILIO",\n          "number": "2461",\n          "region": "REGION METROPOLITANA",\n          "street": "LOS CONQUISTADORES",\n          "commune": "PROVIDENCIA",\n          "apartment": null\n        }\n      ],\n      "activities": [\n        {\n          "iva": false,\n          "code": "0123",\n          "category": "1",\n          "started_at": "2020-04-16T04:00:00.000Z",\n          "description": "Servicios de tecnología"\n        }\n      ],\n      "authorized_documents": [\n        {\n          "code": "33",\n          "description": "FACTURA ELECTRONICA",\n          "authorized_at": "2021-11-30T15:57:38.584Z",\n          "max_documents": 414\n        }\n      ]\n    }\n  },\n    "institution_tax_return": {\n    "refund_account": {\n      "holder_id": "117056856",\n      "holder_name": "Erlich Bachman",\n      "number": "123123123",\n      "institution": {\n        "id": "cl_banco_de_chile",\n        "name": "Banco de Chile",\n        "country": "cl"\n      }\n    },\n    "refund_amount": 1000,\n    "due_amount": 0,\n    "income": {\n      "fees_with_retention": 234212,\n      "withheld_fees": 42341,\n      "fees_without_retention": 512334,\n      "fees": 13123,\n      "salary": 2313123,\n    },\n  }\n}"',
        TAX_STATEMENTS: '"{\n  "id": "taxstmt_000000000",\n  "fiscal_year": 2021,\n  "document_number": "123456",\n  "period": "10",\n  "status": "Vigente",\n  "object": "tax_statement",\n  "currency": "CLP",\n  "institution_id": "cl_fiscal_sii",\n  "interval_unit": "monthly",\n  "institution_tax_statement": {\n    "total_payment": 2646845,\n    "total_debit": 1173692,\n    "total_credit": 403497,\n    "retention_fee": 6497,\n    "salary_tax": 1870153,\n    "monthly_provisional_payments": null\n    },\n  "taxpayer": {\n    "id": "777777777",\n    "name": "Fintoc SpA",\n    "institution_tax_payer": {\n      "phone": "999999999",\n      "email": "hello@fintoc.com",\n      "addresses": [\n        {\n          "city": "Santiago",\n          "code": "84345463",\n          "type": "DOMICILIO",\n          "number": "2461",\n          "region": "REGION METROPOLITANA",\n          "street": "LOS CONQUISTADORES",\n          "commune": "PROVIDENCIA",\n          "apartment": null\n        }\n      ],\n      "activities": [\n        {\n          "iva": false,\n          "code": "0123",\n          "category": "1",\n          "started_at": "2020-04-16T04:00:00.000Z",\n          "description": "Servicios de tecnología"\n        }\n      ],\n      "authorized_documents": [\n        {\n          "code": "33",\n          "description": "FACTURA ELECTRONICA",\n          "authorized_at": "2021-11-30T15:57:38.584Z",\n          "max_documents": 414\n        }\n      ]\n    }\n  }\n}"',
        INVOICES: '"{\n    "id": "inv_nMNejK7BT8oGbvO4",\n    "object": "invoice",\n    "number": "135",\n    "institution_id": "cl_fiscal_sii",\n    "issuer": {\n        "id": "117056856",\n        "name": "Hooli SpA",\n        "institution_tax_payer": null\n    },\n    "receiver": null,\n    "issue_type": "received",\n    "date": "2021-06-25T04:00:00.000Z",\n    "total_amount": 12123,\n    "net_amount": 12000,\n    "currency": "CLP",\n    "tax_period": "06/2021",\n    "institution_invoice": {\n        "received_at": "2021-06-25T19:27:04.000Z",\n        "accepted_at": null,\n        "confirmation_status": null,\n        "exempt_amount": 0,\n        "document_type": 34,\n        "total_documents": null,\n        "vat_amount": 123,\n        "fixed_assets_net_amount": null,\n        "fixed_assets_vat_amount": null,\n        "non_refundable_vat_amount": null,\n        "non_refundable_vat_code": null,\n        "non_credit_tax_amount": null,\n        "total_vat_withheld": 0,\n        "partial_vat_withheld": 0,\n        "non_withheld_vat": 0,\n        "own_vat": 0,\n        "third_party_vat": 0,\n        "common_use_vat": null,\n        "out_of_time_vat": 0,\n        "reference_type_code": null,\n        "reference_number": null,\n        "construction_company_credit": 0,\n        "free_zone_tax": 0,\n        "container_deposit_guarantee": 0,\n        "domestic_ticket_sales": 0,\n        "international_ticket_sales": 0,\n        "receipt_reference_number": null,\n        "settlement_issuer_id": null,\n        "vat_commisions": null,\n        "net_commissions": 0,\n        "exempt_commissions": 0,\n        "has_note": false,\n        "is_services_invoice": false,\n        "services_invoice": null,\n        "transaction_category": "Del Giro",\n        "invoice_status": \'registered\',\n        "other_taxes": {\n            "total_amount": 400,\n            "other_taxes_detail": [\n                {\n                    "tax_code": 14,\n                    "tax_rate": "19",\n                    "tax_amount": 400\n                }\n            ]\n        },\n        "tobacco_taxes": {\n            "cigars": 0,\n            "cigarettes": 0,\n            "processed_tobacco": 0\n        }\n    }\n}"',
      };
      return jsons[this.selectedProduct.product];
    },
    moreInfoUrl() {
      const urls = {
        MOVEMENTS: 'https://docs.fintoc.com/docs/movements-walkthrough',
        SUBSCRIPTION: 'https://docs.fintoc.com/docs/subscriptions-walkthrough',
        PAYMENTS: 'https://docs.fintoc.com/docs/payment-intents-walkthrough',
        REFRESH_INTENT: 'https://docs.fintoc.com/reference/refresh-intents',
        TAX_RETURNS: 'https://docs.fintoc.com/docs/tax-returns-walkthrough',
        TAX_STATEMENTS: 'https://docs.fintoc.com/docs/tax-statements-walkthrough',
        INVOICES: 'https://docs.fintoc.com/docs/invoices-walkthrough',
      };
      return urls[this.selectedProduct.product];
    },
    products() {
      if (this.selectedCountry.countryCode === 'cl') {
        if (this.selectedAPI === 'Banking API') {
          return [this.movements, this.subscription, this.payments, this.refreshIntent];
        }
        if (this.selectedAPI === 'Fiscal API') {
          return [this.invoices, this.taxReturns, this.taxStatements];
        }
      }
      if (this.selectedCountry.countryCode === 'mx') {
        if (this.selectedAPI === 'Banking API') {
          return [this.movements, this.refreshIntent];
        }
        if (this.selectedAPI === 'Fiscal API') {
          return [this.invoices];
        }
      }
      return '';
    },
    widgetOptions() {
      if (this.selectedMode.mode === 'live') {
        return {
          publicKey: this.publicKey,
          holderType: 'individual',
          product: this.selectedProduct.product,
          country: this.selectedCountry.countryCode,
          webhookUrl: 'https://hola.fintoc.com',
          widgetToken: this.widgetToken,
        };
      }
      return {
        publicKey: this.publicKey,
        holderType: 'individual',
        product: this.selectedProduct.product,
        country: this.selectedCountry.countryCode,
        webhookUrl: 'https://hola.fintoc.com',
        username: this.sandboxUsername,
        widgetToken: this.widgetToken,
      };
    },
    formHeaders() {
      return this.$store.getters.authHeaders;
    },
    isOnboarding() {
      return this.$route.path === '/onboarding';
    },
    title() {
      if (this.$route.path === '/onboarding') {
        return 'Conecta tu primera cuenta';
      }
      return 'Fintoc Demo';
    },
    buttonTitle() {
      if (this.$route.path === '/onboarding') {
        return 'Conectar cuenta';
      }
      return 'Abrir Demo';
    },
    sandboxUsername() {
      if (this.selectedCountry.countryCode === 'mx') {
        return '4242424242424242';
      }
      return '416148503';
    },
    isDemoPage() {
      return this.$route.path === '/demo';
    },
    isOnboardingPage() {
      return this.$route.path === '/onboarding';
    },
    isDemoLaunchDisabled() {
      return this.selectedProduct.disabledForSandbox[this.selectedCountry.countryCode];
    },
  },
  methods: {
    ...mapActions(['setOnboardingLink', 'fetchApiKeys', 'setEnvironmentMode', 'setLinkId']),
    async onLinkCreated(linkId) {
      const linkResponse = await apiClient.links.regenerateLinkToken(linkId, this.formHeaders);
      const { linkToken } = linkResponse.data;
      this.setOnboardingLink({ linkToken, mode: this.mode });
    },
    onSuccess(response) {
      if (this.isOnboardingPage) {
        const linkId = response.id;
        this.setLinkId({ linkId });
        this.onLinkCreated(linkId);
        this.$emit('next');
      }
    },
    onExit() {
      this.widget.destroy();
      this.widgetToken = null;
    },
    onEvent() {
    },
    async launchDemo() {
      if (this.isDemoPage) {
        this.setEnvironmentMode('test');
      } else {
        this.setEnvironmentMode(this.selectedMode);
      }

      if (this.isOnboardingPage) {
        await this.fetchApiKeys();
      }

      if (this.selectedProduct.product === products.PAYMENTS) {
        await this.createWidgetToken();
      }
      const params = {
        ...this.widgetOptions,
        onSuccess: this.onSuccess,
        onExit: this.onExit,
        onEvent: this.onEvent,
      };
      this.widget = window.Fintoc.create(params);
      this.widget.open();
    },
    handleChangeAPI() {
      if (this.selectedAPI === 'Banking API') {
        this.selectedProduct = this.movements;
      }
      if (this.selectedAPI === 'Fiscal API') {
        this.selectedProduct = this.invoices;
      }
    },
    async createWidgetToken() {
      const headers = { Authorization: this.secretKey };
      if (this.selectedProduct.product === products.PAYMENTS) {
        const requestBody = {
          amount: '5000',
          currency: 'clp',
          recipient_account: {
            holder_id: '416148503',
            institution_id: 'cl_banco_de_chile',
            number: '12345678',
            type: 'sight_account',
          },
        };
        const response = await apiClient.payments.createPaymentIntent(headers,
          requestBody);
        this.widgetToken = response.data.widgetToken;
      }
    },
  },
  mounted() {
    const recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', 'https://js.fintoc.com/v1/');
    document.head.appendChild(recaptchaScript);

    window.onresize = () => {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    };
  },
  created() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  },
};
</script>

<style>
.demo {
  display: flex;
  position: relative;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  padding: 50px 40px;
}

.demo-container {
  max-width: 1000px;
  align-items: center;
  justify-items: center;
}

.demo-container-row {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
}

.h-500 {
  height: 500px;
}

.demo-container-col {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  align-items: center;
}

.demo-container-left {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 500px;
  min-width: 300px;
}

.max-w-500 {
  max-width: 500px;
}

.demo-title {
  font-size: 36px;
  font-weight: 600;
  color: #0e0946;
  align-items: center;
  align-content: center;
  justify-content: space-around;
}

.demo-subtitle {
  font-size: 18px;
  font-weight: 300;
  color: #4A4672;
}

.demo-dropdown {
  font-size: 16px;
  width: 100%;
  padding: 14px 8px;
  border-radius: 6px;
  filter: drop-shadow(0px 2px 9px rgba(55, 82, 255, 0.07))
  drop-shadow(0px 1px 0px rgba(55, 82, 255, 0.05));
  background-color: white;
  font-size: 16px;
  outline: none;
}

.demo-button {
  background-color: #f2f4ff;
  color: #3753ff;
  font-weight: 600;
  padding: 14px 12px;
  border-radius: 6px;
  filter: drop-shadow(0px 2px 9px rgba(0, 0, 0, 0.07)) drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.05));
}

.demo-button:hover {
  background-color: #3753ff;
  color: #f2f4ff;
  font-weight: 600;
  padding: 14px 12px;
  border-radius: 6px;
  filter: drop-shadow(0px 2px 9px rgba(0, 0, 0, 0.07)) drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.05));
}

.demo-button:disabled {
  color: #B6B5C2;
  background: #F5F5F8;
  filter: drop-shadow(0px 2px 9px rgba(0, 0, 0, 0.07)) drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.05));
}

.demo-widget-size {
  position: relative;
  display: flex;
  width: 240px;
  height: 100%;
  margin-left: 30px;
}

.demo-container-right {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
}

.product-title {
  font-size: 20px;
  font-weight: 500;
}

.product-description {
  font-size: 16px;
  font-weight: 300;
}

.tab-bar {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.tab-json {
  background-color: #F6F8FA;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 6px 0px 0px 0px;
}

.empty-space {
  width: 100%;
  background-color: #EBEDEF;
  border-radius: 0px 6px 0px 0px;
}

.product-sample-response {
  font-size: 12px;
  font-weight: 400;
  max-height: 200px;
  overflow-y: scroll;
  width: 100%;
  background-color: #F6F8FA;
  border-radius: 0px 6px 0px 6px;
}

.sample-response-title {
  text-align: left;
  margin-top: 30px;
  width: 100%;
}

.code {
  border-radius: 6px;
  margin-top: 8px;
  width: 100%;
}

.highlight-title {
  background-image: linear-gradient(150deg, #5f7ef6, #3753ff);
  color: #3753ff;
  font-size: 11px;
  font-weight: 600;
  text-align: left;
  letter-spacing: 1px;
  text-transform: uppercase;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

a {
  color: #3753ff;
  text-decoration: underline;
}

select:disabled {
  color: #B6B5C2;
  background: #F5F5F8;
  filter: drop-shadow(0px 2px 9px rgba(0, 0, 0, 0.07)) drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.05));
}

</style>
