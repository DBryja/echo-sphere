import type { CollectionBeforeValidateHook } from "payload";

export const limitToOneRecord: CollectionBeforeValidateHook = async ({
  data,
  req,
  originalDoc,
}) => {
  const { payload } = req;
  const existingDocs = await payload.find({
    collection: "artistsArchive",
    limit: 0,
  });

  if (existingDocs.totalDocs > 0) {
    payload.logger.error("Only one record is allowed in this collection.");
    throw new Error("Only one record is allowed in this collection.");
  }
  return data;
};
