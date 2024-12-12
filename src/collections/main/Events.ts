import { CollectionBeforeOperationHook, CollectionConfig } from "payload";
import type { Event } from "@/payload-types";
import { CustomError } from "@/collections/classes/CustomError";

const checkDates: CollectionBeforeOperationHook = async ({
  args,
  req,
  operation,
}) => {
  if (!(operation == "update" || operation == "create")) return args;

  const typedData = args.data as Partial<Event>;
  if (
    typedData.dateEnd &&
    typedData.date &&
    typedData.dateEnd !== "" &&
    new Date(typedData.dateEnd) < new Date(typedData.date)
  ) {
    throw new CustomError("End date must be after start date");
  }

  return args;
};

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    group: "Main",
    defaultColumns: ["heading", "subheading", "type", "date"],
  },
  hooks: {
    beforeOperation: [checkDates],
  },
  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Concert", value: "concert" },
        { label: "Festival", value: "festival" },
        { label: "Tour", value: "tour" },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "heading",
          type: "text",
          required: true,
        },
        {
          name: "subheading",
          type: "text",
          required: true,
          admin: {
            condition: (data, siblingData) => {
              return (
                siblingData.type === "festival" || siblingData.type === "tour"
              );
            },
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "date",
          type: "date",
          required: true,
          admin: {
            date: {
              pickerAppearance: "dayAndTime",
            },
          },
        },
        {
          name: "dateEnd",
          type: "date",
          required: false,
          admin: {
            date: {
              pickerAppearance: "dayAndTime",
            },
            description:
              "Optional field for end date of event if it spans multiple days",
          },
        },
      ],
    },
    {
      name: "address",
      type: "text",
      required: true,
      admin: {
        condition: (data, siblingData) => {
          return siblingData.type === "concert";
        },
      },
    },
    {
      name: "img-poster",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        condition: (data, siblingData) => {
          return siblingData.type === "festival" || siblingData.type === "tour";
        },
      },
    },
    {
      name: "related-artists",
      type: "relationship",
      relationTo: "artists",
      hasMany: true,
    },
    {
      name: "links",
      type: "group",
      fields: [
        {
          name: "website",
          type: "text",
          defaultValue: "",
        },
        {
          name: "tickets",
          type: "text",
          defaultValue: "",
        },
      ],
    },
  ],
};
