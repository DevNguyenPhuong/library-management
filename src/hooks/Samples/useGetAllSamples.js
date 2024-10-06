import { useQuery } from "@tanstack/react-query";
import { getAllSamples } from "../../services/apiSample";

export function useGetAllSamples() {
  const {
    data: samples,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllSamples(),
    queryKey: ["samples"],
  });

  return { samples, isLoading, error };
}
