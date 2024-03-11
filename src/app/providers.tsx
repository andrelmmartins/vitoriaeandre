import GiftProvider from "@/contexts/GiftContext";
import BingoProvider from "@/contexts/BingoContext";

export default function Providers(props: { children: React.ReactNode }) {
  return (
    <GiftProvider>
      <BingoProvider>{props.children}</BingoProvider>
    </GiftProvider>
  );
}
