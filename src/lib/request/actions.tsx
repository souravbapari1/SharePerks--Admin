import { NextClient } from "./request";

export const client = new NextClient("https://api.shareperks.in");

export function AdminAuthToken() {
  return { Authorization: "Bearer " + localStorage.getItem("token") || "" };
}
