"use client";

import { useSession } from "@/lib/auth-client";
import React from "react";

const ReporterPage = () => {
  const session = useSession();
  if (!session.data?.user) {
    return <p>Now auth</p>;
  }
  return (
    <div>
      <p>{session.data.user.name}</p>
      <p>{session.data.user.id}</p>
    </div>
  );
};

export default ReporterPage;
