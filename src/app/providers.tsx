import GiftProvider from "@/contexts/GiftContext";

export default function Providers(props: { children: React.ReactNode }) {
  return <GiftProvider>{props.children}</GiftProvider>;
}
