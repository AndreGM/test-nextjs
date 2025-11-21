"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { getProduct } from "@/http/getProduct";
import { deleteProduct } from "@/http/deleteProduct";
import type { Product } from "@/http/schemas/products";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import UpdateProductForm from "@/components/forms/UpdateProductForm";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const id = params.id as string;
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const { data: product, isLoading, isError } = useQuery<Product>({
        queryKey: ['product', id],
        queryFn: () => getProduct(id),
    });

    const deleteMutation = useMutation({
        mutationFn: (productId: number) => deleteProduct(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success("Product deleted successfully!");
            router.push('/products');
        },
        onError: (error) => {
            toast.error("Failed to delete product. Please try again.");
            console.error("Error deleting product:", error);
        },
    });

    const handleEdit = () => {
        setIsEditDialogOpen(true);
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${product?.title}"?`)) {
            deleteMutation.mutate(Number(id));
        }
    };

    const handleEditSuccess = () => {
        setIsEditDialogOpen(false);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
                <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="container mx-auto py-10">
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <p className="text-red-500">Failed to load product details.</p>
                    <Button onClick={() => router.push('/products')} variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Products
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">

            <div className="flex items-center justify-between mb-8">
                <Button onClick={() => router.push('/products')} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Products
                </Button>
                <div className="flex gap-2">
                    <Button onClick={handleEdit} variant="default">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                    <Button
                        onClick={handleDelete}
                        className={'bg-red-800'}
                        variant="destructive"
                        disabled={deleteMutation.isPending}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {deleteMutation.isPending ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                            Update the product information below.
                        </DialogDescription>
                    </DialogHeader>
                    {product && (
                        <UpdateProductForm
                            product={product}
                            onSuccess={handleEditSuccess}
                            onCancel={() => setIsEditDialogOpen(false)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <div className="grid md:grid-cols-2 gap-8">

                <div className="flex items-center justify-center bg-gray-900/50 rounded-lg p-8">
                    <Avatar className="h-80 w-80 rounded-lg">
                        <AvatarImage
                            src={product.image}
                            alt={product.title}
                            className="object-contain"
                        />
                        <AvatarFallback className="text-4xl rounded-lg">
                            {product.title.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>


                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
                        <p className="text-sm text-muted-foreground">Product ID: {product.id}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold text-green-500">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="px-3 py-1 bg-blue-900/50 rounded-full text-sm capitalize">
                            {product.category}
                        </span>
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                        <h2 className="text-xl font-semibold mb-3">Description</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                        <h2 className="text-xl font-semibold mb-3">Product Information</h2>
                        <dl className="space-y-2">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Category:</dt>
                                <dd className="font-medium capitalize">{product.category}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Price:</dt>
                                <dd className="font-medium">${product.price.toFixed(2)}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Product ID:</dt>
                                <dd className="font-medium">{product.id}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
