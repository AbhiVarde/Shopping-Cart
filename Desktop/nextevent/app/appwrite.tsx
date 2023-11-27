import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("653e08b66373b5858139");

export const account = new Account(client);
export { ID } from "appwrite";
