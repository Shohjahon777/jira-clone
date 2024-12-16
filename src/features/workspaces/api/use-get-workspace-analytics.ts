import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferResponseType } from "hono";

interface useGetWorkspaceAnalytics {
  workspaceId: string;
}

// infer the type of the response from backend endpoint!
export type WorkspaceAnalyticsResponse = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["analytics"]["$get"],
  200
>;

export const useGetWorkspaceAnalytics = ({
  workspaceId,
}: useGetWorkspaceAnalytics) => {
  const query = useQuery({
    queryKey: ["[workspace-analytics", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"][
        "analytics"
      ].$get({
        param: { workspaceId },
      });
      if (!response.ok) {
        // return null;
        throw new Error("Failed to fetch workspace analytics");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};