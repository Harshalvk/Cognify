import { Role } from "@/util/types";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import CopyToClipboard from "./CopyToClipboard";

export interface ITellThemProps {
  uid: string;
  role: Role;
}

const TellThem = ({ uid, role }: ITellThemProps) => {
  return (
    <div className="h-screen max-w-5xl mx-auto flex items-center">
      <Alert>
        <AlertCircle />
        <AlertTitle>
          Look&apos;s like you&apos;re missing the {role} badge
        </AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          Request assistance from our admins and provide your ID.
          <CopyToClipboard text={uid} />
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default TellThem;
