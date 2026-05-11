const pool = require("../../databasePool");

class partnerCrossRoadTable {
  static addCargoAdmin({
    aFirstname,
    aLastname,
    aPhone_number,
    aEmail,
    password,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO accounts (
            role_id,
            firstname,
            lastname,
            phone_number,
            email,
            password
          ) VALUES (3, $1, $2, $3, $4, $5)
          RETURNING id`,
        [aFirstname, aLastname, aPhone_number, aEmail, password],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ adminID: response.rows[0].id });
          }
        }
      );
    });
  }
  static updateCargoAdmin({
    admin_id,
    firstname,
    lastname,
    phone_number,
    admin_email,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE accounts SET
            firstname = $2,
            lastname = $3,
            phone_number = $4,
            email = $5
          WHERE id = $1`,
        [admin_id, firstname, lastname, phone_number, admin_email],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }

  static insert({
    adminID,
    insurance,
    head_number,
    ass_number,
    trans_mark,
    storage,
    ass_length,
    ass_width,
    start_zone,
    passed_zone,
    end_zone,
    transIMG,
    addition,
    trans_type,
    tonnage,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO partner_cross_road (
            cargo_admin_id,
            insurance,
            head_number,
            ass_number,
            trans_mark,
            storage,
            ass_length,
            ass_width,
            start_zone,
            passed_zone,
            end_zone,
            trans_image,
            addition,
            trans_type,
            tonnage,
            signed_date
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW())`,
        [
          adminID,
          insurance,
          head_number,
          ass_number,
          trans_mark,
          storage,
          ass_length,
          ass_width,
          start_zone,
          passed_zone,
          end_zone,
          transIMG,
          addition,
          trans_type,
          tonnage,
        ],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }
  static update({
    id,
    insurance,
    head_number,
    ass_number,
    trans_mark,
    storage,
    ass_length,
    ass_width,
    start_zone,
    passed_zone,
    end_zone,
    transIMG,
    addition,
    trans_type,
    tonnage,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE partner_cross_road SET
            insurance = $2,
            head_number = $3,
            ass_number = $4,
            trans_mark = $5,
            storage = $6,
            ass_length = $7,
            ass_width = $8,
            start_zone = $9,
            passed_zone = $10,
            end_zone = $11,
            trans_image = $12,
            addition = $13,
            trans_type = $14,
            tonnage = $15
          WHERE id = $1`,
        [
          id,
          insurance,
          head_number,
          ass_number,
          trans_mark,
          storage,
          ass_length,
          ass_width,
          start_zone,
          passed_zone,
          end_zone,
          transIMG,
          addition,
          trans_type,
          tonnage,
        ],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }

  static getRequestedAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM partner_cross_road
          WHERE confirm IS NOT TRUE
          ORDER BY id DESC`,
        [],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve(response.rows);
          }
        }
      );
    });
  }

  static getConfirmedAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM partner_cross_road
          WHERE confirm = TRUE
          ORDER BY id DESC`,
        [],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve(response.rows);
          }
        }
      );
    });
  }

  static getByID({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT 
            a.firstname,
            a.lastname,
            a.phone_number,
            a.email AS admin_email,
            p.*
          FROM partner_cross_road p
            INNER JOIN accounts a ON p.cargo_admin_id = a.id
          WHERE p.id = $1`,
        [id],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve(response.rows[0]);
          }
        }
      );
    });
  }

  static getByAdminID({ adminID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM partner_cross_road
          WHERE cargo_admin_id = $1`,
        [adminID],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve(response.rows[0]);
          }
        }
      );
    });
  }

  static getByCargoAdminID({ adminID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM partner_cross_road
          WHERE cargo_admin_id = $1`,
        [adminID],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve(response.rows[0]);
          }
        }
      );
    });
  }

  static partnerConfirm({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE partner_cross_road SET
            confirm = TRUE
          WHERE id = $1`,
        [id],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }

  static uploadCompanyPDF({ adminID, pdf }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE partner_cross_road SET profile_file = $2
          WHERE cargo_admin_id = $1`,
        [adminID, pdf],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }
  static removeCompanyPDF({ adminID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE partner_cross_road SET profile_file = NULL
          WHERE cargo_admin_id = $1`,
        [adminID],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }

  static delete({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM partner_cross_road
          WHERE id = $1`,
        [id],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }
}

module.exports = partnerCrossRoadTable;
