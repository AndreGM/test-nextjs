"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createProduct } from "@/http/createProduct";
import type { Product } from "@/http/schemas/products";

// Schema for creating a new product
const createProductSchema = z.object({
    id: z.number().int().positive({
        message: "ID must be a positive integer.",
    }),
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    price: z.number().positive({
        message: "Price must be a positive number.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    category: z.string().min(2, {
        message: "Category must be at least 2 characters.",
    }),
    image: z.url({
        message: "Please enter a valid URL for the image.",
    }),
});

type CreateProductFormValues = z.infer<typeof createProductSchema>;

interface ProductFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function ProductForm({ onSuccess, onCancel }: ProductFormProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (productData: Product) => createProduct(productData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success("Product created successfully!");
            form.reset();
            onSuccess?.();
        },
        onError: (error) => {
            toast.error("Failed to create product. Please try again.");
            console.error("Error creating product:", error);
        },
    });

    const form = useForm<CreateProductFormValues>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            id: 0,
            title: "",
            price: 0,
            description: "",
            category: "",
            image: "",
        },
    });

    async function onSubmit(values: CreateProductFormValues) {
        mutation.mutate(values as Product);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter product ID"
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., electronics, clothing" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter product description"
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4 justify-end">
                    {onCancel && (
                        <Button type="button" className="bg-red-800 text-white" onClick={onCancel} disabled={mutation.isPending}>
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" className="bg-green-800 text-white" disabled={mutation.isPending}>
                        {mutation.isPending ? "Creating..." : "Create Product"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
