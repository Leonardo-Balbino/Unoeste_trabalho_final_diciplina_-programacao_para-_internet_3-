import { Router } from "express";
import CandidatoControl from "../controller/CandidatoControl.js";

const rotaCandidato = Router();
const candidatoControl = new CandidatoControl();

rotaCandidato.get("/", candidatoControl.consultar)
             .get("/:termoBusca", candidatoControl.consultar)
             .post("/", candidatoControl.gravar);

export default rotaCandidato;
