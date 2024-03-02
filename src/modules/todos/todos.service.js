import { getIndividualTodo, getAllTodos, createIndividualTodo, updateIndividualTodo, deleteIndividualTodo } from "../../lib/db.js";

export async function getTodos(userId) {
    return await getAllTodos(userId);
}

export async function getTodo(userId, id) {
    return await getIndividualTodo(userId, id);
}

export async function createTodo(userId, data) {
    return await createIndividualTodo(userId, data);
}

export async function updateTodo(userId, id, data) {
    return await updateIndividualTodo(userId, id, data);
}

export async function deleteTodo(userId, id) {
    return await deleteIndividualTodo(userId, id);
}