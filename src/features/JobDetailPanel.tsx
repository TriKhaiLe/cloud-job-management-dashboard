import { Download, X } from "lucide-react";
import type { Job } from "../types";
import { Badge } from "../components/ui";

interface JobDetailPanelProps {
  selectedJob: Job | null;
  onClose: () => void;
}

export const JobDetailPanel: React.FC<JobDetailPanelProps> = ({
  selectedJob,
  onClose,
}) => {
  if (!selectedJob) return null;

  return (
    <>
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-xl font-bold">Job Details</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </header>
      {/* Job Details */}
      <div className="p-4">
        <section className="border-b border-gray-200">
          <div className="flex justify-between gap-2">
            <h3 className="text-lg font-semibold">{selectedJob.name}</h3>
            <Badge status={selectedJob.status} />
          </div>

          <dl className="mt-4 space-y-3 pb-4">
            <div className="grid grid-cols-2">
              <dt className="text-gray-500">Job ID</dt>
              <dd>{selectedJob.id}</dd>
            </div>

            <div className="grid grid-cols-2">
              <dt className="text-gray-500">Project ID</dt>
              <dd>{selectedJob.projectId}</dd>
            </div>

            <div className="grid grid-cols-2">
              <dt className="text-gray-500">Compute Type</dt>
              <dd>{selectedJob.computeType}</dd>
            </div>

            <div className="grid grid-cols-2">
              <dt className="text-gray-500">Status</dt>
              <dd>{selectedJob.status}</dd>
            </div>

            <div className="grid grid-cols-2">
              <dt className="text-gray-500">Created</dt>
              <dd>{selectedJob.createdAt}</dd>
            </div>

            <div className="grid grid-cols-2">
              <dt className="text-gray-500">Started</dt>
              <dd>{selectedJob.startedAt}</dd>
            </div>

            <div className="grid grid-cols-2">
              <dt className="text-gray-500">Completed</dt>
              <dd>{selectedJob.completedAt}</dd>
            </div>
          </dl>
        </section>

        <section className="border-b border-gray-200 py-4">
          <h3 className="text-lg font-semibold">Files</h3>

          <dl className="mt-3 space-y-3">
            <div className="grid grid-cols-[160px_1fr_auto] items-center gap-2">
              <dt className="text-gray-500">Input File</dt>
              <dd className="overflow-hidden text-left text-ellipsis whitespace-nowrap">
                {selectedJob.inputFile}
              </dd>
              <Download />
            </div>
            <div className="grid grid-cols-[160px_1fr_auto] items-center gap-2">
              <dt className="text-gray-500">Output File</dt>
              <dd className="overflow-hidden text-left text-ellipsis whitespace-nowrap">
                {selectedJob.outputFile}
              </dd>
              <Download />
            </div>
          </dl>
        </section>

        <section className="py-4">
          <h3 className="text-lg font-semibold">Execution</h3>

          <dl className="mt-4 space-y-3 pb-4">
            <div className="grid grid-cols-2">
              <dt className="text-gray-500">Duration</dt>
              <dd>{selectedJob.duration}</dd>
            </div>

            {selectedJob.creditCost !== undefined && (
              <div className="grid grid-cols-2">
                <dt className="text-gray-500">Credit Cost</dt>
                <dd>
                  {selectedJob.creditCost}{" "}
                  {selectedJob.creditCost > 1 ? "credits" : "credit"}{" "}
                </dd>
              </div>
            )}
          </dl>
        </section>
      </div>
    </>
  );
};
