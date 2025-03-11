import { headers } from "next/headers";

export default async function getDevice() {
  const device = (await headers()).get("x-device-type") || "";
  const isDesktop = device === "desktop";
  const isPhone = device === "phone";
  const isTablet = device === "tablet";

  return { device, isDesktop, isTablet, isPhone };
}
