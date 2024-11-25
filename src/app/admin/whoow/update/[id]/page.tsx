import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import { WhoowProduct } from "@/interface/whoowProducts";
import { client } from "@/lib/request/actions";

import { BrandData } from "@/interface/brand";
import { WhoowCard } from "@/interface/whoowCards";
import UpdateForm from "./UpdateForm";

async function page({ params }: { params: { id: string } }) {
  let product;

  try {
    product = await client.get("/api/v1/whoow/" + params.id).send<WhoowCard>();
    const brands = await client.get("/api/v1/brand/all").send<BrandData[]>();
    return (
      <WorkSpace menuGroups={menuGroups}>
        <Breadcrumb pageName="Update Gift Card" />
        <UpdateForm brands={brands} product={product} />
      </WorkSpace>
    );
  } catch (error: any) {
    return (
      <WorkSpace menuGroups={menuGroups}>
        <Breadcrumb pageName="Create Gift Card" />
        <div>Error loading data. Please try again later.</div>
        <p> {error.toString()}</p>
      </WorkSpace>
    );
  }
}

export default page;
