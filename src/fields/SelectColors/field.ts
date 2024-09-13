import {Field} from "payload"
import {Component}  from "./component"
//@ts-ignore
export const SelectColors: Field = {
    name: "color-custom",
    type: "text",
    admin: {
        components: {
            Field: Component
        }
    }
}