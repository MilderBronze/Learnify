import { useLocation, matchPath } from "react-router-dom";

export default function useRouteMatch(path) {
  const location = useLocation();
  return matchPath(location.pathname, { path: path });
  // return matchPath(location.pathname, { path });
}
/**
 * 
// What you have (shorthand):
matchPath(location.pathname, { path })

// Is the same as (longhand):
matchPath(location.pathname, { path: path })

// React Router's matchPath expects an options object like:
{
  path: "/users/:id",
  exact: true,     // optional
  strict: false,   // optional
  sensitive: false // optional
}
 */