export const deleteProduct = async (id: number) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete product');
    }
    return response.json();
}
