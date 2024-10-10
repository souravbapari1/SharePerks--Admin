import { NextClient } from "./request";

export const client = new NextClient("http://localhost:3000");

export function AdminAuthToken() {
  return { Authorization: "Bearer " + localStorage.getItem("token") || "" };
}
