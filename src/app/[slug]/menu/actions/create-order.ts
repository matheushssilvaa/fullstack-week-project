'use server'

import { removeCpfPontiation } from "@/app/helpers/cpf"
import { db } from "@/lib/prisma"
import { ConsumptionMethod } from "@prisma/client"
import { redirect } from "next/navigation"

interface CreateOrderInput {
    customerName: string,
    customerCPF: string,
    products: Array<{
        id: string,
        quantity: number
    }>
    consumptionMethod: ConsumptionMethod,
    slug: string,
}

export const createOrder = async (input: CreateOrderInput) => {
    const restaurant = await db.restaurant.findUnique({
        where: {
            slug: input.slug
        }
    })

    if (!restaurant) {
        throw new Error("Restaurant not found")
    }

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
            customerCpf: removeCpfPontiation(input.customerCPF),
            orderProducts: {
                createMany: {
                    data: productsWithPricesAndQuantity
                }
            },
            total,
            consumptionMethod: input.consumptionMethod,
            restaurantId: restaurant.id
        }
    });
    redirect(`/${input.slug}/orders`)
}
