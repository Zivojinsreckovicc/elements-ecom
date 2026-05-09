export type ImpactStat = {
  id: string;
  /** Numeric value to count toward */
  target: number;
  /** Shown after the number (e.g. "+", "%") */
  suffix: string;
  label: string;
  /** "comma" → 10,000 | "plain" → 500 */
  format: "comma" | "plain";
};

export const impactStats: ImpactStat[] = [
  {
    id: "customers",
    target: 10000,
    suffix: "",
    label: "Happy customers",
    format: "comma",
  },
  {
    id: "products",
    target: 500,
    suffix: "+",
    label: "Products sold",
    format: "plain",
  },
  {
    id: "satisfaction",
    target: 98,
    suffix: "%",
    label: "Customer satisfaction",
    format: "plain",
  },
];
