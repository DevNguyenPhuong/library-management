import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { authenticated } = useSelector((store) => store.user);
  const authenticated = localStorage.getItem("authenticated");

  useEffect(
    function () {
      if (!authenticated) {
        navigate("/login", { replace: true });
      }
    },
    [authenticated, navigate, dispatch]
  );

  if (authenticated) return children;
}

export default ProtectedRoute;
