import { render, screen } from '@testing-library/react'
import DataTableProducts from '@/components/DataTable'
import { Products } from '@/http/schemas/products'
const items: Products = [
    { id: 1, title: 'Product A', price: 10.0, description: 'Description A', category: 'Category A', image: 'https://localhost/image-a.jpg', },
    { id: 2, title: 'Product B', price: 20.0, description: 'Description B', category: 'Category B', image: 'https://localhost/image-b.jpg', },
];
describe('DataTableProducts', () => {
    it('if empty, should render a message', () => {
        render(<DataTableProducts items={[]} />)
        const item = screen.getByText(/no products/i)
        expect(item).toBeInTheDocument()
    })

    it('should render items with a description', () => {

        render(<DataTableProducts items={items} />)
        items.forEach(item => {
            const description = screen.getByText(item.description)
            expect(description).toBeInTheDocument()

        })

    })
    it('should render items with price', () => {

        const items: Products = [
            { id: 1, title: 'Product A', price: 10.0, description: 'Description A', category: 'Category A', image: 'https://localhost/image-a.jpg', },
            { id: 2, title: 'Product B', price: 20.0, description: 'Description B', category: 'Category B', image: 'https://localhost/image-b.jpg', },
        ];
        render(<DataTableProducts items={items} />)
        items.forEach(item => {

            const price = screen.getByText(new RegExp(`${item.price}`, 'i'))
            expect(price).toBeInTheDocument()
        })

    })
    it('should render items with category', () => {
        render(<DataTableProducts items={items} />)
        items.forEach(item => {
            const category = screen.getByText(`${item.category}`)
            expect(category).toBeInTheDocument()
        })

    })
})