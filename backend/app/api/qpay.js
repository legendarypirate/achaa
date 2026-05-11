const { Router } = require("express");
const axios = require("axios");

const router = new Router();

const getToken = () => {
  const baseURL = "https://merchant.qpay.mn/v2/auth/token";
  const username = "E_ACHAA";
  const password = "3FfeLJqg";

  const authData = Buffer.from(`${username}:${password}`, "utf8").toString(
    "base64"
  );

  return new Promise((resolve, reject) => {
    axios
      .post(
        baseURL,
        {},
        {
          headers: {
            Authorization: `Basic ${authData}`,
          },
        }
      )
      .then((response) => {
        resolve(response.data.access_token);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createInvoice = (token, price, invoiceDescription) => {
  const baseURL = "https://merchant.qpay.mn/v2/invoice";

  const bodyParameters = {
    invoice_code: "E_ACHAA_INVOICE",
    sender_invoice_no: "1234567",
    invoice_description: invoiceDescription,
    invoice_receiver_code: "terminal",
    amount: price,
    callback_url:
      "http://103.119.92.73/backend/pay/callback?invoice_id=1234567",
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .post(baseURL, bodyParameters, config)
      .then((res) => {
        console.log("INVOICE:", res.data);
        resolve({ token: token, invoiceData: res.data });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const checkPayment = (token, invoiceId) => {
  const baseURL = "https://merchant.qpay.mn/v2/payment/check";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const bodyParameters = {
    object_type: "INVOICE",
    object_id: invoiceId,
    offset: {
      page_number: 1,
      page_limit: 100,
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .post(baseURL, bodyParameters, config)
      .then((response) => {
        console.log("Payment info:", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

router.post("/checkout", (req, res) => {
  const { price, invoiceDescription } = req.body;

  getToken()
    .then((token) => {
      return createInvoice(token, price, invoiceDescription);
    })
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/checkPayment", (req, res) => {
  const { token, invoiceId } = req.body;

  checkPayment(token, invoiceId)
    .then((paymentData) => {
      console.log("Check payment:", paymentData);
      res.send({ paymentStatus: paymentData.rows[0].payment_status });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/callback", (req, res) => {
  const invoiceID = req.query.invoice_id;

  getToken()
    .then((token) => {
      checkPayment(token, invoiceID)
        .then((paymentData) => {
          res.send(paymentData);
        })
        .catch((error) => {
          res.send(error);
        });
    })
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
