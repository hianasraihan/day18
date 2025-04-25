import { NextFunction, Request, Response } from "express";
import { findProductsService } from "../../service/products.service";

export const findProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await findProductsService();
        res.status(200).json({
            success: true,
            message: "Get products successfully",
            products: [],
        });
    } catch (error) {
        next(error);
    }
}