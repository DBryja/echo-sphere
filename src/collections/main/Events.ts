import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
    slug: 'events',
    admin: {
        group: "Main",
        defaultColumns: ["heading", "subheading", "type", "date"],
    },
    fields: [
        {
            name: 'type',
            type: 'select',
            required: true,
            options: [
                { label: 'Concert', value: 'concert' },
                { label: 'Festival', value: 'festival' },
                { label: 'Tour', value: 'tour' },
            ],
        },
        {
            type: "row",
            fields: [
                {
                    name: 'heading',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'subheading',
                    type: 'text',
                    required: true,
                    admin: {
                        condition: (data, siblingData) => {
                            return siblingData.type === 'festival' || siblingData.type === 'tour'
                        }
                    }
                },
            ]
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
                }
            },
              {
                  name: "dateEnd",
                  type: "date",
                  required: false,
                  admin: {
                      date: {
                          pickerAppearance: "dayAndTime",
                      },
                      description: "Optional field for end date of event if it spans multiple days"
                  },
                  hooks: {
                      beforeValidate: [
                          ({data, originalDoc}) => {
                              if (data.dateEnd && new Date(data.dateEnd) < new Date(data.date)) {
                                  throw new Error("End date must be after start date")
                              }
                              return data
                          }
                      ]
                  }
              },
          ]
        },
        {
            name: "address",
            type: "text",
            required: true,
            admin: {
                condition: (data, siblingData) => {
                    return siblingData.type === 'concert'
                }
            }
        },
        {
            name: "img-poster",
            type: "upload",
            relationTo: "media",
            required: true,
            admin: {
                condition: (data, siblingData) => {
                    return siblingData.type === 'festival' || siblingData.type === 'tour'
                }
            }
        },
        {
            name: "related-artists",
            type: "relationship",
            relationTo: "artists",
            hasMany: true,
        },
        {
            name: 'links',
            type: 'group',
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
            ]
        }
    ],
}