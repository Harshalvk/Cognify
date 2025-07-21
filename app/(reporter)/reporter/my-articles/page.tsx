import AlertBox from "@/components/AlertBox";
import { trpcServer } from "@/trpc/clients/server";
import { AlertTriangle, Newspaper } from "lucide-react";
import React from "react";

const MyArticlesPage = async () => {
  const myArticles = await trpcServer.reporters.myArticles.query();

  if (!myArticles.length) {
    return (
      <AlertBox
        text="No Articles"
        icon={AlertTriangle}
        description="There are no articles yet please create one."
      >
        <div className="w-full flex items-center justify-center">
          <p className="bg-background rounded-full p-3">
            <Newspaper className="h-7 w-7 text-primary" />
          </p>
        </div>
      </AlertBox>
    );
  }

  return <div></div>;
};

export default MyArticlesPage;
