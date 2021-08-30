import { getProducts } from "./handler"

describe("Test getProducts", () => {
    it("returns products", async ()=> {
        const result = await getProducts(null, null, null)

        expect(result).toEqual({
            statusCode: 200,
            body: '[{"id":"1","title":"Pickachu","description":"Electric-type Pokémon","price":10},{"id":"2","title":"Charmander","description":"Fire Pokémon","price":7}]',
            headers: {
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            }
          })
    })
})

