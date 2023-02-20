const mercadopago = require('mercadopago');
const dotenv = require('dotenv');
dotenv.config();

const mp = async (items, coutes, shipping) => {
  try {
    mercadopago.configure({
      access_token: process.env.MERCADO_LIBRE_ACCESS_TOKEN,
    });

    let config = {
      items: items,
      back_urls: {
        success: 'http://localhost:8080/api/v1/checkout/feedback',
        failure: 'http://localhost:8080/api/v1/checkout/feedback',
        pending: 'http://localhost:8080/api/v1/checkout/feedback',
      },
      payment_method: {
        installment: coutes,
      },
      auto_return: 'approved',
      shipemnts: {
        cost: shipping,
        mode: 'not_specified',
      },
      statement_descriptor: 'Baterias Bernal',
    };

    let preferences = await mercadopago.preferences.create(config);

    return preferences;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mp;
