import { useMemo } from "react";
import type { Job } from "../types";
import { Badge } from "../components/ui";
import { FolderOpen } from "lucide-react";

interface BillingPageProps {
  jobs: Job[];
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
      <p className="mb-1 text-center text-sm font-medium text-gray-500">
        {label}
      </p>
      <p
        className={`text-center text-2xl font-bold ${accent ?? "text-gray-900"}`}
      >
        {value}
      </p>
      {sub && <p className="mt-0.5 text-center text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

export function BillingPage({ jobs }: BillingPageProps) {
  const TOTAL_CREDITS = 1000;

  const completedOrFailed = useMemo(
    () => jobs.filter((j) => j.status === "Completed" || j.status === "Failed"),
    [jobs],
  );

  const creditsUsed = useMemo(() => {
    return jobs.reduce((sum, job) => sum + (job.creditCost || 0), 0);
  }, [jobs]);

  const creditsRemaining = Math.max(0, TOTAL_CREDITS - creditsUsed);
  const usagePct = Math.min(
    100,
    Math.round((creditsUsed / TOTAL_CREDITS) * 100),
  );

  const transactions = useMemo(
    () =>
      [...completedOrFailed].sort(
        (a, b) =>
          new Date(b.completedAt ?? b.createdAt).getTime() -
          new Date(a.completedAt ?? a.createdAt).getTime(),
      ),
    [completedOrFailed],
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Credit summary */}
      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-700">
          Credit Summary
        </h2>
        <div className="mb-4 grid grid-cols-3 gap-4">
          <StatCard
            label="Total Budget"
            value={`${TOTAL_CREDITS.toLocaleString()}`}
            sub="credits / period"
          />
          <StatCard
            label="Credits Used"
            value={creditsUsed.toLocaleString()}
            sub={`${usagePct}% of budget`}
            accent="text-blue-600"
          />
          <StatCard
            label="Remaining"
            value={creditsRemaining.toLocaleString()}
            sub="credits left"
            accent={creditsRemaining < 200 ? "text-red-600" : "text-green-600"}
          />
        </div>

        {/* Usage bar */}
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              Budget utilisation
            </p>
            <p className="text-sm font-semibold text-gray-700">{usagePct}%</p>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                usagePct > 85
                  ? "bg-red-500"
                  : usagePct > 60
                    ? "bg-amber-500"
                    : "bg-blue-500"
              }`}
              style={{ width: `${usagePct}%` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between">
            <p className="text-xs text-gray-400">0</p>
            <p className="text-xs text-gray-400">
              {TOTAL_CREDITS.toLocaleString()} credits
            </p>
          </div>
        </div>
      </section>

      {/* Transactions */}
      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-700">
          Transactions
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          {transactions.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-3 flex h-30 items-center justify-center">
                <FolderOpen
                  width="100%"
                  height="100%"
                  className="h-full w-full text-gray-400"
                />
              </div>
              <p className="text-sm font-medium text-gray-600">
                No transactions yet
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Credits are billed when jobs finish.
              </p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
              {/* Table Header */}
              <thead className="divide-x divide-gray-200 bg-gray-50 text-left font-medium text-gray-700">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Compute Type</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Created</th>
                  <th className="px-6 py-3">Duration</th>
                  <th className="px-6 py-3">Credits Used</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200 text-gray-600">
                {completedOrFailed.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">{item.computeType}</td>
                    <td className="px-6 py-4">
                      {<Badge status={item.status} />}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">{item.duration}</td>
                    <td className="px-6 py-4">
                      {item.creditCost?.toLocaleString() ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
