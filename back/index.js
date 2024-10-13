import express from "express";
import rotaPartido from "./Rotas/rotaPartido.js";
import rotaCandidato from "./Rotas/rotaCandidato.js";
import cors from "cors";

const app = express();
const host = '0.0.0.0'; // Todas as interfaces de rede
const porta = 4000;
app.use(cors({
    origin: "http://127.0.0.1:3000"
}))
app.use(express.json());
app.use('/partido', rotaPartido);
app.use('/candidato', rotaCandidato);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado em http://${host}:${porta}`);
});
