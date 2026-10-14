import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RouteCard from "../components/RouteCard.jsx";
import { fetchRoutes } from "../store/routeSlice.js";

function RoutesPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.routes);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRoutes());
    }
  }, [dispatch, status]);

  return (
    <section className="stack">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Mock API Integration</p>
          <h2>Available routes</h2>
        </div>
        <button className="secondary-button" onClick={() => dispatch(fetchRoutes())}>
          <RefreshCw size={17} aria-hidden="true" />
          Refresh
        </button>
      </div>

      {status === "loading" && <p className="notice">Loading route schedules...</p>}
      {status === "failed" && (
        <p className="error-message" role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          {error}
        </p>
      )}
      <div className="routes-grid">
        {items.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>
    </section>
  );
}

export default RoutesPage;
