const postService = require("../services/postService");

// LISTAR TODOS OS POSTS

async function listar(req, res) {
    try {
        const posts = await postService.listar();
        return res.json(posts);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: error.message
    });
    }
}

// CRIAR POST

async function criar(req, res) {
    try {
        const { titulo, conteudo, autor } = req.body;
        if (!titulo || !conteudo || !autor) {
            return res.status(400).json({
                erro: "Título, conteúdo e autor são obrigatórios."
            });
        }
       
        const post = await postService.criar({
            titulo,
            conteudo,
            autor
        });
       
        return res.status(201).json(post);

    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: error.message
    });
    }
}

// BUSCAR POR ID

async function buscar(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                erro: "ID inválido."
            });
        }
        const post = await postService.buscar(id);
        if (!post) {
            return res.status(404).json({
                erro: "Post não encontrado."
            });
        }
        return res.json(post);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: error.message
    });
    }
}

// EDITAR POST

async function editar(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                erro: "ID inválido."
            });
        }
        const post = await postService.editar(id, req.body);
        return res.json(post);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: error.message
        });
    }
}

// EXCLUIR POST

async function excluir(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                erro: "ID inválido."
            });
        }
        await postService.excluir(id);
        return res.json({
            mensagem: "Post excluído com sucesso"
        });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: error.message
        });
    }
}

// BUSCAR POR PALAVRA-CHAVE

async function buscarPorTermo(req, res) {
    try {
        const termo = req.query.termo;
        if (!termo) {
            return res.status(400).json({
                erro: "Informe um termo para pesquisa."
            });
        }
        const posts = await postService.buscarPorTermo(termo);
        return res.json(posts);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: error.message
        });
    }
}

module.exports = {
    listar,
    criar,
    buscar,
    editar,
    excluir,
    buscarPorTermo
};