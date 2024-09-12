import {useEffect, useState} from "react";
import {SelectInput} from "@payloadcms/ui";
import {useField} from "@payloadcms/ui";
import {getPayloadHMR}  from "@payloadcms/next/utilities";
import config from "@payload-config";

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
   const colorOptions = colors.map((color) => {
       return {
           label: color.name.toUpperCase(),
           value: color.name,
       };
   });



    return (
        <div>
            <label className='field-label'>
                Colors
            </label>
            <SelectInput
                path={path}
                name={path}
                options={options}
                value={value}
                onChange={(e) => setValue(e.value)}
            />
    </div>
)
}