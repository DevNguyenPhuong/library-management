import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as logoutAPI } from "../../services/apiAuth";
import { clearData } from "../../store/userSlice";
import toast from "react-hot-toast";

export function useLogout() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: logout,
    isPending,
    data,
  } = useMutation({
    mutationFn: (jwt) => logoutAPI(jwt),
    onSuccess: () => {
      dispatch(clearData());
      localStorage.clear();
      queryClient.removeQueries();
      navigate("/login");
    },
    onError: (error) => {
      const { response } = error;
      console.log(error);
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  return { logout, isPending, data };
}
