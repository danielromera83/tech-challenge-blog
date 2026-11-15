const userService = require("../services/userService");

function obterId(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      erro: "ID inválido.",
    });

    return null;
  }

  return id;
}

function tratarErro(error, res) {
  if (error.code === "P2002") {
    return res.status(409).json({
      erro: "Já existe um usuário cadastrado com este e-mail.",
    });
  }

  console.error(error);

  return res.status(500).json({
    erro: "Erro interno do servidor.",
  });
}

function criarHandlers(role, nomePlural, nomeSingular) {
  async function listar(req, res) {
    try {
      const resultado = await userService.listarPorRole(
        role,
        req.query.page,
        req.query.limit
      );

      return res.json(resultado);
    } catch (error) {
      return tratarErro(error, res);
    }
  }

  async function buscar(req, res) {
    const id = obterId(req, res);

    if (!id) {
      return;
    }

    try {
      const usuario = await userService.buscarPorId(id, role);

      if (!usuario) {
        return res.status(404).json({
          erro: `${nomeSingular} não encontrado.`,
        });
      }

      return res.json(usuario);
    } catch (error) {
      return tratarErro(error, res);
    }
  }

  async function criar(req, res) {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        erro: "E-mail e senha são obrigatórios.",
      });
    }

    try {
      const usuario = await userService.criar({
        email,
        password,
        role,
      });

      return res.status(201).json(usuario);
    } catch (error) {
      return tratarErro(error, res);
    }
  }

  async function atualizar(req, res) {
    const id = obterId(req, res);

    if (!id) {
      return;
    }

    const { email, password } = req.body;

    if (email === undefined && password === undefined) {
      return res.status(400).json({
        erro: "Informe pelo menos um campo para atualização.",
      });
    }

    if (
      email !== undefined &&
      (typeof email !== "string" || !email.trim())
    ) {
      return res.status(400).json({
        erro: "E-mail inválido.",
      });
    }

    if (
      password !== undefined &&
      (typeof password !== "string" || !password)
    ) {
      return res.status(400).json({
        erro: "Senha inválida.",
      });
    }

    try {
      const usuario = await userService.atualizar(id, role, {
        email,
        password,
      });

      if (!usuario) {
        return res.status(404).json({
          erro: `${nomeSingular} não encontrado.`,
        });
      }

      return res.json(usuario);
    } catch (error) {
      return tratarErro(error, res);
    }
  }

  async function excluir(req, res) {
    const id = obterId(req, res);

    if (!id) {
      return;
    }

    if (role === "PROFESSOR" && req.user?.id === id) {
      return res.status(400).json({
        erro: "O professor autenticado não pode excluir a própria conta.",
      });
    }

    try {
      const usuario = await userService.excluir(id, role);

      if (!usuario) {
        return res.status(404).json({
          erro: `${nomeSingular} não encontrado.`,
        });
      }

      return res.json({
        mensagem: `${nomeSingular} excluído com sucesso.`,
        usuario,
      });
    } catch (error) {
      return tratarErro(error, res);
    }
  }

  return {
    listar,
    buscar,
    criar,
    atualizar,
    excluir,
  };
}

const professores = criarHandlers(
  "PROFESSOR",
  "professores",
  "Professor"
);

const alunos = criarHandlers(
  "ALUNO",
  "alunos",
  "Aluno"
);

module.exports = {
  professores,
  alunos,
};