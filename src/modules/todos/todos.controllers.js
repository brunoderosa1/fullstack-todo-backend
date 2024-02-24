import * as todosServices from "./todos.service.js";

export async function getTodos(req, res, next) {
    const { userId } = req.user;
    const todos = await todosServices.getTodos(userId);
    res.json({ todos });
}

export async function getTodo(req, res, next) {
    const { userId } = req.user;
    const { id } = req.params;
    const todo = await todosServices.getTodo(userId, id);
    res.json({ todo });
}

export async function createTodo(req, res, next) {
    const { userId } = req.user;
    const { text } = req.body;
    const todo = await todosServices.createTodo(userId, { text });
    res.json({ todo });
}

export async function updateTodo(req, res, next) {
    const { userId } = req.user;
    const { id } = req.params;
    const { text } = req.body;
    const todo = await todosServices.updateTodo(userId, id, { text });
    res.json({ todo });
}

export async function deleteTodo(req, res, next) {
    const { userId } = req.user;
    const { id } = req.params;
    const result = await todosServices.deleteTodo(userId, id);
    res.json({ result });
}
