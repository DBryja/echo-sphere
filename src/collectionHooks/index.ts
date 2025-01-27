import type { CollectionBeforeValidateHook, CollectionSlug } from "payload";

export const limitToOneRecord: CollectionBeforeValidateHook = async ({
  data,
  req,
  collection,
  operation,
}) => {
  const { payload } = req;
  const existingDocs = await payload.find({
    collection: collection.slug as CollectionSlug,
    limit: 0,
  });

  if (operation === "create" && existingDocs.totalDocs > 0) {
    payload.logger.error("Only one record is allowed in this collection.");
    throw new Error("Only one record is allowed in this collection.");
  }
  return data;
};
