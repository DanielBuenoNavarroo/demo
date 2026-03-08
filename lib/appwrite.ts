import { Account, Client } from "react-native-appwrite";
import { config } from "./config";

export const client = new Client()
  .setEndpoint(config.env.appwrite.endpoint)
  .setProject(config.env.appwrite.projectId)
  .setPlatform(config.env.appwrite.platform);

export const account = new Account(client);
