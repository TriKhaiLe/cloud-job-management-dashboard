export type JobStatus = "Queued" | "Running" | "Completed" | "Failed";
export const JOB_STATUSES: JobStatus[] = ["Queued", "Running", "Completed", "Failed"];

export type ComputeType = "CPU Small" | "CPU Large" | "GPU";
export const COMPUTE_TYPES: ComputeType[] = ["CPU Small", "CPU Large", "GPU"];

export type SortDirection = "asc" | "desc";
export type PageId = 'jobs' | 'billing';

export interface Job {
  id: string; // e.g., JOB-0001
  name: string; // e.g., Slope Stability Analysis
  projectId: string; // e.g., PROJ-1001
  computeType: ComputeType;
  status: JobStatus;
  createdAt: string; // ISO string or formatted date
  startedAt?: string;
  completedAt?: string;
  inputFile: string;
  outputFile?: string;
  duration?: string; // e.g., "10 mins"
  creditCost?: number; // e.g., 30
}
