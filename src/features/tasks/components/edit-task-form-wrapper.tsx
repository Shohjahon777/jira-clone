"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { LoaderIcon } from "lucide-react";
import { useGetTask } from "../api/use-get-task";
import EditTaskForm from "./edit-task-form";

interface EditTaskFormWrapperProps {
  onCancel?: () => void;
  id: string;
}

export const EditTaskFormWrapper = ({
  onCancel,
  id,
}: EditTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId();

  const { data: projects, isLoading: isLoadingProject } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMember } = useGetMembers({
    workspaceId,
  });
  const { data: initialValues, isLoading: isLoadingTask } = useGetTask({
    taskId: id,
  });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  const isLoading = isLoadingProject || isLoadingMember || isLoadingTask;

  if (isLoading) {
    return (
      <Card className="w-full h-[250px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!initialValues) {
    return null;
  }

  return (
    <EditTaskForm
      {...{
        initialValues,
        id,
        onCancel,
        projectOptions: projectOptions ?? [],
        memberOptions: memberOptions ?? [],
      }}
    />
  );
};
