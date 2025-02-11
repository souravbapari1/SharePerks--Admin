"use server";

import { brokerClient } from "@/lib/request/actions";

export async function getAllBrokers(search: string) {
  return await brokerClient
    .get("/brokers", {
      search,
    })
    .send<BrokersRoot>();
}

type BrokersRoot = {
  page: number;
  size: number;
  total_items: number;
  total_pages: number;
  data: Array<{
    symbol: string;
    name_of_company: string;
    series: string;
    date_of_listing: string;
    paid_up_value: number;
    market_lot: number;
    isin_number: string;
    face_value: number;
  }>;
};
