import express from "express";
const router = express.Router();

import * as contatoController from "./controller/contatoController.js";
import * as cadastroController from "./controller/cadastroController.js";
import * as patrocinadorController from "./controller/patrocinadorController.js";
import * as autenticacaoController from "./controller/autenticacaoController.js";

// ROTAS CONTATO
router.get("/contato", contatoController.listar);
router.get("/contato/:id_contato", contatoController.buscarPorId);
router.post("/contato", contatoController.cadastrar);
router.put("/contato/:id_contato", contatoController.atualizar);
router.delete("/contato/:id_contato", contatoController.deletar);

// ROTAS CADASTRO
router.get("/cadastro", cadastroController.listar);
router.get("/cadastro/:id_cadastro", cadastroController.buscarPorId);
router.post("/cadastro", cadastroController.cadastrar);
router.put("/cadastro/:id_cadastro", cadastroController.atualizar);
router.delete("/cadastro/:id_cadastro", cadastroController.deletar);

// ROTAS PATROCINADOR
router.get("/patrocinador", patrocinadorController.listar);
router.get("/patrocinador/:id_patrocinador", patrocinadorController.buscarPorId);
router.post("/patrocinador", patrocinadorController.cadastrar);
router.put("/patrocinador/:id_patrocinador", patrocinadorController.atualizar);
router.delete("/patrocinador/:id_patrocinador", patrocinadorController.deletar);

// ROTAS AUTENTICACAO
router.get("/autenticacao", autenticacaoController.listar);
router.get("/autenticacao/:id_autenticacao", autenticacaoController.buscarPorId);
router.post("/autenticacao", autenticacaoController.cadastrar);
router.put("/autenticacao/:id_autenticacao", autenticacaoController.atualizar);
router.delete("/autenticacao/:id_autenticacao", autenticacaoController.deletar);

export function adicionarRotas(api) {
    api.use(router);
}
