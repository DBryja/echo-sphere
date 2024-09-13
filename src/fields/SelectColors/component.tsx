import {useEffect, useState} from "react";
import { SelectField } from "@payloadcms/ui/dist/fields/Select";
import { useField } from "@payloadcms/ui/dist/forms/useField";
import {getPayloadHMR}  from "@payloadcms/next/utilities";
import config from "@payload-config";
import { OptionObject, Option } from 'payload';

export const Component:({path}: { path: any }) => Promise<JSX.Element> = async ({path}) => {
    const {value, setValue} = useField<string>({path});
   const payload = await getPayloadHMR({config});
   //@ts-ignore
   const query = await payload.find(
       {
           collection: 'colors',
           pagination: false,
           sort: "name"
       }
   );
   const colors = query.docs as { name: string, id: string }[];
   const colorOptions:(Option[] | undefined)= colors.map((color) => {
       return {
           label: color.name.toUpperCase(),
           value: color.name,
       } as OptionObject;
   })

    // noinspection TypeScriptValidateTypes
    return (
        <div>
            <label className='field-label'>
                Colors
            </label>
            <SelectField
                path={path}
                name={path}
                options={colorOptions}
                value={value}
                onChange={(e: { value: string }) => setValue(e?.value)}
            />
    </div>
)
}