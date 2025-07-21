import { LucideIcon } from "lucide-react";
import React from "react";

const AlertBox = ({
  text,
  description,
  icon: Icon,
  children,
}: {
  text: string;
  description?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}) => {
  return (
    <section
      aria-label="alert-box"
      className="w-full flex justify-center items-center px-4 mt-2"
    >
      <div className="max-w-4xl w-full p-2 sm:p-3 bg-muted rounded-lg border shadow-sm text-center">
        <div className="flex flex-col items-center">
          {Icon && <Icon className="w-6 h-6 text-primary" aria-hidden="true" />}
          <h1 className="text-lg sm:text-xl font-semibold">{text}</h1>
          {description && (
            <p className="text-muted-foreground text-sm sm:text-base">
              {description}
            </p>
          )}
        </div>
        {children && <div className="mt-2 w-full">{children}</div>}
      </div>
    </section>
  );
};

export default AlertBox;
