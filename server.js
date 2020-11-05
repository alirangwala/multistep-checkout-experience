const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors');
const body_parser = require('body-parser');
const queries = require('./queries')

app.use(cors())
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './frontend/build')))

app.get('/customer', (req, res) => {
  queries.viewCustomer((error, data) => {
    if (error) {
      res.send(error)
    } else {
      res.send(data)
    }
  })
});

app.post('/customer', (req, res) => {
  queries.createCustomer((error, data) => {
    if (error) {
      res.send(error)
    } else {
      res.send(data)
    }
    }, req.body.name, req.body.email, req.body.password)
})
// {
//   "name": "Alan",
//   "email": "Watts",
//   "password": "qwerty"
// }
app.post('/address', (req, res) => {
  queries.createAddress((error, data) => {
    if (error) {
      res.send(error)
    } else {
      res.send(data)
    }
    }, req.body.customer_id, req.body.address_line_1, req.body.address_line_2, req.body.city, req.body.state, req.body.zipcode, req.body.phone)
})
// {
//   "customer_id": "2",
//   "address_line_1": "7631 Carswold Dr",
//   "address_line_2": "House 2",
//   "city": "St. Louis",
//   "state": "MO",
//   "zipcode": "63105",
//   "phone": "5555555555"
// }

app.post('/card', (req, res) => {
  console.log(req.body)
  queries.createCard((error, data) => {
    if (error) {
      res.send(error)
    } else {
      res.send(data)
    }
    }, req.body.customer_id, req.body.credit_card_number, req.body.expiry_date, req.body.cvv, req.body.billing_zipcode)
})

// {
//   "customer_id": "2",
//   "credit_card_number": "123123123123",
//   "expiry_date": "10/10",
//   "cvv": "787",
//   "billing_zipcode": "63105"
// }
app.listen(PORT, () => {
  console.log( `server is running and listening on port ${PORT}`)
})