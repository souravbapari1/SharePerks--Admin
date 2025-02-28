"use client";
import Loader from "@/app/loading";
import TitleCard from "@/components/cards/TitleCard";
import { downloadExcel } from "@/helper/exceel";
import { WhoowCard } from "@/interface/whoowCards";
import { formatDate } from "@/lib/formateTime";
import { client } from "@/lib/request/actions";
import { toast } from "material-react-toastify";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";
import { FaFileExcel } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useMutation, useQuery } from "react-query";

function GiftCardsList() {
  const { isLoading, refetch, isError, data } = useQuery(
    "whoowCards",
    async () => {
      const res = await client.get("/api/v1/whoow").send<WhoowCard[]>();
      return res;
    },
    {
      onError(err) {
        console.log(err);
        toast.error("Something went wrong");
      },
    }
  );

  const deleteOne = useMutation({
    mutationKey: "deleteWhoowCard",
    mutationFn: async (id: string) => {
      const res = await client.delete(`/api/v1/whoow/${id}`).send();
      return res;
    },

    onError(err) {
      console.log(err);
      toast.error("Something went wrong");
    },
    onSuccess() {
      toast.dismiss();
      toast.success("Card deleted successfully");
      refetch();
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <TitleCard
        title="All Cards"
        action={
          <div
            onClick={() => {
              downloadExcel(data || [], "whoow-shareperks");
            }}
            className="bg-green-800  text-white py-1 flex justify-center items-center gap-2 rounded-lg text-sm px-4"
          >
            <FaFileExcel /> Export
          </div>
        }
      >
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>

            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Price
              </h5>
            </div>

            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Updated At
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Actions
              </h5>
            </div>
          </div>
          {data?.map((e) => {
            return (
              <div
                key={e._id}
                className={`grid grid-cols-3 sm:grid-cols-4 border-b border-stroke dark:border-strokedark `}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        e.previewImage ||
                        "https://www.tea-tron.com/antorodriguez/blog/wp-content/uploads/2016/04/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
                      }
                      alt="Brand"
                      width={348}
                      height={448}
                      className="w-14 h-14 bg-gray object-contain"
                    />
                  </div>
                  <p className="hidden text-black dark:text-white sm:block">
                    {e.data.name}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">
                    {e.pricing
                      .map((e) => {
                        return "₹" + e.amount.toFixed(1);
                      })
                      .join(" - ")}
                  </p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white uppercase">
                    {formatDate((e.updatedAt || "")?.toString())}
                  </p>
                </div>

                <div className=" items-center text-xl gap-6 justify-center p-2.5 flex xl:p-5">
                  <Link href={"/admin/whoow/update/" + e._id}>
                    <AiOutlineEdit />
                  </Link>
                  <MdDelete
                    color="red"
                    className="cursor-pointer"
                    onClick={async () => {
                      const confirm = window.confirm(
                        "Are you sure you want to delete this card?"
                      );
                      if (confirm) {
                        deleteOne.mutate(e._id);
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </TitleCard>
    </div>
  );
}

export default GiftCardsList;
