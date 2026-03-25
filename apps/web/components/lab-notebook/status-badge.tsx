import type { ExperimentStatus } from "@/features/lab-notebook/types"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: ExperimentStatus
  className?: string
}

const statusStyles: Record<ExperimentStatus, string> = {
  active: "bg-primary/10 text-primary border-primary/20",
  completed: "bg-success/10 text-success border-success/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
  pending: "bg-warning/10 text-warning-foreground border-warning/20",
}

const statusLabels: Record<ExperimentStatus, string> = {
  active: "Active",
  completed: "Completed",
  failed: "Failed",
  pending: "Pending",
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
        className
      )}
    >
      <span
        className={cn(
          "mr-1.5 h-1.5 w-1.5 rounded-full",
          status === "active" && "bg-primary",
          status === "completed" && "bg-success",
          status === "failed" && "bg-destructive",
          status === "pending" && "bg-warning"
        )}
      />
      {statusLabels[status]}
    </span>
  )
}
