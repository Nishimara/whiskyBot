import { iConfig } from "./interfaces";
import { readFileSync } from "fs";

export const config: iConfig = JSON.parse(readFileSync("config.json", "utf-8"));

// Project settings
export const logFile: string = "./log.txt";
export const cooldown: number = 300000; // in miliseconds