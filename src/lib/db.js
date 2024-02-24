import { PrismaClient } from "@prisma/client";

if (!global.prisma) {
    global.prisma = new PrismaClient();
}
export const prisma = global.prisma;

export const getTodos = async (userId) => {
    return prisma.todo.findMany({
        where: {
            userId,
        },
        include: {  
            userId: true,
        }
    });
};

export const getTodo = async (userId, id) => {
    return prisma.todo.findUnique({
        where: {
            userId,
            id
        },
        include: {
            userId: true,
        }
    });
};

export const createTodo = async (userId, data) => {
    return prisma.todo.create({
        data: {
            ...data,
            userId
        },
        include: {
            userId: true,
        }
    });
};

export const updateTodo = async (userId, id, data) => {
    return prisma.todo.update({
        where: {
            userId,
            id
        },
        data,
        include: {
            userId: true,
        }
    });
};

export const deleteTodo = async (userId, id) => {
    return prisma.todo.delete({
        where: {
            userId,
            id
        },
        include: {
            userId: true,
        }
    });
};