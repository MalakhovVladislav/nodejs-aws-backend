import { Product } from "src/models"
import { getProducts as getProductsDB } from "src/repositories/products"
import { createProduct as createProductDB } from "src/repositories/products"
import { getProductByID as getProductByIDDB } from "src/repositories/products"

export const getProducts = async () => getProductsDB()
export const getProductByID = async (id: string) => getProductByIDDB(id)
export const createProduct = async (product: Product) => createProductDB(product)