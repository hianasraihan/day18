import { prisma } from "../connection/prisma.client";

export const findProductsService = async () => {
    const products = await prisma.product.findMany();
    
    return products;
};