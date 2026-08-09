// app/[locale]/page.tsx
import { HomePage } from "@/features/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Hossein Khedmati",
};

export default function Page() {
  return <HomePage />;
}
