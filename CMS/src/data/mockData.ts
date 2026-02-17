import { ApplicationStatus, ContractorClass, District, Region } from "./constants";

export interface Application {
  id: string;
  contractorName: string;
  firmName: string;
  contractorClass: ContractorClass;
  region?: Region;
  district?: District;
  status: ApplicationStatus;
  submittedAt: string;
  amount: number;
  solvencyAmount: number; // Added for solvency graphs
  phone: string;
  email: string;
  clerkNotes?: string;
  adminNotes?: string;
}

// Enriched mock data with heavy emphasis on Class segregation
export const mockApplications: Application[] = [
  { id: "APP-001", contractorName: "Rajesh Kumar", firmName: "Kumar Const", contractorClass: "A", region: "Dehradun", status: "Under Scrutiny by Clerk", submittedAt: "2024-12-15", amount: 250000, solvencyAmount: 5000000, phone: "9876543210", email: "rajesh@k.com" },
  { id: "APP-002", contractorName: "Sunita Devi", firmName: "Devi Infra", contractorClass: "B", region: "Kumaon", status: "Verified by Clerk", submittedAt: "2024-12-10", amount: 180000, solvencyAmount: 2500000, phone: "9123456780", email: "sunita@d.com" },
  { id: "APP-003", contractorName: "Amit Rawat", firmName: "Rawat Builders", contractorClass: "C", district: "Nainital", status: "Recommended by Admin", submittedAt: "2024-12-08", amount: 95000, solvencyAmount: 1500000, phone: "9988776655", email: "amit@r.com" },
  { id: "APP-004", contractorName: "Pooja Bisht", firmName: "Bisht & Sons", contractorClass: "D", district: "Haridwar", status: "Certificate Issued", submittedAt: "2024-11-20", amount: 50000, solvencyAmount: 500000, phone: "9090909090", email: "pooja@b.com" },
  { id: "APP-005", contractorName: "Manoj Pandey", firmName: "Pandey Ent", contractorClass: "A", region: "Dehradun", status: "Document Uploaded", submittedAt: "2024-12-18", amount: 320000, solvencyAmount: 6000000, phone: "8877665544", email: "manoj@p.com" },
  { id: "APP-006", contractorName: "Kavita Negi", firmName: "Negi Co.", contractorClass: "C", district: "Almora", status: "Under Review by Admin", submittedAt: "2024-12-12", amount: 75000, solvencyAmount: 1200000, phone: "7766554433", email: "kavita@n.com" },
  { id: "APP-007", contractorName: "Rohan Singh", firmName: "Singh Bros", contractorClass: "B", region: "Garhwal", status: "Pending Payment", submittedAt: "2024-12-20", amount: 150000, solvencyAmount: 3000000, phone: "6655443322", email: "rohan@s.com" },
  { id: "APP-008", contractorName: "Vikram Malhotra", firmName: "VM Tech", contractorClass: "A", region: "Kumaon", status: "Certificate Issued", submittedAt: "2024-11-15", amount: 400000, solvencyAmount: 8000000, phone: "5544332211", email: "vikram@v.com" },
  { id: "APP-009", contractorName: "Suresh Raina", firmName: "Raina Const", contractorClass: "E", district: "Chamoli", status: "Under Scrutiny by Clerk", submittedAt: "2024-12-22", amount: 20000, solvencyAmount: 200000, phone: "4433221100", email: "suresh@r.com" },
  { id: "APP-010", contractorName: "Anjali Gupta", firmName: "Gupta Associates", contractorClass: "B", region: "Dehradun", status: "Recommended by Admin", submittedAt: "2024-12-05", amount: 200000, solvencyAmount: 2800000, phone: "3322110099", email: "anjali@g.com" },
];

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: "clerk" | "admin" | "hod";
  assignedRegion?: string;
  assignedDistrict?: string;
  active: boolean;
}

export const mockManagedUsers: ManagedUser[] = [
  { id: "u1", name: "Priya Sharma", email: "priya@cms.gov.in", role: "clerk", assignedRegion: "Dehradun", active: true },
  { id: "u2", name: "Rahul Joshi", email: "rahul@cms.gov.in", role: "clerk", assignedRegion: "Kumaon", active: true },
  { id: "u3", name: "Vikram Singh", email: "vikram@cms.gov.in", role: "admin", active: true },
  { id: "u4", name: "Dr. Anand Mishra", email: "anand@cms.gov.in", role: "hod", active: true },
  { id: "u5", name: "Neha Thapa", email: "neha@cms.gov.in", role: "clerk", assignedDistrict: "Nainital", active: false },
];