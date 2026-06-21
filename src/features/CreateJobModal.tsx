import { useState } from "react";
import { Button, InputField, SelectField } from "../components/ui";
import { COMPUTE_TYPES, type ComputeType } from "../types";

export interface CreateJobFormData {
  name: string;
  projectId: string;
  computeType: ComputeType;
  inputFileName: string;
}

interface CreateJobFormErrors {
  name?: string;
  projectId?: string;
  computeType?: string;
  inputFileName?: string;
}

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (jobData: CreateJobFormData) => void;
}

function validateForm(data: CreateJobFormData): CreateJobFormErrors {
  const errors: CreateJobFormErrors = {};
  if (!data.name || data.name.trim() === "") {
    errors.name = "Job name is required.";
  }
  if (!data.projectId || data.projectId.trim() === "") {
    errors.projectId = "Project ID is required.";
  }
  if (!data.computeType) {
    errors.computeType = "Compute type is required.";
  }
  if (!data.inputFileName || data.inputFileName.trim() === "") {
    errors.inputFileName = "Input file name is required.";
  }
  return errors;
}

const INITIAL_FORM: CreateJobFormData = {
  name: "",
  projectId: "",
  computeType: "" as ComputeType,
  inputFileName: "",
};

export function CreateJobModal({
  isOpen,
  onClose,
  onCreate,
}: CreateJobModalProps) {
  const [form, setForm] = useState<CreateJobFormData>(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState<CreateJobFormErrors>({});

  if (!isOpen) return null;

  const handleSubmit = () => {
    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    onCreate(form);
    setForm(INITIAL_FORM);
    setFormErrors({});
    onClose();
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setFormErrors({});
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2
            id="modal-title"
            className="text-base font-semibold text-gray-900"
          >
            Create New Job
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 px-6 py-5">
          <InputField
            className="flex flex-row items-center justify-between gap-2"
            label="Job Name"
            placeholder="Enter job name"
            value={form.name}
            error={formErrors.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />

          <InputField
            className="flex flex-row items-center justify-between gap-2"
            label="Project ID"
            placeholder="Enter project ID"
            value={form.projectId}
            error={formErrors.projectId}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, projectId: e.target.value }))
            }
            required
          />

          <SelectField
            wrapperClassName="flex flex-row items-center justify-between gap-2"
            selectClassName="w-60"
            label="Compute Type"
            value={form.computeType}
            error={formErrors.computeType}
            placeholder="Select compute type"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                computeType: e.target.value as ComputeType,
              }))
            }
            required
          >
            {COMPUTE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </SelectField>

          <InputField
            className="flex flex-row items-center justify-between gap-2"
            label="Input File Name"
            placeholder="e.g. model_data.csv"
            value={form.inputFileName}
            error={formErrors.inputFileName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, inputFileName: e.target.value }))
            }
            required
          />
          {/* Actions */}
          <div className="mt-1 flex items-center justify-end gap-2.5 pt-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
