import { createEditorSchema } from "@/validator/editor.validator";
import { createTRPCRouter, protectedProcedure } from "..";

export const editorRoutes = createTRPCRouter({
  create: protectedProcedure()
    .input(createEditorSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.editor.create({ data: { ...input, userId: ctx.userId } });
    }),
});
