const mp = require('../../config/mpConfig');

module.exports = {
  process: async (req, res) => {
    try {
      let itemsCart = req.body.map((item) => {
        return {
          id: item.id,
          title: item.name,
          unit_price: Number(item.price),
          quantity: Number(item.quantity),
          currency_id: 'ARS',
        };
      });
      let link = await mp(itemsCart,12, 0);
      link = link.body.init_point;
      return res.send({link});
    } catch (error) {
      console.log(error.message);
    }
  },
  feedback: (req, res) => {
    res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id,
    });
  },
};
