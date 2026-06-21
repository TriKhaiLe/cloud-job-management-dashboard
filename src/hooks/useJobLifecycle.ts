import { useEffect } from 'react';
import type { Job, ComputeType } from '../types';


const SUCCESS_RATE = 0.8;

const PHASE_DELAY_MS = {
  queuedToRunning: () => randomBetween(2_000,  6_000),
  runningToDone: () => randomBetween(4_000, 14_000),
};

// Credits charged per 10-minute billing block
const CREDITS_PER_BLOCK: Record<ComputeType, number> = {
  'CPU Small': 5,
  'CPU Large': 20,
  GPU: 60,
};

function randomBetween(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds} secs`;
  const minutes = Math.floor(seconds / 60);
  const leftover = seconds % 60;
  return leftover > 0 ? `${minutes} min ${leftover} secs` : `${minutes} mins`;
}

function genOutputFile(inputFile: string): string {
  const dotIdx = inputFile.lastIndexOf('.');
  const base = dotIdx !== -1 ? inputFile.slice(0, dotIdx) : inputFile;
  const ext = dotIdx !== -1 ? inputFile.slice(dotIdx + 1) : 'out';
  const extMap: Record<string, string> = {
    csv: 'json', h5: 'h5', zip: 'zip', tif: 'geotiff',
    ifc: 'json', vtk: 'vtu', xlsx: 'csv',
  };
  const uid = Math.random().toString(36).slice(2, 7);
  return `${base}_result_${uid}.${extMap[ext] ?? 'out'}`;
}

function calcCreditCost(computeType: ComputeType, durationSecs: number): number {
  const blocks = Math.max(1, Math.ceil(durationSecs / 600)); // 1 block = 10 min
  return blocks * CREDITS_PER_BLOCK[computeType];
}

// The effect re-runs whenever any job changes status. Cleanup cancels all
// pending timers before rescheduling, so a job can never transition twice.

interface UseJobLifecycleOptions {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

export function useJobLifecycle({ jobs, setJobs }: UseJobLifecycleOptions) {
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (const job of jobs) {

      if (job.status === 'Queued') {
        timers.push(setTimeout(() => {
          setJobs(prev => prev.map(j =>
            j.id === job.id
              ? { ...j, status: 'Running', startedAt: new Date().toISOString() }
              : j
          ));
        }, PHASE_DELAY_MS.queuedToRunning()));
      }

      if (job.status === 'Running') {
        const durationSecs = randomBetween(30, 900); // 30 secs – 15 mins
        const succeeded = Math.random() < SUCCESS_RATE;

        timers.push(setTimeout(() => {
          setJobs(prev => prev.map(j => {
            if (j.id !== job.id) return j;

            if (succeeded) {
              return {
                ...j,
                status: 'Completed',
                completedAt: new Date().toISOString(),
                duration: formatDuration(durationSecs),
                outputFile: genOutputFile(job.inputFile),
                creditCost: calcCreditCost(job.computeType, durationSecs),
              };
            } else {
              return {
                ...j,
                status: 'Failed',
                duration: formatDuration(durationSecs),
              };
            }
          }));
        }, PHASE_DELAY_MS.runningToDone()));
      }
    }

    return () => timers.forEach(clearTimeout);

  // Depend on each job's ID + status so we re-run on any status change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs.map(j => `${j.id}:${j.status}`).join(',')]);
}