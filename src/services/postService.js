const prisma = require("../prisma/client");

async function listar() {
    return prisma.post.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
}

async function buscar(id) {
    return prisma.post.findUnique({
        where: {id}
    })
}

async function criar(dados) {
    return prisma.post.create({
        data: dados
    });
}

async function editar(id, dados) {
    return prisma.post.update({
        where: {id},
        data: dados
    });
}

async function excluir(id) {
    return prisma.post.delete({
        where: {id}
    });
}

async function buscarPorTermo(termo) {
    return prisma.post.findMany({
        where: {
            OR: [
                {
                    titulo: {
                        contains: termo,
                        mode: "insensitive"
                    }
                },
                {
                    conteudo: {
                        contains: termo,
                        mode: "insensitive"
                    }
                },
                {
                    autor: {
                        contains: termo,
                        mode: "insensitive"
                    }
                }
            ]
        }
    });
}

module.exports = {
    listar,
    buscar,
    criar,
    editar,
    excluir,
    buscarPorTermo
};