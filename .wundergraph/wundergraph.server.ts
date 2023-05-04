import { configureWunderGraphServer } from "@wundergraph/sdk/server";
import type { HooksConfig } from "./generated/wundergraph.hooks";
import type { InternalClient } from "./generated/wundergraph.internal.client";

export default configureWunderGraphServer<HooksConfig, InternalClient>(() => ({
  hooks: {
    queries: {
      Dragons: {
        postResolve: async (hook) => {
          if (hook.response.errors) return hook.response;
          hook.response.data?.spacex_dragons?.push({
            name: process.env.FOO,
            active: true,
          });
          return hook.response;
        },
      },
    },
    mutations: {},
  }
}));
