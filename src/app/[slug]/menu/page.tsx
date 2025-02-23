import { db } from "@/lib/prisma"
import { notFound } from "next/navigation";
import RestauranteHeader from "./components/header"
import RestaurantCategories from "./components/categories";

interface RestauranteMenuPageProps {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ consumptionMethod: string }>
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod);
}

const RestauranteMenuPage = async ({ params, searchParams }: RestauranteMenuPageProps) => {
    const { slug } = await params
    const { consumptionMethod } = await searchParams

    if (isConsumptionMethodValid(consumptionMethod)) {
        return notFound();
    }

    const restaurant = await db.restaurant.findUnique({
        where: { slug }, include: {
            menuCategories: {
                include: {
                    products: true
                }
            }
        }
    })

    if (!restaurant) {
        return notFound();
    }
    return (
        <div className="relative h-[250px] w-full">
            <RestauranteHeader restaurant={restaurant} />
            <RestaurantCategories restaurant={restaurant} />
        </div>
    )
}

export default RestauranteMenuPage;