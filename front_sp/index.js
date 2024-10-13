import express from 'express';

import Authenticate from './segurance/authenticate.js';

import { checkAuthentication } from './segurance/authenticate.js'

import session from 'express-session';

const app = express();



const host = '0.0.0.0';
const porta = 3000;

// quando usa js no back aparece essas ganbiarras aqui kkkk
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: 'segredo', //chave para criptografia
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24
        }
        
}))
    



app.use(express.static('./public'))


app.get('/login', (requisition, response) => {

    response.redirect('/login.html')

})



app.post('/login', Authenticate)

app.use(checkAuthentication, express.static('./privete'))


app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});