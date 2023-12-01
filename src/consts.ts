import { iConfig } from "./interfaces";
import { readFileSync } from "fs";

export const config: iConfig = JSON.parse(readFileSync("config.json", "utf-8"));
// в мс
export const cooldown: number = 300000;

// Project settings
export const logFile = "./log.txt";