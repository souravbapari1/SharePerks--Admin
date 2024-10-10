import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import PayoutsList from "./PayoutsList";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

function Payouts() {
  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="Payout Requests" />
      <PayoutsList />
    </WorkSpace>
  );
}

export default Payouts;
