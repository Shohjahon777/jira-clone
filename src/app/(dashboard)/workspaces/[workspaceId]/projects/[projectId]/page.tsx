import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

import { ProjectPageClient } from "./client";
import { GetProject } from "@/features/projects/queries";

const ProjectIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  // const initialValues = await GetProject({
  //   projectId: params.projec
  // })

  return <ProjectPageClient />;
};

export default ProjectIdPage;
