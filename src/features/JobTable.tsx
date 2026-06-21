import { Eye } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import type { Job } from "../types";

interface JobTableProps {
  jobs: Job[];
  onJobSelect?: (job: Job) => void;
}

export function JobTable({ jobs, onJobSelect }: JobTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        {/* Table Header */}
        <thead className="divide-x divide-gray-200 bg-gray-50 text-left font-medium text-gray-700">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Project ID</th>
            <th className="px-6 py-3">Compute Type</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Created</th>
            <th className="flex items-center justify-center gap-2 px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200 text-gray-600">
          {jobs.map((item) => (
            <tr key={item.id} className="transition-colors hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">
                {item.name}
              </td>
              <td className="px-6 py-4">{item.projectId}</td>
              <td className="px-6 py-4">{item.computeType}</td>
              <td className="px-6 py-4">{<Badge status={item.status} />}</td>
              <td className="px-6 py-4">
                {new Date(item.createdAt).toLocaleString()}
              </td>
              <td className="flex items-center justify-center gap-2 px-6 py-4">
                <button
                  className="cursor-pointer text-blue-600 transition-colors hover:text-blue-800"
                  onClick={() => onJobSelect?.(item)}
                >
                  <Eye className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
