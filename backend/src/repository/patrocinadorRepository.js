import { connection } from '../conection.js';

export async function listar() {
  const comando = 'SELECT * FROM patrocinador';
  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function buscarPorId(id) {
  const comando = 'SELECT * FROM patrocinador WHERE id_patrocinador = ?';
  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}

export async function cadastrar(patrocinador) {
  const comando = `
    INSERT INTO patrocinador (
      nome, email, telefone, senha, confirmarsenha
    ) VALUES (?, ?, ?, ?, ?)`;

  const [resposta] = await connection.query(comando, [
    patrocinador.nome,
    patrocinador.email,
    patrocinador.telefone,
    patrocinador.senha,
    patrocinador.confirmarsenha,
  ]);

  return resposta.insertId;
}

export async function atualizar(id, patrocinador) {
  const comando = `
    UPDATE patrocinador SET
      nome = ?, email = ?, telefone = ?, senha = ?, confirmarsenha = ?
    WHERE id_patrocinador = ?`;

  await connection.query(comando, [
    patrocinador.nome,
    patrocinador.email,
    patrocinador.telefone,
    patrocinador.senha,
    patrocinador.confirmarsenha,
    id
  ]);
}

export async function deletar(id) {
  const comando = 'DELETE FROM patrocinador WHERE id_patrocinador = ?';
  await connection.query(comando, [id]);
}
