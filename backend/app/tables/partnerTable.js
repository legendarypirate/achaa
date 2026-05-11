const pool = require("../../databasePool");

class partnerTable {
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

  static insertSub({
    company_register,
    address,
    certificate_date,
    cerIMG,
    trans_number,
    transIMG,
    start_zone,
    passed_zone,
    end_zone,
    online_storage,
    online_activity,
    air_pack_type,
    admin_position,
    air_trans_company,
    trans_type,
    suggest_service,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO partner_sub_info (
            company_register,
            address,
            certificate_date,
            certificate_image,
            trans_number,
            trans_image,
            start_zone,
            passed_zone,
            end_zone,
            online_storage,
            online_activity,
            air_pack_type,
            admin_position,
            air_trans_company,
            trans_type,
            suggest_service
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
          RETURNING id`,
        [
          company_register,
          address,
          certificate_date,
          cerIMG,
          trans_number,
          transIMG,
          start_zone,
          passed_zone,
          end_zone,
          online_storage,
          online_activity,
          air_pack_type,
          admin_position,
          air_trans_company,
          trans_type,
          suggest_service,
        ],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ subInfoID: response.rows[0].id });
          }
        }
      );
    });
  }
  static updateSub({
    sub_info_id,
    company_register,
    address,
    certificate_date,
    cerIMG,
    trans_number,
    transIMG,
    start_zone,
    passed_zone,
    end_zone,
    online_storage,
    online_activity,
    air_pack_type,
    admin_position,
    air_trans_company,
    trans_type,
    suggest_service,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE partner_sub_info SET
            company_register = $2,
            address = $3,
            certificate_date = $4,
            certificate_image = $5,
            trans_number = $6,
            trans_image = $7,
            start_zone = $8,
            passed_zone = $9,
            end_zone = $10,
            online_storage = $11,
            online_activity = $12,
            air_pack_type = $13,
            admin_position = $14,
            air_trans_company = $15,
            trans_type = $16,
            suggest_service = $17
          WHERE id = $1`,
        [
          sub_info_id,
          company_register,
          address,
          certificate_date,
          cerIMG,
          trans_number,
          transIMG,
          start_zone,
          passed_zone,
          end_zone,
          online_storage,
          online_activity,
          air_pack_type,
          admin_position,
          air_trans_company,
          trans_type,
          suggest_service,
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

  static insert({
    adminID,
    subInfoID,
    express_type_id,
    name,
    email,
    phone,
    web,
    addition,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO partner (
            cargo_admin_id,
            sub_info_id,
            express_type_id,
            name,
            email,
            phone,
            web,
            addition,
            signed_date
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
          RETURNING id`,
        [
          adminID,
          subInfoID,
          express_type_id,
          name,
          email,
          phone,
          web,
          addition,
        ],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ companyID: response.rows[0].id });
          }
        }
      );
    });
  }
  static update({ id, name, email, phone, web, addition }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE partner SET
            name = $2,
            email = $3,
            phone = $4,
            web = $5,
            addition = $6
          WHERE id = $1`,
        [id, name, email, phone, web, addition],
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

  static getRequestedAll({ eTypeID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM partner
          WHERE express_type_id = $1 AND confirm IS NOT TRUE
          ORDER BY id DESC`,
        [eTypeID],
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
        `SELECT * FROM partner
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
            p.id AS main_id,
            p.*,
            et.express_type,
            s.*
          FROM partner p
            INNER JOIN accounts a ON p.cargo_admin_id = a.id
            INNER JOIN partner_express_type et ON p.express_type_id = et.id
            INNER JOIN partner_sub_info s ON p.sub_info_id = s.id
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

  static getByCargoAdminID({ adminID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT p.*, et.express_type FROM partner p
          INNER JOIN partner_express_type et ON p.express_type_id = et.id
          WHERE p.cargo_admin_id = $1`,
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

  static getExpressType() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM partner_express_type
          ORDER BY id ASC`,
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

  static partnerConfirm({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE partner SET
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
        `UPDATE partner SET profile_file = $2
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
        `UPDATE partner SET profile_file = NULL
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

  static deleteSubInfo({ subInfoID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM partner_sub_info
          WHERE id = $1`,
        [subInfoID],
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
        `DELETE FROM partner
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

module.exports = partnerTable;
