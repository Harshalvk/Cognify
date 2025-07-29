import { createEditorSchema } from "@/validator/editor.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type FormTypeCreateEditor = z.infer<typeof createEditorSchema>;

export const useFormCreateEditor = () =>
  useForm<FormTypeCreateEditor>({
    resolver: zodResolver(createEditorSchema),
  });
