export type DashBoard = {
  totalUsers: number;
  totalClicks: number;
  totalPayoutPending: number;
  liveUsers: number;
  totalSell: number;
  totalCommission: number;
  payoutPi: {
    pending: number;
    cancel: number;
    complete: number;
    failed: number;
  };
  inOutPi: {
    in: number;
    out: number;
  };
  giftcards: {
    gifter: number;
    whoow: number;
    sucessOrders: number;
  };
};
