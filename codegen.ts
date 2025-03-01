import type { CodegenConfig } from "@graphql-codegen/cli";

import envConfig from "./envConfig";

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [`https://graphql.contentful.com/content/v1/spaces/${envConfig.CONTENTFUL_SPACE_ID}`]:
      {
        headers: {
          Authorization: `Bearer ${envConfig.CONTENTFUL_ACCESS_TOKEN}`,
          method: "GET",
        },
      },
  },
  documents: ["src/graphql/queries/**/*.ts"],
  generates: {
    /**
     * The ./src/graphql/generated/contentful-graphql-types.ts file contains TypeScript type definitions for the GraphQL schema.
     * It can be used to ensure type safety.
     */
    "./src/graphql/generated/contentful-graphql-types.ts": {
      plugins: ["typescript"],
    },
    /**
     * The ./src/graphql/generated/graphql-query-types.ts file contains TypeScript type definitions for GraphQL queries, fragments and operations.
     * It helps in maintaining type safety for GraphQL operations.
     */
    "./src/graphql/generated/graphql-query-types.ts": {
      preset: "import-types", // See: https://the-guild.dev/graphql/codegen/plugins/presets/import-types-preset
      plugins: ["typescript-operations"],
      presetConfig: {
        typesPath: "./contentful-graphql-types",
      },
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;
