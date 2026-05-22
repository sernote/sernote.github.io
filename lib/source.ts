import { docs, docsRu } from "collections/server";
import { loader } from "fumadocs-core/source";

export const source = loader({
  baseUrl: "/en/handbook",
  source: docs.toFumadocsSource()
});

export const sourceRuRoot = loader({
  baseUrl: "/handbook",
  source: docsRu.toFumadocsSource()
});

export const sourceRu = loader({
  baseUrl: "/ru/handbook",
  source: docsRu.toFumadocsSource()
});
