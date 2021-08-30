import { Product } from "@models/"

export const getProducts = async () => productsMock
export const getProductByID = async (id: string) => productsMock.find((p) => p.id === id)

const productsMock: Product[] = [
    {
        id: "1",
        title: "Pickachu",
        description: "Electric-type Pokémon",
        price: 10,
    },
    {
        id: "2",
        title: "Charmander",
        description: "Fire Pokémon",
        price: 7,
    },
]