import { FolderOpen, Plus } from "lucide-react";
import { AppLayout } from "./layouts/AppLayout";
import { JobTable } from "./features/JobTable";
import { mockJobs } from "./data/mockJobs";
import { Button, SelectField } from "./components/ui";
import {
  CreateJobModal,
  type CreateJobFormData,
} from "./features/CreateJobModal";
import { useMemo, useState } from "react";
import {
  JOB_STATUSES,
  type Job,
  type PageId,
  type SortDirection,
} from "./types";
import { JobDetailPanel } from "./features/JobDetailPanel";
import { BillingPage } from "./features/BillingPage";
import { useJobLifecycle } from "./hooks/useJobLifeCycle";

function App() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState<PageId>("jobs");

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

  const filteredJobs = useMemo(() => {
    let result = [...jobs];
    if (filterStatus) {
      result = result.filter((job) => job.status === filterStatus);
    }
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((job) =>
        job.name.toLowerCase().includes(lowerQuery),
      );
    }

    if (sortDirection === "asc") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    } else {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    return result;
  }, [jobs, filterStatus, sortDirection, searchQuery]);

  const jobsPage = (
    <>
      {jobs.length === 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-col items-center gap-3 py-16">
            <div className="mx-auto mb-3 flex h-30 items-center justify-center">
              <FolderOpen
                width="100%"
                height="100%"
                className="h-full w-full text-gray-400"
              />
            </div>
            <p className="text-sm font-medium text-gray-600">No jobs found</p>
            <p className="mt-1 pb-2 text-xs text-gray-400">
              You haven't created any jobs yet.
            </p>
            <Button
              variant="secondary"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={18} />
              New Job
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-start gap-4 border-b border-gray-200 bg-white py-4">
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              <Plus size={18} />
              New Job
            </Button>

            {/* Filter and sort bar */}
            <div className="mx-2 flex flex-row items-center gap-2">
              <SelectField
                wrapperClassName="flex flex-row items-center justify-between gap-2"
                placeholder="Filter by status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                {JOB_STATUSES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </SelectField>

              <SelectField
                wrapperClassName="flex flex-row items-center justify-between gap-2"
                placeholder="Sort by created (desc)"
                value={sortDirection}
                onChange={(e) =>
                  setSortDirection(e.target.value as SortDirection)
                }
              >
                <option value="desc">Sort by created (desc)</option>
                <option value="asc">Sort by created (asc)</option>
              </SelectField>
            </div>
          </div>

          <JobTable jobs={filteredJobs} onJobSelect={setSelectedJob} />
        </>
      )}
    </>
  );

  useJobLifecycle({ jobs, setJobs });

  return (
    <AppLayout
      activePage={activePage}
      onNavigate={setActivePage}
      onSearchChange={setSearchQuery}
      rightPanel={
        selectedJob && (
          <JobDetailPanel
            selectedJob={selectedJob}
            onClose={() => setSelectedJob(null)}
          />
        )
      }
    >
      {activePage === "jobs" && jobsPage}
      {activePage === "billing" && <BillingPage jobs={jobs} />}

      <CreateJobModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateJob}
      />
    </AppLayout>
  );
}

export default App;
