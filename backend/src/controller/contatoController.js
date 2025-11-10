import * as repo from '../repository/contatoRepository.js';

export async function listar(req, resp) {
  let registros = await repo.listar();
  resp.send(registros);
}

export async function buscarPorId(req, resp) {
  let id = Number(req.params.id_contato);
  let registro = await repo.buscarPorId(id);
  resp.send(registro);
}

export async function cadastrar(req, resp) {
  let novo = req.body;
  let id = await repo.cadastrar(novo);
  resp.send({ novoId: id });
}

export async function atualizar(req, resp) {
  let id = Number(req.params.id_contato);
  let dados = req.body;

  await repo.atualizar(id, dados);
  resp.send();
}

export async function deletar(req, resp) {
  let id = Number(req.params.id_contato);

  await repo.deletar(id);
  resp.send();
}
