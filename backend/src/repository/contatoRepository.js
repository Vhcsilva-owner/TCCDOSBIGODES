import { connection } from '../conection.js';

export async function listar() {
  const comando = 'SELECT * FROM contato';
  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function buscarPorId(id) {
  const comando = 'SELECT * FROM contato WHERE id_contato = ?';
  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}

export async function cadastrar(contato) {
  const comando = `
    INSERT INTO contato (
      nome, email, telefone, assunto, mensagem
    ) VALUES (?, ?, ?, ?, ?)`;

  const [resposta] = await connection.query(comando, [
    contato.nome,
    contato.email,
    contato.telefone,
    contato.assunto,
    contato.mensagem
  ]);

  return resposta.insertId;
}

export async function atualizar(id, contato) {
  const comando = `
    UPDATE contato SET
      nome = ?, email = ?, telefone = ?, assunto = ?, mensagem = ?
    WHERE id_contato = ?`;

  await connection.query(comando, [
    contato.nome,
    contato.email,
    contato.telefone,
    contato.assunto,
    contato.mensagem,
    id
  ]);
}

export async function deletar(id) {
  const comando = 'DELETE FROM contato WHERE id_contato = ?';
  await connection.query(comando, [id]);
}
