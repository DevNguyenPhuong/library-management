import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSample as createSampleAPI } from "../../services/apiSample";
import { toast } from "react-hot-toast";

export function useCreateSample() {
  const queryClient = useQueryClient();
  const { mutate: createSample, isPending } = useMutation({
    mutationFn: (sample) => createSampleAPI(sample),

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

  return { createSample, isPending };
}
