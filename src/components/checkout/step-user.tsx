import { CheckoutStepUserProps } from "@/types/checkout";
import { Input } from "@/components/ui/input";
// Update the import to include FormMessage
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { userFormSchema } from "@/helpers/zodSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCheckoutStore } from "@/store/checkout-store";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { InputMask } from "@react-input/mask";
import { ChangeEvent } from "react";

export const StepUser = ({ setStep }: CheckoutStepUserProps) => {
  const { user, setUser } = useCheckoutStore((state) => state);

  const userForm: any = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      ...user,
    },
  });

  const onSubmit = (values: z.infer<typeof userFormSchema>) => {
    setUser(values);
    setStep("address");
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    return numbers.slice(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const formatDocumentNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    return numbers
      .slice(0, 14)
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const { toast } = useToast();

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">Dados do usuário</h2>
      <Form {...userForm}>
        <form onSubmit={userForm.handleSubmit(onSubmit)}>
          <FormField
            control={userForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 my-5">
                <FormLabel
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Nome
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={userForm.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 my-5">
                <FormLabel
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Telefone
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      field.onChange(formatted);
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="(XX) XXXXX-XXXX"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={userForm.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 my-5">
                <FormLabel
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            name="documentId"
            control={userForm.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 my-5">
                <FormLabel
                  htmlFor="documentId"
                  className="text-sm font-medium text-gray-700"
                >
                  CPF
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const formatted = formatDocumentNumber(e.target.value);
                      field.onChange(formatted);
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="XXX.XXX.XXX-XX"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <Button type="submit" variant={"outline"} className="w-full my-5">
            Continuar
          </Button>
        </form>
      </Form>
    </div>
  );
};
