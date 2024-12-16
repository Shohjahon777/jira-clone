import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferResponseType } from "hono";

interface UseGetPorjectAnlayticsProps {
  projectId: string;
}

// infer the type of the response from backend endpoint!
export type ProjectAnalyticsResponse = InferResponseType<
  (typeof client.api.projects)[":projectId"]["analytics"]["$get"],
  200
>;

export const useGetProjectAnalytics = ({
  projectId,
}: UseGetPorjectAnlayticsProps) => {
  const query = useQuery({
    queryKey: ["project-analytics", projectId],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"][
        "analytics"
      ].$get({
        param: { projectId },
      });
      if (!response.ok) {
        // return null;
        throw new Error("Failed to fetch project analytics");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};