import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import WorkSpace from "@/components/WorkSpace/WorkSpace";
import { menuGroups } from "@/data/sidebardata";
import NewOfferForm from "./NewOfferForm";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { CategoryType } from "@/interface/categoty";
import { BrandData } from "@/interface/brand";
import { Campaign } from "@/interface/cuelinks";

export const revalidate = 0;
async function page({ searchParams }: { searchParams: { campaign?: string } }) {
  let campaign: Campaign | undefined;
  if (searchParams.campaign) {
    try {
      const data = await client
        .get("/api/v1/cuelinks/" + searchParams.campaign)
        .send<{ data: Campaign }>();
      if (data) {
        campaign = data.data;
      } else {
        console.log("No data");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const categories = await client
    .get("/api/v1/categories")
    .send<CategoryType[]>();

  const brands = await client.get("/api/v1/brand/all").send<BrandData[]>();

  return (
    <WorkSpace menuGroups={menuGroups}>
      <Breadcrumb pageName="New Offer" />
      <NewOfferForm
        brands={brands}
        categories={categories}
        campaign={campaign}
      />
    </WorkSpace>
  );
}

export default page;
