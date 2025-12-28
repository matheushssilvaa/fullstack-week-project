'use client'

import { Product } from "@prisma/client";
import { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface CartProduct extends Pick<Product, 'id' | 'name' | 'price' | 'imageUrl'> {
    quantity: number
}

export interface ICartContext {
    isOpen: boolean,
    products: CartProduct[],
    total: number,
    toggleCart: () => void,
    addProducts: (product: CartProduct) => void
    decreaseProduct: (productId: string) => void
    increaseProduct: (productId: string) => void
    removeProduct: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    total: 0,
    toggleCart: () => { },
    addProducts: () => { },
    decreaseProduct: () => { },
    increaseProduct: () => { },
    removeProduct: () => { }
})

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<CartProduct[]>([])
    const [isOpen, setisOpen] = useState<boolean>(false)

    const total = products.reduce((acc, products) => {
        return acc + products.price * products.quantity
    }, 0)

    const toggleCart = () => {
        setisOpen(prev => !prev)
    }

    const addProducts = (product: CartProduct) => {

        const productIsAlreadyOnTheCart = products.some(prevProducts => prevProducts.id == product.id)
        if (!productIsAlreadyOnTheCart) {
            return setProducts((prev) => [...prev, product])
        }

        // para cada item no carrinho, verifique se ele ja esta inserido e se estiver apenas incremente a quantidade se preciso
        setProducts((prevProducts) => {
            return prevProducts.map(prevProducts => {
                if (prevProducts.id == product.id) {
                    return {
                        ...prevProducts,
                        quantity: prevProducts.quantity + product.quantity
                    }
                }
                return prevProducts
            })
        })
    }
    const decreaseProduct = (productId: string) => {
        setProducts((prevProducts) => {
            return prevProducts.map(prevProduct => {
                if (prevProduct.id !== productId) {
                    return prevProduct
                }
                if (prevProduct.quantity == 1) {
                    return prevProduct
                }
                return { ...prevProduct, quantity: prevProduct.quantity - 1 }
            })
        })
    }

    const increaseProduct = (productId: string) => {
        setProducts((prevProducts) => {
            return prevProducts.map((prevProduct) => {
                if (prevProduct.id !== productId) {
                    return prevProduct
                }
                return { ...prevProduct, quantity: prevProduct.quantity + 1 }
            })
        })
    }

    const removeProduct = (productId: string) => {
        setProducts(prevProducts =>
            prevProducts.filter(prevProducts => { prevProducts.id !== productId })
        )
    }
    return (
        <CartContext.Provider
            value={{
                isOpen,
                products,
                total,
                toggleCart,
                addProducts,
                decreaseProduct,
                increaseProduct,
                removeProduct
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

