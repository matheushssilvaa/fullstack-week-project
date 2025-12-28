'use client'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Form,
    FormMessage,
    FormField,
    FormItem,
    FormLabel,
    FormControl
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"

import { PatternFormat } from "react-number-format"

const formSchema = z.object({
    name: z.string().trim().min(1, {
        message: "O nome é obrigatório"
    }),
    cpf: z.string().trim().min(1, {
        message: "O CPF é inválido"
    })
})

interface FinishOrderDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

type FormSchema = z.infer<typeof formSchema>

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            cpf: ''
        },
        shouldUnregister: true
    })

    const onSubmit = (data: FormSchema) => {
        console.log(data)
    }

    // SERVER ACTIONS
    // - funções que são executadas no servidor, mas podem ser chamadas por client components

    return (
        <div>
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Finalizar pedido</DrawerTitle>
                        <DrawerDescription>Insira suas informações abaixo para finalizar seu pedido</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-5">
                        <Form {...form}>
                            <form id="form-rhf-demo"
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-5" >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Seu nome</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Digite seu nome..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="cpf"
                                    render={({ field }) => (
                                        <FormItem>
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
                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        className="rounded-full"
                                    >Finalizar</Button>
                                    <DrawerClose asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full rounded-full"
                                        >Cancelar</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </form>
                        </Form>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default FinishOrderDialog