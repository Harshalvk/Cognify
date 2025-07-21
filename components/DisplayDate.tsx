import { cn } from "@/lib/utils";
import React from "react";
import { format } from "date-fns";

export interface IDisplayDateProps {
  dateString: string;
  dateFormat?: string;
  className?: string;
}

const DisplayDate = ({
  dateString,
  dateFormat = "PPp",
  className,
}: IDisplayDateProps) => {
  return (
    <div className={(cn("text-sm"), className)}>
      {format(dateString, dateFormat)}
    </div>
  );
};

export default DisplayDate;
