import { PrismaClient } from "@prisma/client";

if (!global.prisma) {
    global.prisma = new PrismaClient();
}
export const prisma = global.prisma;

export const getAllTodos = async (userId) => {
    return prisma.todo.findMany({
        where: {
            userId,
        },
        include: {  
            userId: true,
        }
    });
};

export const getIndividualTodo = async (userId, id) => {
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

export const createIndividualTodo = async (userId, data) => {
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

export const updateIndividualTodo = async (userId, id, data) => {
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

export const deleteIndividualTodo = async (userId, id) => {
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