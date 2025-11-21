"use client";

import type { Product, Products } from "@/http/schemas/products";
import Image from "next/image";
import Link from "next/link";

export default function List({ items }: { items: Products }) {
    if (items.length === 0) {
        return <p className="text-zinc-50">No products available</p>;
    }

    return (
        <ul className="text-zinc-50">

            {items.map((item: Product) => (
                <li key={item.id} className="mb-4 p-4 border border-zinc-700 rounded-lg">
                    <Link href={`/products/${item.id}`} aria-label={item.title} className="block hover:bg-zinc-800 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">{item.id}</h3>
                        <p className="mb2"><Image className="w-auto h-auto" src={item.image} alt={item.title} width={100} height={100} /></p>
                        <p className="mb-2">{item.description}</p>
                        <p className="mb-2">{item.category}</p>
                        <p className="font-bold">${item.price}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
