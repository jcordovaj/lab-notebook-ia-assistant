"use client"

import { useState } from "react"
import { Calendar, Filter, Search, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Experiment, ExperimentStatus } from "@/features/lab-notebook/types"
import { StatusBadge } from "./status-badge"

interface ExperimentsViewProps {
  experiments: Experiment[]
  onSelectExperiment: (experiment: Experiment) => void
}

type StatusFilter = "all" | ExperimentStatus

export function ExperimentsView({ experiments, onSelectExperiment }: ExperimentsViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")

  const filteredExperiments = experiments.filter((experiment) => {
    const matchesSearch = experiment.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || experiment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Experiments</h1>
        <p className="text-muted-foreground">Manage and track all your experiments</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search experiments..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="bg-card pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
            <SelectTrigger className="w-[140px] bg-card">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredExperiments.length > 0 ? (
          filteredExperiments.map((experiment) => (
            <button
              key={experiment.id}
              type="button"
              onClick={() => onSelectExperiment(experiment)}
              className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={"Open experiment " + experiment.name}
            >
              <Card className="cursor-pointer border-border/50 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-3">
                        <h3 className="truncate font-semibold text-foreground">{experiment.name}</h3>
                        <StatusBadge status={experiment.status} />
                      </div>
                      <p className="line-clamp-1 text-sm text-muted-foreground">{experiment.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{experiment.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        <span>{experiment.tags.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </button>
          ))
        ) : (
          <Card className="border-border/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 rounded-full bg-secondary p-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground">No experiments found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
