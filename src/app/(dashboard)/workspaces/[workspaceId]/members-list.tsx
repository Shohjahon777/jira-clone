import { PlusIcon, CalendarIcon, SettingsIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Project } from "@/features/projects/types";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Member } from "@/features/members/types";
import { MemberAvatar } from "@/features/members/componentes/member-avatar";

interface MembersListProps {
  members: Member[];
  total: number;
}

export const MembersList = ({ members, total }: MembersListProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p>Members ({total})</p>
          <Button variant="secondary" size="icon" asChild>
            <Link href={`/workspaces/${workspaceId}/members`}>
              <SettingsIcon className="size-4 text-neutral-400" />
            </Link>
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <li key={member.$id}>
              <Card className="shadow-none rounded-lg overflow-hidden">
                <CardContent className="p-3 flex flex-col items-center gap-x-2">
                  <MemberAvatar
                    name={member.name}
                    fallbackClassName="text-lg"
                    className="size-12"
                  />
                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="text-lg font-medium line-clamp-1">
                      {member.name}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {member.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
          <li className="text-sm text-muted-foreground hidden first-of-type:block">
            No Members found
          </li>
        </ul>
      </div>
    </div>
  );
};