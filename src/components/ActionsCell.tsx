"use client"

import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { Product } from "@/http/schemas/products"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProduct } from "@/http/deleteProduct"
import UpdateProductForm from "@/components/forms/UpdateProductForm"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface ActionsCellProps {
    product: Product
}

export function ActionsCell({ product }: ActionsCellProps) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    const deleteMutation = useMutation({
        mutationFn: (productId: number) => deleteProduct(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.success("Product deleted successfully!")
        },
        onError: (error) => {
            toast.error("Failed to delete product. Please try again.")
            console.error("Error deleting product:", error)
        },
    })

    const handleEdit = () => {
        setIsEditDialogOpen(true)
    }

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
            deleteMutation.mutate(product.id)
        }
    }

    const handleEditSuccess = () => {
        setIsEditDialogOpen(false)
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-100 dark:bg-gray-900 border-cyan-50">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                            router.push(`/products/${product.id}`)
                        }}
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={handleEdit}
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer text-red-600"
                        onClick={handleDelete}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                            Update the product information below.
                        </DialogDescription>
                    </DialogHeader>
                    <UpdateProductForm
                        product={product}
                        onSuccess={handleEditSuccess}
                        onCancel={() => setIsEditDialogOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}
