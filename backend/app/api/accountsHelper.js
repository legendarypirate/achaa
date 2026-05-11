const SHA256 = require("crypto-js/sha256");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../../secrets");
const AccountsTable = require("../tables/accountsTable");

const hash = (string) => {
  return SHA256(`${APP_SECRET}${string}${APP_SECRET}`).toString();
};

const setToken = ({ id, roleID, email, password, res }) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign({ roleID, email, password }, APP_SECRET, {
      expiresIn: 3600,
    });

    res.json({
      expiresIn: 3600,
      id,
      roleID,
      token,
    });

    resolve({ token: token });
  });
};

const authenticateAccount = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      const error = new Error("Invalid token");
      error.statusCode = 400;

      return reject(error);
    } else {
      const { email, password } = jwt.decode(token, APP_SECRET);

      let isAuthenticated = false;

      AccountsTable.getByEmail({ email })
        .then(({ user }) => {
          if (user && user.password === password) {
            isAuthenticated = true;
          }

          resolve({ user, isAuthenticated });
        })
        .catch((error) => reject(error));
    }
  });
};

module.exports = {
  hash,
  setToken,
  authenticateAccount,
};
