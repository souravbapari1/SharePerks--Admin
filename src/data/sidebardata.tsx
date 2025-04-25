import { SideBarDataSet } from "@/components/WorkSpace/SideBar/Sidebar";
import {
  BiMobileLandscape,
  BiNotification,
  BiSolidOffer,
} from "react-icons/bi";
import { BsAndroid } from "react-icons/bs";
import { FaPercent, FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { HiBanknotes } from "react-icons/hi2";
import { ImStack } from "react-icons/im";
import { IoMdGift } from "react-icons/io";
import {
  MdAppRegistration,
  MdCampaign,
  MdDashboard,
  MdEmail,
  MdMarkEmailUnread,
} from "react-icons/md";
import { PiPiggyBankBold } from "react-icons/pi";
import { RiAdminFill, RiCodeBlock } from "react-icons/ri";
import {
  TbBrandSketch,
  TbGiftCard,
  TbGiftCardFilled,
  TbUserCode,
} from "react-icons/tb";

export const permissionList = [
  { text: "Manage Customers", value: "manage_customers" },
  { text: "Manage Payouts", value: "manage_payouts" },
  { text: "Manage Category", value: "manage_category" },
  { text: "Manage Brands", value: "manage_brands" },
  { text: "Manage Offers", value: "manage_offers" },
  { text: "Manage Grifter Coupons", value: "grifter_coupones" },
  { text: "Manage Whoow Coupons", value: "whoow_coupones" },
  { text: "Manage App Content", value: "app_content" },
  { text: "Manage Admin", value: "manage_admin" },
  { text: "Cuelinks Campaign", value: "cuelinks_campaign" },
  { text: "Manage Push Notification", value: "manage_push_notification" },
  { text: "Manage Rewords", value: "manage_rewords" },
] as const;

export type PermissionValue = (typeof permissionList)[number]["value"];

export const isPermissionAllow = (check: PermissionValue): boolean => {
  if (window.localStorage) {
    const role = window.localStorage.getItem("role");
    const permission = window.localStorage.getItem("permission");

    if (role == "ADMIN") {
      return true;
    } else {
      try {
        const permissionData: typeof permissionList = JSON.parse(
          permission || ""
        );
        return permissionData.find((p) => p.value === check)?.value === check;
      } catch (error) {
        return false;
      }
    }
  }
  return false;
};

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
        key: "manage_customers",
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
        key: "manage_payouts",
      },
      {
        icon: <ImStack size={18} />,
        label: "Categories",
        route: "/admin/categories",
        key: "manage_category",
      },
      {
        icon: <TbBrandSketch size={20} />,
        label: "Brands",
        route: "#",
        key: "manage_brands",
        children: [
          { label: "Manage Brands", route: "/admin/brands" },
          { label: "Add New", route: "/admin/brands/new" },
        ],
      },
      {
        icon: <TbUserCode size={20} />,
        label: "User Activity",
        route: "/admin/activity",
      },
      {
        icon: <PiPiggyBankBold size={20} />,
        label: "Commissions",
        route: "/admin/commissions",
        key: "manage_commissions",
      },
      {
        icon: <RiAdminFill size={20} />,
        label: "Admins Management",
        route: "/admin/admins",
        key: "manage_admins",
      },

      {
        icon: <BiSolidOffer size={20} />,
        label: "Offers",
        route: "#",
        key: "manage_offers",
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
        icon: <FaPercent size={20} />,
        label: "Manage Rewards",
        route: "/admin/manage-rewards",
        key: "manage_rewords",
      },
      {
        icon: <MdCampaign size={20} />,
        label: "Cuelinks Campaign",
        route: "/admin/cuelinks",
        key: "cuelinks_campaign",
      },
      {
        icon: <IoMdGift size={20} />,
        label: "Gyftr Coupons",
        route: "#",
        key: "grifter_coupones",
        children: [
          { label: "Manage Brands", route: "/admin/giftcards" },
          { label: "Add New", route: "/admin/gyftr" },
        ],
      },
      {
        icon: <TbGiftCard size={20} />,
        label: "Whoow Coupons",
        route: "#",
        key: "whoow_coupones",
        children: [
          { label: "Manage Cards", route: "/admin/whoow/cards" },
          { label: "Add New", route: "/admin/whoow" },
        ],
      },
      {
        icon: <RiCodeBlock size={20} />,
        label: "Gift Card Orders",
        route: "/admin/giftcards/orders",
      },
      {
        icon: <TbGiftCardFilled size={20} />,
        label: "Gift Card Errors",
        route: "/admin/giftcards/failed",
        key: "errors_coupones",
      },
      {
        icon: <MdAppRegistration size={20} />,
        label: "App Content",
        route: "/admin/app-content",
        key: "app_content",
      },
      {
        icon: <BsAndroid size={20} />,
        label: "App Version",
        route: "/admin/version",
        key: "app_content",
      },
      {
        icon: <BiNotification size={20} />,
        label: "Push Notification",
        route: "/admin/push-notification",
        key: "manage_push_notification",
      },
      {
        icon: <MdMarkEmailUnread size={20} />,
        label: "Email Alerts",
        route: "/admin/email",
        key: "manage_push_notification",
      },
      {
        icon: <HiOutlineLogout size={20} />,
        label: "Logout",
        route: "/logout",
      },
    ],
  },
];
