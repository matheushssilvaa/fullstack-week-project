import { CartContext } from "@/app/contexts/Cart"
import CartProductsItem from "./cart-products-item"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/app/helpers/format-currency"
import FinishOrderDialog from "./finish-order-button"

const CartSheet = () => {
    const {
        isOpen,
        toggleCart,
        products,
        total
    } = useContext(CartContext)

    const [finishOrderDialogIsOpen, setfinishOrderDialogIsOpen] = useState<boolean>(false)
    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[80%]">
                <SheetHeader className="text-left">
                    <SheetTitle>Carrinho</SheetTitle>
                </SheetHeader>
                <div className="flex h-full flex-col py-5">
                    <div className="flex-auto">
                        {
                            products.map(product => (
                                <CartProductsItem key={product.id} product={product} />
                            ))
                        }
                    </div>
                    <Card className="mb-6">
                        <CardContent className="p-5">
                            <div className="flex justify-between">
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="font-semibold text-sm">{formatCurrency(total)}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Button
                        className="w-full rounded-full"
                        onClick={() => setfinishOrderDialogIsOpen(true)}
                    >Finalizar pedido</Button>
                    <FinishOrderDialog
                        open={finishOrderDialogIsOpen}
                        onOpenChange={setfinishOrderDialogIsOpen}
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CartSheet;