import { Language, Style, Verbosity, WordComplexity } from "@prisma/client";
import z from "zod";

export const createEditorSchema = z.object({
  name: z.string(),
  style: z.enum(Style),
  language: z.enum(Language),
  verbosity: z.enum(Verbosity),
  wordComplexity: z.enum(WordComplexity),
  additionalNotes: z.string().max(300, { message: "Max 300 characters" }),
  editorImage: z.string().optional().nullable(),
});
