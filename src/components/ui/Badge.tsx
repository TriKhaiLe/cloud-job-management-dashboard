import type { JobStatus } from "../../types";

type BadgeProps = {
  status: JobStatus;
  className?: string;
};

const statusStyles: Record<JobStatus, string> = {
  Queued: "bg-gray-100 text-gray-700 ring-gray-200",
  Running: "bg-blue-100 text-blue-700 ring-blue-200",
  Completed: "bg-green-100 text-green-700 ring-green-200",
  Failed: "bg-red-100 text-red-700 ring-red-200",
};

export function Badge({ status, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        statusStyles[status],
        className,
      ].join(" ")}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}