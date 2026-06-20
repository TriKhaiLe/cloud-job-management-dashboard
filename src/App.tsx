import { Plus } from "lucide-react";
import { AppLayout } from "./layouts/AppLayout";
import { JobTable } from "./features/JobTable";
import { mockJobs } from "./data/mockJobs";

function App() {
  return (
    <AppLayout>
      <div className="flex items-center justify-start gap-4 border-b border-gray-200 bg-white py-4">
        {/* New job button */}
        <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          <Plus size={18} />
          New Job
        </button>
        {/* Filter and sort bar */}
      </div>
      {/* Job Table */}
      <JobTable jobs={mockJobs} />
    </AppLayout>
  );
}

export default App;
