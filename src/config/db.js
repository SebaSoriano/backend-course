import { PrismaClient } from "@prisma/client/extension";

// si estoy en development, muestra los queries, errores y warnings
// si estoy en production, muestra los errores
const prisma = new PrismaClient({
    log:
        process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"]
});


const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("DB connected via Prisma");
    } catch(error) {
        console.log(`Database connection error: ${error.message}`);
        process.exit(1); // se hace pq estoy en local
    }
};

const disconnectDB = async () => {
    await prisma.$disconnect();
};

// exportamos el cliente prisma y
// las funciones connectDB y disconnectDB
export { prisma, connectDB, disconnectDB };