import Link from "next/link";

export default function Home() {
  return (
    <div style={{minHeight: "300dvh"}}>
        <Link href={"/admin"}>Admin</Link>
    </div>
  );
}
