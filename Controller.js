/*// constantes
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

let app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))  // para trabalhar com requisições post
app.use(bodyParser.json())  // para trabalhar com requisições json


// rotas
app.post('/', (req, res) => {
  // console.log(`Com o valor de ${req.body.price} você consegue comprar várias coisas!`)
  console.log(req.body)

  return res.status(200).send({'sucesso': true})
})

let port = process.env.PORT || 3000
app.listen(port, (req, res) => {
  console.log(`Servidor rodando na porta: ${port}`)
})*/

require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Configurar Stripe com a chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20'
})

// Middlewares
app.use(cors())
app.use(bodyParser.json())

app.post('/payment-intent', async (req, res) =>{
    try{
        const { amount } = req.body

        // Criação do PaymentIntent no Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });

        // Retorna o clientSecret ao frontend
        res.json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error){
        res.status(500).json({error: error.message})
    }
})

app.get('/', (req, res) => {
    res.json('Servidor Stripe ...rodando');
})

let port = process.env.PORT || 3000
app.listen(port, (req, res) => {
  console.log(`Servidor rodando na porta: ${port}`)
})
