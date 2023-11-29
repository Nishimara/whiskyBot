import { readFileSync } from "fs";
import { iConfig } from "./interfaces";

const token: iConfig = JSON.parse(readFileSync('config.json', 'utf-8'));