import { getIndividualTodo, getAllTodos, createIndividualTodo, updateIndividualTodo, deleteIndividualTodo } from "../../lib/db.js";

export async function getTodos(userId) {
    return getAllTodos(userId);
}

export async function getTodo(userId, id) {
    return getIndividualTodo(userId, id);
}

export async function createTodo(userId, data) {
    return createIndividualTodo(userId, data);
}

export async function updateTodo(userId, id, data) {
    return updateIndividualTodo(userId, id, data);
}

export async function deleteTodo(userId, id) {
    return deleteIndividualTodo(userId, id);
}