import Link from "next/link";
import type {Product} from "@/payload-types";
import "./ColorwayDot.scss"

interface ColorwayDotProps {
  relatedItem: Product;
  active?: boolean;
}

export default function ColorwayDot({ relatedItem: product, active = false }: ColorwayDotProps) {
 return (
   <Link href={`/store/${product.id}`}
         className={"colorwayDot"}
         aria-label={`Link to ${product.name} ${product.colorHEX ? "in color "+ product.colorHEX : ""}`}>
     <div className={`colorwayDot__dot ${active ? "colorwayDot__dot--active" : ""}`}
       style={{
         background: `#${product.colorHEX ? product.colorHEX : "FFFFFF"}`,
       }}
     />
   </Link>
 )
};

