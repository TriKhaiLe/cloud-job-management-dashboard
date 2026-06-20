import { Plus } from "lucide-react";
import { AppLayout } from "./layouts/AppLayout";
import { JobTable } from "./features/JobTable";
import { mockJobs } from "./data/mockJobs";
import { Button } from "./components/ui";
import {
  CreateJobModal,
  type CreateJobFormData,
} from "./features/CreateJobModal";
import { useState } from "react";
import type { Job } from "./types";

function App() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [showCreateModal, setShowCreateModal] = useState(false);

  function generateJobId(existing: Job[]): string {
    const nums = existing.map((j) => parseInt(j.id.replace("JOB-", ""), 10));
    const next = Math.max(0, ...nums) + 1;
    return `JOB-${String(next).padStart(4, "0")}`;
  }

  const handleCreateJob = (data: CreateJobFormData) => {
    const newJob: Job = {
      id: generateJobId(jobs),
      name: data.name,
      projectId: data.projectId,
      computeType: data.computeType,
      inputFile: data.inputFileName,
      status: "Queued",
      createdAt: new Date().toISOString(),
      creditCost:
        data.computeType === "GPU"
          ? 60
          : data.computeType === "CPU Large"
            ? 20
            : 5,
    };
    setJobs((prev) => [newJob, ...prev]);
    setShowCreateModal(false);
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-start gap-4 border-b border-gray-200 bg-white py-4">
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          <Plus size={18} />
          New Job
        </Button>
        {/* Filter and sort bar */}
      </div>
      {/* Job Table */}
      <JobTable jobs={jobs} />
      <CreateJobModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateJob}
      />
    </AppLayout>
  );
}

export default App;
