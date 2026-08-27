import BildirimlerScreen from "@/components/panel/screens/BildirimlerScreen";
import { CoordinatorTaskAlert } from "@/components/panel/CoordinatorTaskAlert";

export default function Page() {
  return (
    <>
      <CoordinatorTaskAlert />
      <BildirimlerScreen sub="Bölgenizdeki görev ve risk hareketleri." />
    </>
  );
}
