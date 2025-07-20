import { Title } from "@/components/Typography";
import { trpcServer } from "@/trpc/clients/server";
import React from "react";
import UserCard from "@/components/UserCard";
import CreateAdmin from "./_components/CreateAdmin";
import DeleteAdmin from "./_components/DeleteAdmin";

const ManageAdminsPage = async () => {
  const admins = await trpcServer.admins.findAll.query();
  return (
    <div className="p-2">
      <div className="w-full flex justify-between items-center">
        <Title>Manage Admins</Title>
        <CreateAdmin />
      </div>

      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        {admins.map((admin) => (
          <UserCard
            key={admin.id}
            user={{
              id: admin.User.id,
              image: admin.User.image,
              name: admin.User.name,
            }}
          >
            <DeleteAdmin userId={admin.User.id} />
          </UserCard>
        ))}
      </div>
    </div>
  );
};

export default ManageAdminsPage;
