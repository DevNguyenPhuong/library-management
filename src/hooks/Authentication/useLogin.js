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
    onSuccess: (response) => {
      const { token, authenticated, id, username, roles, expiresIn } =
        response?.result;

      localStorage.setItem("token", token);
      localStorage.setItem("authenticated", String(authenticated));
      localStorage.setItem("id", id);
      localStorage.setItem("username", username || "");
      localStorage.setItem("roles", JSON.stringify(roles));
      localStorage.setItem("expiresIn", String(expiresIn));

      dispatch(
        setUser({
          token,
          authenticated,
          id,
          username,
          roles,
          expiresIn,
        })
      );

      navigate(`/${roles[0]?.name?.toLowerCase()}`);
    },
    onError: (error) => {
      const { response } = error;
      console.log(error);
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  return { login, isPending, data };
}
