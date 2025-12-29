"use client"

import { isValidCpf, removeCpfPontiation } from "@/app/helpers/cpf";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import z from "zod";

const formSchema = z.object({
    cpf: z.string()
        .trim()
        .min(1, {
            message: "O CPF é obrigatório"
        })
        .refine((value) => isValidCpf(value), {
            message: "CPF Inválido"
        })
})

type FormSchema = z.infer<typeof formSchema>

const CpfForm = () => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema)
    })

    const router = useRouter()
    const pathName = usePathname()

    const onSubmit = (data: FormSchema) => {
        router.push(`${pathName}?cpf=${removeCpfPontiation(data.cpf)}`)
    }

    const handleCancel = () => {
        router.back()
    }

    return (
        <Drawer open>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Visualizar pedidos</DrawerTitle>
                    <DrawerDescription>Insira seu CPF abaixo para visualizar seus pedidos</DrawerDescription>
                </DrawerHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem className="px-4">
                                        <FormLabel>Seu CPF</FormLabel>
                                        <FormControl>
                                            <PatternFormat
                                                placeholder="Digite seu CPF..."
                                                format="###.###.###-##"
                                                customInput={Input}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DrawerFooter>
                                <Button type="submit" variant="destructive" className="w-full rounded-full">Confirmar</Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="w-full rounded-full" onClick={handleCancel}>Cancelar</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default CpfForm;