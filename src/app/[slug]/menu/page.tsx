import { db } from "@/lib/prisma"
import { notFound } from "next/navigation";
import RestauranteHeader from "./components/header"

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
    const restaurant = await db.restaurant.findUnique({ where: { slug } })
    if (!restaurant) {
        return notFound();
    }
    return (
        <div className="relative h-[250px] w-full">
            <RestauranteHeader restaurant={restaurant} />
        </div>
    )
}

export default RestauranteMenuPage;