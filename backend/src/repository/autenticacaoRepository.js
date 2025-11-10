import { connection } from '../conection.js';

export async function listar() {
  const comando = 'SELECT * FROM login';
  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function buscarPorId(id) {
  const comando = 'SELECT * FROM login WHERE id_login = ?';
  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}

export async function cadastrar(autenticacao) {
  const comando = `
    INSERT INTO login (
      email, senha
    ) VALUES (?, ?)`;

  const [resposta] = await connection.query(comando, [
    autenticacao.email,
    autenticacao.senha,
  ]);

  return resposta.insertId;
}

export async function atualizar(id, autenticacao) {
  const comando = `
    UPDATE login SET
      email = ?, senha = ?
    WHERE id_login = ?`;

  await connection.query(comando, [
    autenticacao.email,
    autenticacao.senha,
    id
  ]);
}

export async function deletar(id) {
  const comando = 'DELETE FROM login WHERE id_login = ?';
  await connection.query(comando, [id]);
}
