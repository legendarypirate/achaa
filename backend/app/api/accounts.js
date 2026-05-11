const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../../secrets");
const { hash, setToken, authenticateAccount } = require("./accountsHelper");
const { URL } = require("../url");
const AccountsTable = require("../tables/accountsTable");

const router = new Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../assets"));
  },
  filename: function (req, file, cb) {
    cb(null, "avatar-" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
  limits: { fieldSize: 2 * 1024 * 1024 },
});

router.post("/signup", upload.single("imageFile"), (req, res, next) => {
  const { membership, firstname, lastname, phone_number, email, password } =
    req.body;

  let user_code = Math.floor(100000 + Math.random() * 999999);
  let image = null;

  if (req.file) {
    image = URL + "/static/" + req.file.filename;
  } else {
    image = req.body.image;
  }

  AccountsTable.getByEmail({ email })
    .then(({ user }) => {
      if (user) {
        res.json({
          error: 409,
          message: "Бүртгэгдсэн цахим шуудан байна!",
        });

        throw new Error("Бүртгэгдсэн цахим шуудан");
      } else {
        AccountsTable.checkUserCode({ user_code })
          .then(({ code }) => {
            if (code === user_code) {
              user_code = Math.floor(100000 + Math.random() * 999999);
            }

            AccountsTable.signup({
              user_code,
              membership: membership === "0" ? null : membership,
              firstname,
              lastname,
              phone_number,
              email,
              password: hash(password),
              image,
            })
              .then(({ message }) => {
                res.json({ message });
              })
              .catch((error) => next(error));
          })
          .catch((ERROR) => next(ERROR));
      }
    })
    .catch((error) => next(error));
});

router.post("/update", upload.single("imageFile"), (req, res, next) => {
  const { id, membership, firstname, lastname, phone_number, email } = req.body;

  let image = null;
  if (req.file) {
    image = URL + "/static/" + req.file.filename;
  } else {
    image = req.body.image;
  }

  if (membership === "0") {
    AccountsTable.finishExpired({ userID: id })
      .then(({ message }) => {
        res.json({ message });
      })
      .catch((error) => next(error));
  } else {
    let expiredDay = 0;
    if (membership === "1") {
      expiredDay = 30;
    } else {
      expiredDay = 365;
    }

    AccountsTable.memberConfirm({ id, expiredDay })
      .then(({ message }) => {
        res.json({ message });
      })
      .catch((error) => next(error));
  }

  AccountsTable.update({
    id,
    membership: membership === "0" ? null : membership,
    firstname,
    lastname,
    phone_number,
    email,
    image,
  })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  const passwordHash = hash(password);

  AccountsTable.getByEmail({ email })
    .then(({ user }) => {
      if (user) {
        if (user.password === passwordHash) {
          return setToken({
            id: user.id,
            roleID: user.role_id,
            email: user.email,
            password: user.password,
            res,
          });
        } else {
          res.json({
            error: 409,
            message: "Нууц үг буруу байна!",
          });

          throw new Error("Буруу нууц үг");
        }
      } else {
        res.json({
          error: 409,
          message: "Цахим шуудан буруу байна!",
        });

        throw new Error("Буруу цахим шуудан");
      }
    })
    .then(({ message }) => res.json({ message }))
    .catch((error) => next(error));
});

router.get("/:roleID/getAll", (req, res, next) => {
  const { roleID } = req.params;

  AccountsTable.getAll({ roleID })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/getByID/:id", (req, res, next) => {
  const { id } = req.params;

  AccountsTable.getByID({ id })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.post("/selectingMembership", (req, res, next) => {
  const { id, membership } = req.body;

  AccountsTable.selectingMembership({ id, membership })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.post("/memberConfirm", (req, res, next) => {
  const { id } = req.body;

  AccountsTable.getByID({ id })
    .then((response) => {
      const { membership } = response;

      let expiredDay = 0;
      if (membership === 1) {
        expiredDay = 30;
      } else {
        expiredDay = 365;
      }

      AccountsTable.memberConfirm({ id, expiredDay })
        .then(({ message }) => {
          res.json({ message });
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

router.post("/finishExpired", (req, res, next) => {
  const { userID } = req.body;

  AccountsTable.finishExpired({ userID })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params;

  AccountsTable.delete({ id })
    .then(({ message }) => res.json({ message }))
    .catch((error) => next(error));
});

router.get("/authenticate", (req, res, next) => {
  const patt = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

  if (patt.test(req.headers.token)) {
    authenticateAccount(req.headers.token)
      .then(({ user, isAuthenticated }) => {
        if (isAuthenticated) {
          res.json({ user, isAuthenticated });
        } else {
          res.json({
            error: 409,
            message: "Баталгаажуулалт буруу байна",
          });
        }
      })
      .catch((error) => next(error));
  } else {
    res.json({
      error: 404,
      message: "Системд алдаа гарсан",
    });
  }
});

router.post("/forgotPassword", (req, res, next) => {
  const { email } = req.body;
  const secretCode = Math.floor(100000 + Math.random() * 999999);

  AccountsTable.getByEmail({ email })
    .then(({ user }) => {
      if (user) {
        const token = jwt.sign({ id: user.id, secretCode }, APP_SECRET);

        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "eachaa.web@gmail.com",
            pass: "pephelfjysmzhwvt",
          },
        });

        let mailOptions = {
          from: "eachaa.web@gmail.com",
          to: email,
          subject: "E-Achaa [Нууц үг сэргээх]",
          text:
            "Сайн байна уу?\n" +
            "Танд нууц үг сэргээх код илгээж байна. Нууц үг сэргээх линкээр орж нууц үгээ сэргээнэ үү.\n\n" +
            `Код: ${secretCode}\n` +
            "Нууц үг сэргээх линк: https://e-achaa.mn/recover-password/" +
            token,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("ERROR of mail: ", error);

            res.json({
              error: 409,
              message: "Алдаа!",
            });
          } else {
            console.log("Email sent: " + info.response);
            res.json({ message: "success" });
          }
        });
      } else {
        res.json({
          error: 409,
          message: "Бүртгэлгүй цахим шуудан байна!",
        });

        throw new Error("Бүртгэлгүй цахим шуудан");
      }
    })
    .catch((error) => next(error));
});

router.post("/recoverPassword", (req, res, next) => {
  const { token, mailCode, password } = req.body;

  const { id, secretCode } = jwt.decode(token, APP_SECRET);
  const passwordHash = hash(password);

  if (String(secretCode) === String(mailCode)) {
    AccountsTable.recoverPassword({ id, passwordHash })
      .then(({ message }) => {
        res.json({ message });
      })
      .catch((error) => next(error));
  } else {
    res.json({
      error: 409,
      message: "Цахим шууданд ирсэн код буруу байна!",
    });
  }
});

module.exports = router;
