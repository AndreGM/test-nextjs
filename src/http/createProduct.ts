import { Product } from "./schemas/products";

export const createProduct = async (productData:Product) => {
    const response = await fetch(`https://fakestoreapi.com/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    return response.json();
}
