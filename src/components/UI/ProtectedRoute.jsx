import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRoles }) {
  const navigate = useNavigate();
  const { authenticated, roles } = useSelector((store) => store.user);

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
