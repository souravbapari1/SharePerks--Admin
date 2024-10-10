export const statusColors: Record<string, string> = {
  pending: "#fff9d9", // Orange
  complete: "#e1ffd9", // Green
  failed: "#ffebd9", // Red
  cancel: "#f7adb0", // Gray
};

export const LogType: Record<string, string> = {
  USER_ACTIVITY: "USER_ACTIVITY",
  CLICK_ACTIVITY: "CLICK_ACTIVITY",
  TRANSITS_ACTIVITY: "TRANSITS_ACTIVITY",
  PAYOUT_ACTIVITY: "PAYOUT_ACTIVITY",
  ORDER_ACTIVITY: "ORDER_ACTIVITY",
  SMALLCASE_ACTIVITY: "SMALLCASE_ACTIVITY",
};

export const TransitionsType: Record<string, string> = {
  REFERRAL: "REFERRAL",
  COMMOTION: "COMMOTION",
  PAYOUT: "PAYOUT",
  OTHERS: "OTHERS",
};

export const commissionProvider: {
  value: string;
  label: string;
}[] = [
  { value: "admitad", label: "Admitad" },
  { value: "cuelinks", label: "Cuelinks" },
];
