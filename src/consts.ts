import { iConfig } from "./interfaces";
import { readFileSync } from "fs";

export const config: iConfig = JSON.parse(readFileSync("config.json", "utf-8"));

// Project settings
export const cooldown: number = 60 * 60 * 1000; // in miliseconds