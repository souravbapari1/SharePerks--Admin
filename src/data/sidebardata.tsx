import { SideBarDataSet } from "@/components/WorkSpace/SideBar/Sidebar";
import { BiSolidCoupon, BiSolidOffer } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { HiBanknotes } from "react-icons/hi2";
import { ImStack } from "react-icons/im";
import { IoMdGift } from "react-icons/io";
import { MdAppRegistration, MdCampaign, MdDashboard } from "react-icons/md";
import { PiPiggyBankBold } from "react-icons/pi";
import { RiCoupon3Line } from "react-icons/ri";
import { TbBrandSketch, TbGiftCard } from "react-icons/tb";

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
        icon: <BiSolidOffer size={20} />,
        label: "Offers",
        route: "#",
        children: [
          { label: "Manage  Offers", route: "/admin/offers" },
          { label: "Add New", route: "/admin/offers/new" },
        ],
      },

      // {
      //   icon: <RiCoupon3Line size={18} />,
      //   label: "Coupons",
      //   route: "#",
      //   children: [
      //     { label: "Manage Coupons", route: "/admin/coupon" },
      //     { label: "Add Coupon", route: "/admin/coupon/new" },
      //   ],
      // },
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
        label: "Gyftr Coupons",
        route: "#",
        children: [
          { label: "Manage Brands", route: "/admin/giftcards" },
          { label: "Add New", route: "/admin/gyftr" },
        ],
      },
      {
        icon: <TbGiftCard size={20} />,
        label: "Whoow Coupons",
        route: "#",
        children: [
          { label: "Manage Cards", route: "/admin/whoow/cards" },
          { label: "Add New", route: "/admin/whoow" },
        ],
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
