export const CLASSES = ["A", "B", "C", "D"] as const;
export type ContractorClass = (typeof CLASSES)[number];

export const REGIONS = ["Dehradun", "Kumaon"] as const;
export type Region = (typeof REGIONS)[number];

export const DISTRICTS = [
  "Almora", "Bageshwar", "Chamoli", "Champawat",
  "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal",
  "Pithoragarh", "Rudraprayag", "Tehri Garhwal",
  "Udham Singh Nagar", "Uttarkashi",
] as const;
export type District = (typeof DISTRICTS)[number];

export const APPLICATION_STATUSES = [
  "Draft",
  "Booklet Submitted",
  "Payment Done",
  "Certificate Generated",
  "Document Uploaded",
  "Under Scrutiny by Clerk",
  "Verified by Clerk",
  "Under Review by Admin",
  "Recommended by Admin",
  "Under Review by HOD",
  "Certificate Issued",
  "Query/Rejected",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export function getSubdivision(cls: ContractorClass): "region" | "district" {
  return cls === "A" || cls === "B" ? "region" : "district";
}
