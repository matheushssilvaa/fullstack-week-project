import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import Image from "next/image";
import { notFound } from "next/navigation";
import ConsumptionMethodOption from "./components/consumption-method-options";

interface RestaurantePageProps {
    params: Promise<{ slug: string }>
}

const RestaurantPage = async ({ params }: RestaurantePageProps) => {
    const { slug } = await params;
    const restaurant = await getRestaurantBySlug(slug)
    if (!restaurant) {
        return notFound()
    }
    return (
        <div className="h-screen flex flex-col items-center justify-center px-6 pt-24">
            <div className="flex flex-col items-center gap-2">
                <Image src={restaurant?.avatarImageUrl} alt={restaurant?.name} width={82} height={82} />
                <h2 className="font-semibold">{restaurant.name}</h2>
            </div>
            <div className="space-y-2 pt-24 text-center">
                <h3 className="text-2xl font-semibold">
                    Seja bem vindo!
                </h3>
                <p className="opacity-55">
                    Escolha como prefere aproveitar sua refeição. Estamos aqui para te oferecer praticidade e sabor em cada detalhe!
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-14">
                <ConsumptionMethodOption
                    slug={slug}
                    buttonText="Para comer aqui"
                    imageUrl="/dine_in.png"
                    imageAlt="comer aqui"
                    option="DINE_IN"
                />
                <ConsumptionMethodOption
                    slug={slug}
                    buttonText="Para levar"
                    imageUrl="/takeaway.png"
                    imageAlt="para levar"
                    option="TAKEAWAY"
                />
            </div>
        </div>
    )
}

// server components - renderiza do lado do servidor
// podem ser async
// podem chamar recursos do back-end (banco de dados)
// não podem usar hooks nem interatividade

export default RestaurantPage;