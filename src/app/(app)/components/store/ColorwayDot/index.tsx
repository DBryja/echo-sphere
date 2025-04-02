import Link from "next/link";
import type {Product} from "@/payload-types";
import "./ColorwayDot.scss"

interface ColorwayDotProps {
  relatedItem: Product;
}

export default function ColorwayDot({ relatedItem: product }: ColorwayDotProps) {
 return (
   <Link href={`/products/${product.id}`}
         className={"colorwayDot"}
         aria-label={`Link to ${product.name} ${product.colorHEX ? "in color "+ product.colorHEX : ""}`}>
     <div className={"colorwayDot__dot"}
       style={{
         background: `#${product.colorHEX ? product.colorHEX : "FFFFFF"}`,
       }}
     />
   </Link>
 )
};

