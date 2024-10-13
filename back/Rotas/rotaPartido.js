import { Router } from "express";
import PartidoControl from "../controller/PartidoControl.js";

const rotaPartido = Router();
const partidoControl = new PartidoControl();

rotaPartido.get("/", partidoControl.consultar)
           .get("/:termoBusca", partidoControl.consultar)
           .post("/", partidoControl.gravar);

export default rotaPartido;
