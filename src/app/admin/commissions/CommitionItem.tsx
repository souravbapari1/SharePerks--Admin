import { formatDate } from "@/lib/formateTime";
import Link from "next/link";
import { CommotionData } from "@/interface/commition";

const CommitionItem = ({ item }: { item: CommotionData }) => {
  return (
    <tr key={item._id}>
      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
        <p className="text-xs">Date: {formatDate(item.createdAt)}</p>
        <Link
          href={"/admin/customers/" + item.userData._id}
          className="font-medium text-black dark:text-white capitalize"
        >
          {item.userData.name}
        </Link>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white text-sm">
          <span className="font-extrabold"> {item.title}</span>
          <br />
          <span className="text-xs font-medium text-slate-200">
            {item.subtitle}
          </span>
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p
          className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium  uppercase`}
        >
          {item.status}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        {item.amount.toFixed(2)}
      </td>
    </tr>
  );
};

export default CommitionItem;
