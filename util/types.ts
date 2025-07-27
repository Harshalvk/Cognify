import { ReactNode } from "react";

export type Role = "admin" | "reporter";

export type BaseComponent = {
  children?: ReactNode;
  className?: string;
};

export enum PackId {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export type CreditPack = {
  id: PackId;
  name: string;
  label: string;
  credits: number;
  price: number;
  priceId: string;
};

export const CreditsPack: CreditPack[] = [
  {
    id: PackId.SMALL,
    name: "Small Pack",
    label: "1000 credits",
    credits: 1000,
    price: 2,
    priceId: "price_1RpRZuSD8gEaTANGn6n2Pd55",
  },
  {
    id: PackId.MEDIUM,
    name: "Medium Pack",
    label: "5000 credits",
    credits: 5000,
    price: 6,
    priceId: "price_1RpRaWSD8gEaTANGuoaZMnFq",
  },
  {
    id: PackId.LARGE,
    name: "Large Pack",
    label: "10000 credits",
    credits: 10000,
    price: 9.89,
    priceId: "price_1RpRaySD8gEaTANG9gZOlU1o",
  },
];

export const getCreditsPack = (id: PackId) =>
  CreditsPack.find((p) => p.id === id)!;
