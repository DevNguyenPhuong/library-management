import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    data,
  } = useMutation({
    mutationFn: (user) => loginAPI(user),
    onSuccess: (response, payload) => {
      localStorage.setItem("token", response?.result?.token);
      localStorage.setItem("authenticated", response?.result?.authenticated);
      localStorage.setItem("id", response?.result?.id);
      localStorage.setItem("name", response?.result?.name);
      dispatch(setUser({ ...response?.result }));
      navigate("/dashboard");
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  return { login, isPending, data };
}
