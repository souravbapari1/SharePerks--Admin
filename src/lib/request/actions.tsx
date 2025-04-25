import { NextClient } from "./request";

export const client = new NextClient("https://api.shareperks.in");
export const versionClient = new NextClient("https://services.shareperks.in");

export function AdminAuthToken() {
  return { Authorization: "Bearer " + localStorage.getItem("token") || "" };
}

export const workerClient = new NextClient("https://worker.shareperks.in");
export const brokerClient = new NextClient("http://147.93.27.87:8000");
