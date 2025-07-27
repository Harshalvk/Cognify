"use client";

import { Title } from "@/components/Typography";
import React from "react";
import UserCreditsCard from "./_components/UserCreditsCard";
import PerchasePlan from "./_components/PerchasePlan";
import { useSearchParams } from "next/navigation";
import PaymentSuccessModal from "./_components/PaymentSuccessModal";
import { trpcClient } from "@/trpc/clients/client";
import Transactions from "./_components/Transactions";

const UserBillingPage = () => {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  const { data, isLoading } =
    trpcClient.creditBalance.myCreditBalance.useQuery();

  return (
    <section className="p-4 space-y-8 max-w-7xl mx-auto">
      <Title>Billing</Title>
      <UserCreditsCard userCredits={data?.balance || 0} isLoading={isLoading} />
      <PerchasePlan />
      <Transactions />
      {success && <PaymentSuccessModal />}
    </section>
  );
};

export default UserBillingPage;
