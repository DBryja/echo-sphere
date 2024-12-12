import { headers } from "next/headers";

export default function getDevice() {
  const device = headers().get("x-device-type") || "";
  const isDesktop = device === "desktop";
  const isPhone = device === "phone";
  const isTablet = device === "tablet";

  return { device, isDesktop, isTablet, isPhone };
}
