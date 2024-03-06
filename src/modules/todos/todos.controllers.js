import { DbError } from "../../utils/Errors.js";
import * as todosServices from "./todos.service.js";

export async function getTodos(req, res, next) {
    const userId = req.user.user_id;
    try {
        const todos = await todosServices.getTodos(userId);
        return res.status(200).json({ data: todos });
    } catch (error) {
        next(new DbError(error.message));
    }
}

export async function getTodo(req, res, next) {
    const userId = req.user.user_id;
    const { id } = req.params;
    try {
        const todo = await todosServices.getTodo(userId, parseInt(id));
        return res.status(200).json({ data: [todo] });
    } catch (error) {
        next(new DbError(error.message));
    }
}

export async function createTodo(req, res, next) {
    const userId = req.user.user_id;
    const { title, description } = req.body;
    try {
        const todo = await todosServices.createTodo(userId, {
            title,
            description,
        });
        return res.status(200).json({ data: todo });
    } catch (error) {
        next(new DbError(error.message));
    }
}

export async function updateTodo(req, res, next) {
    const userId = req.user.user_id;
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const todo = await todosServices.updateTodo(userId, parseInt(id), {
            title,
            description,
        });
        return res.status(200).json({ data: todo });
    } catch (error) {
        next(new DbError(error.message));
    }
}

export async function deleteTodo(req, res, next) {
    const userId = req.user.user_id;
    const { id } = req.params;
    try {
        const todo = await todosServices.deleteTodo(userId, parseInt(id));
        return res.status(200).json({ data: todo });
    } catch (error) {
        next(new DbError(error.message));
    }
}
