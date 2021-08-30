import { getProductByID, getProducts } from "./products";

describe('Test getProductByID', function () {
    it('returns product by ID', async () => {
        const id = "1"
        const result = await getProductByID(id)

        expect(result).toEqual({
            id: "1",
            title: "Pickachu",
            description: "Electric-type Pokémon",
            price: 10,
        });
    });
});

describe('Test getProducts', function () {
    it('returns all products', async () => {
        const result = await getProducts()
        expect(result).toEqual([
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
        ]);
    });
});