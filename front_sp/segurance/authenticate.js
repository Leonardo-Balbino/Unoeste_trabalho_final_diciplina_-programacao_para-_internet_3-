export default function Authenticate(requisition, response) {
    const user = requisition.body.username;
    const password = requisition.body.password;

    if (user == 'admin' && password == 'admin') {
        // Usuário está autenticado
        requisition.session.Authenticate = true;
        response.redirect('/cadastro_partidos.html');
    } else {
        response.write('<html>');
        response.write('<head>');
        response.write('<title>Falha no login</title>');
        response.write('<meta charset="utf-8">');
        response.write('</head>');
        response.write('<body>');
        response.write('<p>Usuário ou senha inválidos</p>');
        response.write('<a href="/login.html">Voltar para tela de login</a>');
        response.write('</body>');
        response.write('</html>');
        response.end();
    }
}

export function checkAuthentication(requisition, response, next) {
    if (requisition.session.Authenticate != undefined && requisition.session.Authenticate == true) {
        next();
    } else {
        response.redirect("/login.html");
    }
}
