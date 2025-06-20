"use client";
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
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { useForm } from "react-hook-form";
import { addressFormSchema } from "@/helpers/zodSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCheckoutStore } from "@/store/checkout-store";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { CepResponse, State } from "@/types/api-correios";

export const StepAddress = ({ setStep }: CheckoutStepUserProps) => {
  const { address, setAddress } = useCheckoutStore((state) => state);
  const [states, setStates] = useState<State[]>([]);
  const [stateFilter, setStateFilter] = useState("");
  const { toast } = useToast();

  const addressForm = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      zipCode: address?.zipCode || "",
      street: address?.street || "",
      number: address?.number || "",
      complement: address?.complement || "",
      district: address?.district || "",
      city: address?.city || "",
      state: address?.state || "",
    },
  });

  const fetchStates = async () => {
    try {
      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      const data = await response.json();
      setStates(
        data.sort((a: State, b: State) => a.nome.localeCompare(b.nome))
      );
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de estados",
        variant: "destructive",
      });
    }
  };

  const filteredStates = states.filter(
    (state) =>
      state.nome.toLowerCase().includes(stateFilter.toLowerCase()) ||
      state.sigla.toLowerCase().includes(stateFilter.toLowerCase())
  );

  const fetchAddressData = async (cep: string) => {
    if (cep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data: CepResponse = await response.json();

      if ("erro" in data && data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "Verifique o CEP informado",
          variant: "destructive",
        });
        return;
      }

      addressForm.setValue("street", data.logradouro);
      addressForm.setValue("district", data.bairro);
      addressForm.setValue("city", data.localidade);
      addressForm.setValue("state", data.uf.toLowerCase());
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao buscar o endereço",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const onSubmit = (values: z.infer<typeof addressFormSchema>) => {
    setAddress(values);
    setStep("finish");
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">Dados de Entrega</h2>
      <Form {...addressForm}>
        <form onSubmit={addressForm.handleSubmit(onSubmit)}>
          <div className="grid cel:grid-cols-1 cel2:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              control={addressForm.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const cep = e.target.value.replace(/\D/g, "");
                        field.onChange(cep);
                        if (cep.length === 8) {
                          fetchAddressData(cep);
                        }
                      }}
                      maxLength={8}
                      placeholder="00000000"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addressForm.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addressForm.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addressForm.control}
              name="complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addressForm.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addressForm.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addressForm.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent className="w-56 h-80 p-3 border dark:bg-black bg-white dark:border-slate-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                        <div className="mb-2 sticky top-0 bg-white dark:bg-black z-10">
                          <Input
                            placeholder="Buscar estado..."
                            value={stateFilter}
                            onChange={(e) => setStateFilter(e.target.value)}
                            className="mb-2"
                          />
                        </div>
                        {stateFilter.length === 0
                          ? states.map((state) => (
                              <SelectItem
                                key={state.id}
                                value={state.sigla.toLowerCase()}
                              >
                                {state.nome}
                              </SelectItem>
                            ))
                          : filteredStates.map((state: any) => (
                              <SelectItem
                                key={state.id}
                                value={state.sigla.toLowerCase()}
                              >
                                {state.nome}
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between mt-4">
            <Button
              variant={"link"}
              onClick={() => setStep("user")}
              className="w-full my-5"
            >
              Voltar
            </Button>
            <Button type="submit" variant={"outline"} className="w-full my-5">
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
