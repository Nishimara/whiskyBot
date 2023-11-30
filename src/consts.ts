import { iConfig } from "./interfaces";
import { readFileSync } from "fs";

export const config: iConfig = JSON.parse(readFileSync("config.json", "utf-8"));

// Project settings
export const logFile = "./log.txt";