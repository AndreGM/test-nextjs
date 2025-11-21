

"use client";
import { getProducts } from "@/http/getProducts";
import type { Products } from "@/http/schemas/products";
import { useQuery } from "@tanstack/react-query";
import DataTableProducts from "@/components/DataTable";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "@/components/forms/ProductForm";
import { useState } from "react";


export default function ProductsPage() {
    const query = useQuery<Products>({ queryKey: ['products'], queryFn: getProducts, });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        setIsDialogOpen(false);
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold tracking-tight">Product List</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-green-800 text-white hover:bg-green-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Create New Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Create New Product</DialogTitle>
                            <DialogDescription>
                                Fill in the details below to create a new product.
                            </DialogDescription>
                        </DialogHeader>
                        <ProductForm onSuccess={handleSuccess} onCancel={handleCancel} />
                    </DialogContent>
                </Dialog>
            </div>
            {query.isError && toast.error('Failed to load products.')}
            {query.isLoading && <p>Loading products...</p>}
            {query.data && <DataTableProducts items={query.data} />}

        </div>
    );
}