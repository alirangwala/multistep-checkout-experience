const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'checkout'
})

connection.connect();

// 3 post requests, 1 for each form/table
createCustomer = (callback, name, email, password) =>{
  var sql = 'INSERT INTO customer (name, email, password) VALUES (?, ?, ?);'
  connection.query(sql, [name, email, password], (error, results, fields) => {
    if (error) {
      throw error
    }
    callback(results)
  })
};

createAddress = (callback, customer_id, address_line_1, address_line_2, city, state, zipcode, phone) =>{
  var sql = 'INSERT INTO address (customer_id, address_line_1, address_line_2, city, state, zipcode, phone) \
  VALUES (?, ?, ?, ?, ?, ?, ?);'
  connection.query(sql, [customer_id, address_line_1, address_line_2, city, state, zipcode, phone], (error, results, fields) => {
    if (error) {
      throw error
    }
    callback(results)
  })
};

createCard = (callback, customer_id, credit_card_number, expiry_date, cvv, billing_zipcode) =>{
  var sql = 'INSERT INTO credit_card (customer_id, credit_card_number, expiry_date, cvv, billing_zipcode) \
    VALUES (?, ?, ?, ?, ?);'
  connection.query(sql, [customer_id, credit_card_number, expiry_date, cvv, billing_zipcode], (error, results, fields) => {
    if (error) {
      throw error
    }
    callback(results)
  })
};

// 1 get request, all the data for that customer (join three tables)
viewCustomer = (callback) => {
  var sql = 'SElECT A.name, A.email, B.address_line_1, B.address_line_2, B.city, B.state, B.zipcode, B.phone, C.credit_card_number from customer A INNER JOIN address B on A.id = B.customer_id INNER JOIN credit_card C on A.id = C.customer_id'
  connection.query(sql, (error, results, fields) => {
    if (error) {
      throw error
    }
    callback(results)
  })
};

module.exports = {createCustomer, createAddress, createCard, viewCustomer};