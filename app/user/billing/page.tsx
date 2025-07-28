"use client";

import { Title } from "@/components/Typography";
import React from "react";
import UserCreditsCard from "./_components/UserCreditsCard";
import PerchasePlan from "./_components/PerchasePlan";
import { useSearchParams } from "next/navigation";
import PaymentSuccessModal from "./_components/PaymentSuccessModal";
import { trpcClient } from "@/trpc/clients/client";
import Transactions from "./_components/Transactions";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { RouterOutputs } from "@/trpc/clients/types";

const UserBillingPage = () => {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  const { data, isLoading } =
    trpcClient.creditBalance.myCreditBalance.useQuery();

  const { data: transactions } =
    trpcClient.transactions.myTransactions.useQuery();

  const columns: ColumnDef<
    RouterOutputs["transactions"]["myTransactions"][0]
  >[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "notes",
      header: "Detail",
    },
    {
      accessorKey: "inputTokens",
      header: "Input Tokens",
    },
    {
      accessorKey: "outputTokens",
      header: "Output Tokens",
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        const date = row.original.createdAt;
        return <p>{format(date, "EEEE, MMMM do yyyy")}</p>;
      },
    },
  ];

  if (!transactions) {
    return [];
  }

  return (
    <section className="p-4 space-y-8 max-w-7xl mx-auto">
      <Title>Billing</Title>
      <UserCreditsCard userCredits={data?.balance || 0} isLoading={isLoading} />
      <PerchasePlan />
      <Transactions data={transactions} columns={columns} />
      {success && <PaymentSuccessModal />}
    </section>
  );
};

export default UserBillingPage;
