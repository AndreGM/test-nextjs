import Link from "next/link";
import { ShoppingBag } from "lucide-react";


export default function Navbar() {
    return (
        <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">Products</span>
                    </Link>

                </div>
            </div>
        </nav>
    );
}
