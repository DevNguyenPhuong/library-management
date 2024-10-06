import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSample as deleteSampleAPI } from "../../services/apiSample";
import { toast } from "react-hot-toast";

export function useDeleteSample() {
  const queryClient = useQueryClient();
  const { mutate: deleteSample, isPending } = useMutation({
    mutationFn: (id) => deleteSampleAPI(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`samples`],
      });
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  return { deleteSample, isPending };
}
