import { render, screen } from '@testing-library/react'
import List from '@/components/List'
import { Products } from '@/http/schemas/products'
const items: Products = [
    { id: 1, title: 'Product A', price: 10.0, description: 'Description A', category: 'Category A', image: 'https://localhost/image-a.jpg', },
    { id: 2, title: 'Product B', price: 20.0, description: 'Description B', category: 'Category B', image: 'https://localhost/image-b.jpg', },
];
describe('List', () => {
    it('if list is empty, should render a message', () => {
        render(<List items={[]} />)
        const listItem = screen.getByText(/no products/i)
        expect(listItem).toBeInTheDocument()
    })
    it('should render list items whith links to product', () => {

        render(<List items={items} />)
        items.forEach(item => {
            const link = screen.getByRole('link', { name: item.title })
            expect(link).toBeInTheDocument()
            expect(link).toHaveAttribute('href', `/products/${item.id}`)


        })

    })
    it('should render list items with a description', () => {

        render(<List items={items} />)
        items.forEach(item => {
            const description = screen.getByText(item.description)
            expect(description).toBeInTheDocument()

        })

    })
    it('should render list items with price', () => {

        const items: Products = [
            { id: 1, title: 'Product A', price: 10.0, description: 'Description A', category: 'Category A', image: 'https://localhost/image-a.jpg', },
            { id: 2, title: 'Product B', price: 20.0, description: 'Description B', category: 'Category B', image: 'https://localhost/image-b.jpg', },
        ];
        render(<List items={items} />)
        items.forEach(item => {

            const price = screen.getByText(`$${item.price}`)
            expect(price).toBeInTheDocument()
        })

    })
    it('should render list items with image', () => {
        render(<List items={items} />)
        items.forEach(item => {
            const image = screen.getByAltText(item.title)
            expect(image).toBeInTheDocument()
            expect(image).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(item.image)))
        })

    })
    it('should render list items with category', () => {
        render(<List items={items} />)
        items.forEach(item => {
            const category = screen.getByText(`${item.category}`)
            expect(category).toBeInTheDocument()
        })

    })
})