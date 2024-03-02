import { DbError } from "../../utils/Errors.js";
import * as todosServices from "./todos.service.js";

export async function getTodos(req, res, next) {
    console.log("getTodos ~ res:", res);
    console.log("getTodos ~ req:", req);
    const { userId } = req.user;
    try {
        const todos = await todosServices.getTodos(userId);
        return res.status(200).json({ data: todos });
    } catch (error) {
        throw new DbError(error.message);
    }
}

export async function getTodo(req, res, next) {
    const { userId } = req.user;
    const { id } = req.params;
    try {
        const todo = await todosServices.getTodo(userId, id);
        return res.status(200).json({ data: todo });
    } catch (error) {
        throw new DbError(error.message);
    }
}

export async function createTodo(req, res, next) {
    const { userId } = req.user;
    const { text } = req.body;
    try {
        const todo = await todosServices.createTodo(userId, { text });
        return res.status(200).json({ data: todo });
        
    } catch (error) {
        throw new DbError(error.message);
    }
}

export async function updateTodo(req, res, next) {
    const { userId } = req.user;
    const { id } = req.params;
    const { text } = req.body;
    try {
        const todo = await todosServices.updateTodo(userId, id, { text });
        return res.status(200).json({ data: todo });
        
    } catch (error) {
        throw new DbError(error.message);
    }
}

export async function deleteTodo(req, res, next) {
    const { userId } = req.user;
    const { id } = req.params;
    const result = await todosServices.deleteTodo(userId, id);
    return res.status(200).json({ data: result });
}
