"use client"

import { useMemo, useState } from "react"
import { Beaker } from "lucide-react"
import { AIAssistantView } from "@/components/lab-notebook/ai-assistant-view"
import { DashboardView } from "@/components/lab-notebook/dashboard-view"
import { ExperimentDetailView } from "@/components/lab-notebook/experiment-detail-view"
import { ExperimentsView } from "@/components/lab-notebook/experiments-view"
import { MobileSidebar } from "@/components/lab-notebook/mobile-sidebar"
import { NewExperimentModal } from "@/components/lab-notebook/new-experiment-modal"
import { SettingsView } from "@/components/lab-notebook/settings-view"
import { Sidebar } from "@/components/lab-notebook/sidebar"
import { TopBar } from "@/components/lab-notebook/top-bar"
import { buildDashboardStats, initialExperiments, recentActivity } from "@/features/lab-notebook/data"
import type { AppView, Experiment, NewExperimentInput } from "@/features/lab-notebook/types"

export default function LabNotebookApp() {
  const [activeView, setActiveView] = useState<AppView>("dashboard")
  const [experiments, setExperiments] = useState<Experiment[]>(initialExperiments)
  const [selectedExperimentId, setSelectedExperimentId] = useState<number | null>(null)
  const [showNewExperimentModal, setShowNewExperimentModal] = useState(false)

  const selectedExperiment = useMemo(
    () => experiments.find((experiment) => experiment.id === selectedExperimentId) ?? null,
    [experiments, selectedExperimentId]
  )
  const dashboardStats = useMemo(() => buildDashboardStats(experiments), [experiments])

  const handleViewChange = (view: AppView | "new-experiment") => {
    if (view === "new-experiment") {
      setShowNewExperimentModal(true)
      return
    }

    setActiveView(view)
    setSelectedExperimentId(null)
  }

  const handleSelectExperiment = (experiment: Experiment) => {
    setSelectedExperimentId(experiment.id)
    setActiveView("experiments")
  }

  const handleAnalyzeWithAI = () => {
    setActiveView("ai-assistant")
    setSelectedExperimentId(null)
  }

  const handleCreateExperiment = (input: NewExperimentInput) => {
    const nextExperiment: Experiment = {
      id: experiments.reduce((maxId, experiment) => Math.max(maxId, experiment.id), 0) + 1,
      name: input.name,
      description: input.description,
      status: "pending",
      date: new Intl.DateTimeFormat("es-AR", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
      tags: input.tags.length > 0 ? input.tags : [input.category],
    }

    setExperiments((currentExperiments) => [nextExperiment, ...currentExperiments])
    setShowNewExperimentModal(false)
    setSelectedExperimentId(nextExperiment.id)
    setActiveView("experiments")
  }

  const renderContent = () => {
    if (selectedExperiment) {
      return (
        <ExperimentDetailView
          experiment={selectedExperiment}
          onBack={() => setSelectedExperimentId(null)}
          onAnalyzeWithAI={handleAnalyzeWithAI}
        />
      )
    }

    switch (activeView) {
      case "dashboard":
        return (
          <DashboardView
            onNewExperiment={() => setShowNewExperimentModal(true)}
            onOpenAI={() => setActiveView("ai-assistant")}
            stats={dashboardStats}
            recentActivity={recentActivity}
          />
        )
      case "experiments":
        return <ExperimentsView experiments={experiments} onSelectExperiment={handleSelectExperiment} />
      case "ai-assistant":
        return <AIAssistantView />
      case "settings":
        return <SettingsView />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar activeView={activeView} onViewChange={handleViewChange} />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:hidden">
          <div className="flex items-center gap-2">
            <MobileSidebar activeView={activeView} onViewChange={handleViewChange} />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Beaker className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Lab Notebook AI</span>
            </div>
          </div>
        </header>

        <div className="hidden md:block">
          <TopBar onNewExperiment={() => setShowNewExperimentModal(true)} />
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{renderContent()}</main>
      </div>

      <NewExperimentModal
        open={showNewExperimentModal}
        onClose={() => setShowNewExperimentModal(false)}
        onCreate={handleCreateExperiment}
      />
    </div>
  )
}
