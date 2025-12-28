import { CartContext, CartProduct } from "@/app/contexts/Cart"
import { formatCurrency } from "@/app/helpers/format-currency"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react"
import Image from "next/image"
import { useContext } from "react"

interface CartItemProps {
    product: CartProduct
}

const CartProductsItem = ({ product }: CartItemProps) => {
    const {
        decreaseProduct,
        increaseProduct,
        removeProduct
    } = useContext(CartContext)
    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 bg-gray-200 rounded-xl">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                    />
                </div>
                <div className="space-y-1">
                    <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
                    <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>

                    {/*QUANTIDADE*/}
                    <div className="flex items-center gap-1 text-center">
                        <Button
                            className="w-7 h-7 rounded-lg"
                            variant="outline"
                            onClick={() => decreaseProduct(product.id)}
                        >
                            <ChevronLeftIcon size={16} />
                        </Button>
                        <p className="w-7 text-xs">{product.quantity}</p>
                        <Button
                            className="w-7 h-7 rounded-lg"
                            variant="destructive"
                            onClick={() => increaseProduct(product.id)}
                        >
                            <ChevronRightIcon size={16} />
                        </Button>
                    </div>
                </div>
            </div>

            <Button
                className="h-7 w-7 rounded-lg"
                variant="outline"
                onClick={() => removeProduct(product.id)}>
                <TrashIcon />
            </Button>
        </div>
    )
}

export default CartProductsItem