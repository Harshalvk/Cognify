import "server-only";

import { headers } from "next/headers";
import { createTRPCContext } from "../server";
import { createTRPCProxyClient, TRPCClientError } from "@trpc/client";
import { appRouter, AppRouter } from "../server/routers";
import { observable } from "@trpc/server/observable";
import { type TRPCErrorResponse } from "@trpc/server/rpc";
import { callTRPCProcedure } from "@trpc/server";
import { cache } from "react";

const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

export const trpcServer = createTRPCProxyClient<AppRouter>({
  links: [
    () =>
      ({ op: { input, path, type } }) => {
        return observable((observer) => {
          const abortController = new AbortController();

          (async () => {
            try {
              const ctx = await createContext();

              const data = await callTRPCProcedure({
                ctx,
                path,
                input,
                type,
                router: appRouter,
                getRawInput: async () => input,
                signal: abortController.signal,
              });

              observer.next({ result: { data } });
              observer.complete();
            } catch (cause) {
              observer.error(TRPCClientError.from(cause as TRPCErrorResponse));
            }
          })();

          return () => {
            abortController.abort();
          };
        });
      },
  ],
});
