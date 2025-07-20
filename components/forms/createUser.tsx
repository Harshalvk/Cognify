import { createUserSchema } from "@/validator/user.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type FormTypeCreateUser = z.infer<typeof createUserSchema>;

export const useFormCreateUser = () =>
  useForm<FormTypeCreateUser>({
    resolver: zodResolver(createUserSchema),
  });
