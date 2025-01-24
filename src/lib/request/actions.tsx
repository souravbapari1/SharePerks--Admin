import { NextClient } from "./request";

export const client = new NextClient("http://localhost:7565");

export function AdminAuthToken() {
  return { Authorization: "Bearer " + localStorage.getItem("token") || "" };
}
