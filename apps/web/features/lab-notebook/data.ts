import type {
  ActivityItem,
  Attachment,
  DashboardStat,
  Experiment,
  TimelineEvent,
} from "@/features/lab-notebook/types"

export const initialExperiments: Experiment[] = [
  {
    id: 1,
    name: "Gene Expression Analysis",
    status: "completed",
    date: "Mar 15, 2024",
    tags: ["Genetics", "RNA"],
    description: "Analyzing gene expression patterns in stem cells under various conditions.",
  },
  {
    id: 2,
    name: "Protein Folding Simulation",
    status: "active",
    date: "Mar 14, 2024",
    tags: ["Proteins", "Simulation"],
    description: "Simulating protein folding dynamics using molecular dynamics.",
  },
  {
    id: 3,
    name: "Cell Culture Growth",
    status: "active",
    date: "Mar 12, 2024",
    tags: ["Cell Biology", "Growth"],
    description: "Monitoring cell culture growth rates under different nutrient conditions.",
  },
  {
    id: 4,
    name: "Drug Interaction Test",
    status: "failed",
    date: "Mar 10, 2024",
    tags: ["Pharmacology", "Testing"],
    description: "Testing drug interactions between compound A and compound B.",
  },
  {
    id: 5,
    name: "Enzyme Kinetics Study",
    status: "pending",
    date: "Mar 8, 2024",
    tags: ["Biochemistry", "Enzymes"],
    description: "Studying enzyme kinetics and reaction rates.",
  },
  {
    id: 6,
    name: "Bacterial Resistance Analysis",
    status: "completed",
    date: "Mar 5, 2024",
    tags: ["Microbiology", "Antibiotics"],
    description: "Analyzing antibiotic resistance patterns in bacterial cultures.",
  },
]

export const recentActivity: ActivityItem[] = [
  {
    id: 1,
    title: "Gene Expression Analysis",
    action: "Results updated",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    title: "Protein Folding Simulation",
    action: "AI analysis requested",
    time: "4 hours ago",
    status: "active",
  },
  {
    id: 3,
    title: "Cell Culture Growth",
    action: "New notes added",
    time: "Yesterday",
    status: "active",
  },
  {
    id: 4,
    title: "Drug Interaction Test",
    action: "Experiment failed",
    time: "2 days ago",
    status: "failed",
  },
]

export const experimentTimeline: TimelineEvent[] = [
  {
    id: 1,
    action: "Experiment created",
    time: "Mar 15, 2024 - 09:00 AM",
    user: "Dr. Jane Doe",
  },
  {
    id: 2,
    action: "Initial data collected",
    time: "Mar 15, 2024 - 11:30 AM",
    user: "Lab Assistant",
  },
  {
    id: 3,
    action: "Analysis started",
    time: "Mar 15, 2024 - 02:00 PM",
    user: "Dr. Jane Doe",
  },
  {
    id: 4,
    action: "Results updated",
    time: "Mar 16, 2024 - 10:15 AM",
    user: "AI Assistant",
  },
]

export const experimentAttachments: Attachment[] = [
  { name: "raw_data.csv", size: "2.4 MB" },
  { name: "protocol.pdf", size: "1.1 MB" },
  { name: "images.zip", size: "45.2 MB" },
]

export function buildDashboardStats(experiments: Experiment[]): DashboardStat[] {
  const total = experiments.length
  const active = experiments.filter((experiment) => experiment.status === "active").length
  const failed = experiments.filter((experiment) => experiment.status === "failed").length
  const pending = experiments.filter((experiment) => experiment.status === "pending").length

  return [
    {
      title: "Total Experiments",
      value: String(total),
      description: String(Math.max(total - 21, 0)) + " this month",
      icon: "flask",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Active Experiments",
      value: String(active),
      description: String(pending) + " pending review",
      icon: "activity",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Failed Experiments",
      value: String(failed),
      description: failed > 0 ? "Need attention" : "No incidents",
      icon: "alert",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ]
}
