"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { TaskBreadcrumbs } from "@/features/tasks/components/task-breadcrumbs";
import {TaskDescription} from "@/features/tasks/components/task-description";
import {TaskOverview} from "@/features/tasks/components/task-overview";

import { useTaskId } from "@/features/tasks/hooks/use-task-id";

export const TaskPageClient = () => {
  const taskId = useTaskId();
  const { data, isLoading } = useGetTask({ taskId });

  if (isLoading) {
    return <PageLoader />;
  }
  if (!data) {
    <PageError message="Task not found" />;
  }

  return (
    <div className="flex flex-col">
      <TaskBreadcrumbs project={data?.project!} task={data!} />
      <DottedSeparator className="my-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOverview task={data!} />
        <TaskDescription task={data!} />
      </div>
      <DottedSeparator className="my-4" />
      <div className="flex flex-col gap-y-4"></div>
    </div>
  );
};