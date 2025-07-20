import { BaseComponent } from "@/util/types";
import Image from "next/image";
import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";

export interface IUserCardProps extends BaseComponent {
  user: {
    id: string;
    image: string | null;
    name: string;
  };
}

const UserCard = ({ user, children }: IUserCardProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-2">
          <Image
            src={user.image || "/user.png"}
            alt=""
            width={500}
            height={500}
            className="object-cover rounded h-16 w-16"
          />
          <div className="overflow-hidden">
            <div className="font-medium ">{user.name || "-"}</div>
            <div className="text-xs text-gray-500 whitespace-pre-wrap">
              {user.id}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="self-end">{children}</CardFooter>
    </Card>
  );
};

export default UserCard;
