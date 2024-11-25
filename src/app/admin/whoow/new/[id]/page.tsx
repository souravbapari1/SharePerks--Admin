import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import { WhoowProduct } from "@/interface/whoowProducts";
import { client } from "@/lib/request/actions";
import NewForm from "./NewForm";
import { BrandData } from "@/interface/brand";

async function page({ params }: { params: { id: string } }) {
  let product;
  console.log(params.id);

  try {
    product = await client
      .get("/api/v1/whoow/product/" + params.id)
      .send<WhoowProduct>();
    const brands = await client.get("/api/v1/brand/all").send<BrandData[]>();
    return (
      <WorkSpace menuGroups={menuGroups}>
        <NewForm product={product} brands={brands} />
      </WorkSpace>
    );
  } catch (error: any) {
    console.log(error);

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
