const path = require('path');
const knex = require('knex');
const { format } = require('date-fns');
const knexFile = require('../knexfile.js');
const banco = knex(knexFile);

function validateRequiredFields(fields) {
    return fields.every((field) => field !== undefined && field !== null);
}

function formatDate(date) {
    return format(new Date(date), "dd/MM/yyyy HH:mm:ss");
}

function sendSuccessResponse(res, data) {
    return res.json({ status: "success", data });
}

function sendErrorResponse(res, statusCode, message) {
    return res.status(statusCode).json({ status: "error", message });
}

exports.list = async (req, res) => {
    try {
        const curriculos = await banco('curriculos').select();
        curriculos.forEach((curriculo) => {
            curriculo.created_at = formatDate(curriculo.created_at);
            curriculo.updated_at = formatDate(curriculo.updated_at);
        });
        sendSuccessResponse(res, curriculos);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao listar currículos.");
    }
};

exports.create = async (req, res) => {
    const { nome, email, experiencia, linguas, telefone } = req.body;

    if (!validateRequiredFields([nome, email, experiencia, linguas, telefone])) {
        return sendErrorResponse(res, 400, "Campos obrigatórios não preenchidos.");
    }

    try {
        await banco('curriculos').insert({ nome, email, experiencia, linguas, telefone });
        sendSuccessResponse(res, "Informações do curriculo atualizada com sucesso!");
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao adicionar currículo.");
    }
};

exports.get = async (req, res) => {
    const id = req.params.id;
    try {
        const curriculo = await banco('curriculos').where('id', id).first();
        if (curriculo) {
            curriculo.created_at = formatDate(curriculo.created_at);
            curriculo.updated_at = formatDate(curriculo.updated_at);
            sendSuccessResponse(res, curriculo);
        } else {
            sendErrorResponse(res, 404, "Currículo não encontrado.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao obter currículo.");
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const { nome, email, experiencia, linguas, telefone} = req.body;

    if (!validateRequiredFields([nome, email, experiencia, linguas, telefone])) {
        return sendErrorResponse(res, 400, "Campos obrigatórios não preenchidos.");
    }

    try {
        const updated = await banco('curriculos').where('id', id).update({ nome, email, experiencia });
        if (updated) {
            sendSuccessResponse(res, "Currículo atualizado com sucesso.");
        } else {
            sendErrorResponse(res, 404, "Currículo não encontrado.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao atualizar currículo.");
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await banco('curriculos').where('id', id).del();
        if (deleted) {
            sendSuccessResponse(res, "Currículo deletado com sucesso.");
        } else {
            sendErrorResponse(res, 404, "Currículo não encontrado.");
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Falha ao deletar currículo.");
    }
};
