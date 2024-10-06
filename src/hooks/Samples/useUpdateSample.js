import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSample as updateSampleAPI } from "../../services/apiSample";
import { toast } from "react-hot-toast";

export function useUpdateSample() {
  const queryClient = useQueryClient();
  const { mutate: updateSample, isPending } = useMutation({
    mutationFn: (data) => updateSampleAPI(data),

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

  return { updateSample, isPending };
}
