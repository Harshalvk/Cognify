"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditsPack, PackId } from "@/util/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { trpcClient } from "@/trpc/clients/client";

const PerchasePlan = () => {
  const router = useRouter();

  const [plan, setPlan] = useState(PackId.MEDIUM);

  const { mutateAsync: createCheckoutSession, data } =
    trpcClient.stripe.createSession.useMutation();

  const handleClick = () => {
    createCheckoutSession({ packId: plan });
  };

  useEffect(() => {
    if (data?.redirectUrl) {
      router.replace(data.redirectUrl);
    }
  }, [data, router]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase Credits</CardTitle>
        <CardDescription>
          Purchase Credits Select the number of credits you want to purchase
        </CardDescription>
        <CardAction>
          <Coins />
        </CardAction>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={plan}
          onValueChange={(value) => {
            setPlan(value as PackId);
          }}
        >
          {CreditsPack.map((pack) => (
            <div
              key={pack.id}
              className="flex items-center justify-between px-2 py-1 rounded-md bg-muted-foreground/5 hover:bg-muted-foreground/10"
              onClick={() => {
                setPlan(pack.id);
              }}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value={pack.id} id={pack.id} />
                <Label>
                  <span>
                    {pack.name} - {pack.label}
                  </span>
                </Label>
              </div>
              <span>$ {pack.price}</span>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={"secondary"} onClick={handleClick}>
          <Wallet />
          Purchase Credits
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PerchasePlan;
