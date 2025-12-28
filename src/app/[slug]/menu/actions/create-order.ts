'use server'

import { db } from "@/lib/prisma"
import { ConsumptionMethod } from "@prisma/client"

interface CreateOrderInput {
    customerName: string,
    customerCPF: string,
    products: Array<{
        id: string,
        quantity: number
    }>
    consumptionMethod: ConsumptionMethod,
    restaurantId: string,
    total: number
}

export const createOrder = async (input: CreateOrderInput) => {
    const productsFromDb = await db.product.findMany({
        where: {
            id: {
                in: input.products.map(p => p.id),
            },
        },
        select: {
            id: true,
            price: true,
        }
    })

    // Montar estrutura com id, quantidade e preço
    const productsWithPricesAndQuantity = input.products.map(product => {
        const productData = productsFromDb.find(p => p.id === product.id)
        if (!productData) {
            throw new Error(`Produto não encontrado: ${product.id}`)
        }

        return {
            productId: product.id,
            quantity: product.quantity,
            price: productData.price,
        }
    })

    const total = productsWithPricesAndQuantity.reduce(
        (acc, item) => acc + item.price * item.quantity, 0)

    await db.order.create({
        data: {
            status: "PENDING",
            customerName: input.customerName,
            customerCpf: input.customerCPF,
            orderProducts: {
                createMany: {
                    data: productsWithPricesAndQuantity
                }
            },
            total,
            consumptionMethod: input.consumptionMethod,
            restaurantId: input.restaurantId
        }
    })
}
