import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRoles }) {
  const navigate = useNavigate();

  const authenticatedFromLocalStorage = JSON.parse(
    localStorage.getItem("authenticated")
  );
  const authenticatedFromStore = useSelector(
    (store) => store.user.authenticated
  );

  const authenticated =
    authenticatedFromLocalStorage !== null
      ? authenticatedFromLocalStorage
      : authenticatedFromStore;

  const roles = useSelector((store) => {
    const rolesFromStore = store.user.authenticated.roles;
    return rolesFromStore && rolesFromStore.length > 0
      ? rolesFromStore
      : JSON.parse(localStorage.getItem("roles")) || [];
  });

  useEffect(() => {
    if (!authenticated) {
      navigate("/login", { replace: true });
    }
  }, [authenticated, navigate]);

  function hasRequiredRoles(userRoles, requiredRoles) {
    const userRoleNames = userRoles.map((role) => role.name);
    return userRoleNames.includes(requiredRoles);
  }

  if (authenticated && hasRequiredRoles(roles, requiredRoles)) return children;
}

export default ProtectedRoute;
