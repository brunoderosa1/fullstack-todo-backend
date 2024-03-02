import { PrismaClient } from "@prisma/client";

if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
}
export const prisma = globalThis.prisma;

export async function getAllTodos(userId) {
    return await prisma.todo.findMany({
        where: {
            userId,
        },
        include: {  
            userId: true,
        }
    });
};

export async function getIndividualTodo (userId, id) {
    return await prisma.todo.findUnique({
        where: {
            userId,
            id,
        },
        include: {
            userId: true,
        },
    });
};

export async function createIndividualTodo (userId, data) {
    return await prisma.todo.create({
        data: {
            ...data,
            userId,
        },
        include: {
            userId: true,
        },
    });
};

export async function updateIndividualTodo (userId, id, data) {
    return await prisma.todo.update({
        where: {
            userId,
            id,
        },
        data,
        include: {
            userId: true,
        },
    });
};

export async function deleteIndividualTodo (userId, id) {
    return await prisma.todo.delete({
        where: {
            userId,
            id,
        },
        include: {
            userId: true,
        },
    });
};