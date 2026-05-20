import { docs, docsRu } from "collections/server";
import { loader } from "fumadocs-core/source";

export const source = loader({
  baseUrl: "/handbook",
  source: docs.toFumadocsSource()
});

export const sourceRu = loader({
  baseUrl: "/ru/handbook",
  source: docsRu.toFumadocsSource()
});
