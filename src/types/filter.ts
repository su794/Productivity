export const FilterTabs = ["all", "active", "completed"] as const;
export type Filter = (typeof FilterTabs)[number];