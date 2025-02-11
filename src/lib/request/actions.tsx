import { NextClient } from "./request";

// export const client = new NextClient("https://api.shareperks.in");
export const client = new NextClient("http://localhost:7565");

export function AdminAuthToken() {
  return { Authorization: "Bearer " + localStorage.getItem("token") || "" };
}

export const workerClient = new NextClient("https://worker.shareperks.in");
export const brokerClient = new NextClient("http://147.93.27.87:8000");
