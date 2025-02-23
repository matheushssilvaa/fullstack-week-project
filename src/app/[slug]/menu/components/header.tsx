'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ScrollText, ScrollTextIcon } from "lucide-react";
import { Restaurant } from "@prisma/client";
import { useRouter } from "next/navigation";

interface RestauranteHeaderProps {
    restaurant: Pick<Restaurant, 'name' | 'coverImageUrl'> // usado para acessar atributos especificos
}

const RestauranteHeader = ({ restaurant }: RestauranteHeaderProps) => {
    const router = useRouter();
    const handleBackClick = () => router.back()
    return (
        <>
            <div className="relative h-[250px] w-full">
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-4 left-4 rounded-full z-50"
                    onClick={handleBackClick}
                >
                    <ChevronLeftIcon />
                </Button>
                <Image
                    src={restaurant.coverImageUrl}
                    fill
                    alt={restaurant.name}
                    className="object-cover"
                />
                <Button variant="secondary" size="icon" className="absolute top-4 right-4 rounded-full z-50">
                    <ScrollTextIcon />
                </Button>
            </div>
        </>
    )
}

export default RestauranteHeader;