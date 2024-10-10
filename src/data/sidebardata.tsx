import { SideBarDataSet } from "@/components/WorkSpace/SideBar/Sidebar";
import { BiSolidCoupon, BiSolidOffer } from "react-icons/bi";
import { FaBlog, FaSeedling, FaUser } from "react-icons/fa";
import { FaEarthAmericas, FaUsersGear } from "react-icons/fa6";
import { GiFruitTree, GiLogicGateAnd } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";
import { HiBanknotes } from "react-icons/hi2";
import { ImProfile, ImStack } from "react-icons/im";
import { IoMdCode, IoMdGift } from "react-icons/io";
import { IoReloadCircleSharp } from "react-icons/io5";
import {
  MdAdminPanelSettings,
  MdAppRegistration,
  MdCampaign,
  MdOutlineDashboard,
  MdOutlineLiveTv,
} from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import {
  PiGraduationCapFill,
  PiPiggyBankBold,
  PiPottedPlantFill,
  PiProjectorScreenChartBold,
} from "react-icons/pi";
import {
  RiCodeBlock,
  RiCoupon3Line,
  RiPagesFill,
  RiPoliceBadgeLine,
} from "react-icons/ri";
import { TbBrandSketch, TbStackPush, TbUserCode } from "react-icons/tb";

export const menuGroups: SideBarDataSet[] = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: <MdDashboard size={20} />,
        label: "Dashboard",
        route: "/admin",
      },
      {
        icon: <FaUser size={17} />,
        label: "Customers",
        route: "/admin/customers",
      },
      // {
      //   icon: <MdAdminPanelSettings size={20} />,
      //   label: "Admins",
      //   route: "#",
      //   children: [
      //     { label: "Manager Admins", route: "/admin/soon/3" },
      //     { label: "Add New", route: "/admin/soon/133" },
      //   ],
      // },
      {
        icon: <HiBanknotes size={20} />,
        label: "Payout Request",
        route: "/admin/payouts",
      },
      {
        icon: <ImStack size={18} />,
        label: "Categories",
        route: "/admin/categories",
      },
      {
        icon: <TbBrandSketch size={20} />,
        label: "Brands",
        route: "#",
        children: [
          { label: "Manage Brands", route: "/admin/brands" },
          { label: "Add New", route: "/admin/brands/new" },
        ],
      },
      {
        icon: <PiPiggyBankBold size={20} />,
        label: "Commissions",
        route: "/admin/commissions",
      },
      {
        icon: <BiSolidCoupon size={20} />,
        label: "Gift Cards",
        route: "/admin/giftcards",
      },
      {
        icon: <BiSolidOffer size={20} />,
        label: "Offers",
        route: "#",
        children: [
          { label: "Manage  Offers", route: "/admin/offers" },
          { label: "Add New", route: "/admin/offers/new" },
        ],
      },

      {
        icon: <RiCoupon3Line size={18} />,
        label: "Coupons",
        route: "#",
        children: [
          { label: "Manage Coupons", route: "/admin/coupon" },
          { label: "Add Coupon", route: "/admin/coupon/new" },
        ],
      },
    ],
  },
  // {
  //   name: "Progress & Activities",
  //   menuItems: [
  //     {
  //       icon: <TbUserCode size={20} />,
  //       label: "User Activity",
  //       route: "/admin/soon/28",
  //     },
  //     {
  //       icon: <IoMdCode size={20} />,
  //       label: "Commotions Logs",
  //       route: "/admin/soon/29",
  //     },
  //     {
  //       icon: <RiCodeBlock size={20} />,
  //       label: "Gift Card Activity",
  //       route: "#",
  //     },
  //     {
  //       icon: <IoReloadCircleSharp size={20} />,
  //       label: "Manage Progress",
  //       route: "/admin/soon/211",
  //     },
  //   ],
  // },
  {
    name: "Others",
    menuItems: [
      {
        icon: <MdCampaign size={20} />,
        label: "Cuelinks Campaign",
        route: "/admin/cuelinks",
      },
      {
        icon: <IoMdGift size={20} />,
        label: "Gyftr Brands",
        route: "/admin/gyftr",
      },
      {
        icon: <MdAppRegistration size={20} />,
        label: "App Content",
        route: "/admin/app-content",
      },
      {
        icon: <HiOutlineLogout size={20} />,
        label: "Logout",
        route: "#",
      },
    ],
  },
];
