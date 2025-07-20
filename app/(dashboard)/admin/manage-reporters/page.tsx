import { Title } from "@/components/Typography";
import { trpcServer } from "@/trpc/clients/server";
import React from "react";
import UserCard from "@/components/UserCard";
import CreateReporter from "./_components/CreateReporter";
import DeleteReporter from "./_components/DeleteReporter";

const ManageReportersPage = async () => {
  const reporters = await trpcServer.reporters.findAll.query();
  return (
    <div className="p-2">
      <div className="w-full flex justify-between items-center">
        <Title>Manage Reporters</Title>
        <CreateReporter />
      </div>

      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        {reporters.map((admin) => (
          <UserCard
            key={admin.id}
            user={{
              id: admin.User.id,
              image: admin.User.image,
              name: admin.User.name,
            }}
          >
            <DeleteReporter userId={admin.User.id} />
          </UserCard>
        ))}
      </div>
    </div>
  );
};

export default ManageReportersPage;
