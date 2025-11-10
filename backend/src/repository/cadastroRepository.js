import { connection } from '../conection.js';

export async function listar() {
  const comando = 'SELECT * FROM cadastro';
  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function buscarPorId(id) {
  const comando = 'SELECT * FROM cadastro WHERE id_cadastro = ?';
  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}

export async function cadastrar(cadastro) {
  const comando = `
    INSERT INTO cadastro (
      nome, email, telefone, cpf, senha, confirmarsenha
    ) VALUES (?, ?, ?, ?, ?, ?)`;

  const [resposta] = await connection.query(comando, [
    cadastro.nome,
    cadastro.email,
    cadastro.telefone,
    cadastro.cpf,
    cadastro.senha,
    cadastro.confirmarsenha,
  ]);

  return resposta.insertId;
}

export async function atualizar(id, cadastro) {
  const comando = `
    UPDATE cadastro SET
      nome = ?, email = ?, telefone = ?, cpf = ?, senha = ?, confirmarsenha = ?
    WHERE id_cadastro = ?`;

  await connection.query(comando, [
    cadastro.nome,
    cadastro.email,
    cadastro.telefone,
    cadastro.cpf,
    cadastro.senha,
    cadastro.confirmarsenha,
    id
  ]);
}

export async function deletar(id) {
  const comando = 'DELETE FROM cadastro WHERE id_cadastro = ?';
  await connection.query(comando, [id]);
}
