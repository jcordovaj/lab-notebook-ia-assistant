export type ExperimentStatus = "active" | "completed" | "failed" | "pending"

export interface Experiment {
  id: number
  name: string
  status: ExperimentStatus
  date: string
  tags: string[]
  description: string
}

export interface TimelineEvent {
  id: number
  action: string
  time: string
  user: string
}

export interface Attachment {
  name: string
  size: string
}

export interface DashboardStat {
  title: string
  value: string
  description: string
  icon: "flask" | "activity" | "alert"
  color: string
  bgColor: string
}

export interface ActivityItem {
  id: number
  title: string
  action: string
  time: string
  status: ExperimentStatus
}

export type AppView = "dashboard" | "experiments" | "ai-assistant" | "settings"

export interface NavItem {
  id: AppView | "new-experiment"
  label: string
  icon: "dashboard" | "experiments" | "new" | "ai" | "settings"
}

export interface NewExperimentInput {
  name: string
  description: string
  category: string
  tags: string[]
}
