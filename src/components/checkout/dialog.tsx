"use client";
import { CheckoutProps, Steps } from "@/types/checkout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Progress } from "../ui/progress";
import { useCallback, useState } from "react";
import { StepUser } from "./step-user";
import { StepAddress } from "./step-address";
import { StepFinish } from "./step-finish";

export const CheckoutDialog = ({
  checkoutOpen,
  setCheckoutOpen,
}: CheckoutProps) => {
  const [steps, setSteps] = useState<Steps>("user");

  const stepProgress: Record<Steps, number> = {
    user: 33,
    address: 66,
    finish: 100,
  };

  const progressPercentage = stepProgress[steps];

  const stepTitles: Record<Steps, string> = {
    user: "Dados Pessoais",
    address: "Endereço de entrega",
    finish: "Envio para WhatsApp",
  };

  const handleInteractOutside = useCallback(
    (event: any) => event.preventDefault(),
    []
  );

  return (
    <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
      <DialogContent
        className="flex flex-col gap-y-8"
        onInteractOutside={handleInteractOutside}
      >
        <DialogHeader>
          <DialogTitle>{stepTitles[steps]}</DialogTitle>
        </DialogHeader>
        <Progress value={progressPercentage} />
        <div className="flex flex-col gap-3">
          {steps === "user" ? (
            <StepUser setStep={setSteps} />
          ) : steps === "address" ? (
            <StepAddress setStep={setSteps} />
          ) : (
            <StepFinish />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
