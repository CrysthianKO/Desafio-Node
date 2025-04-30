import dotenv from "dotenv";

dotenv.config();

const getEnv = (key: string, required = true): string => {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`Missing env: ${key}`);
  }
  return value || "";
};

const parseArray = (key: string): string[] =>
  getEnv(key, false)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

export const env = {
  LISTA_CPF : parseArray("LISTA_CPF"),
};