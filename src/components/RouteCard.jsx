import { Clock, MapPin, PhilippinePeso, UsersRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectRoute } from "../store/routeSlice.js";

function RouteCard({ route }) {
  const dispatch = useDispatch();
  const selectedRouteId = useSelector((state) => state.routes.selectedRouteId);
  const active = selectedRouteId === route.id;

  return (
    <article className={`route-card ${active ? "is-selected" : ""}`}>
      <div className="route-card-top">
        <span className="route-id">{route.id}</span>
        <span className={`status-badge ${route.status.toLowerCase().replace(" ", "-")}`}>{route.status}</span>
      </div>
      <h3>{route.origin} to {route.destination}</h3>
      <p className="operator">{route.operator} - {route.vehicle}</p>
      <dl className="route-facts">
        <div>
          <Clock size={16} aria-hidden="true" />
          <dt>Time</dt>
          <dd>{route.departure} - {route.arrival}</dd>
        </div>
        <div>
          <PhilippinePeso size={16} aria-hidden="true" />
          <dt>Fare</dt>
          <dd>{route.fare}</dd>
        </div>
        <div>
          <UsersRound size={16} aria-hidden="true" />
          <dt>Seats</dt>
          <dd>{route.seats}</dd>
        </div>
      </dl>
      <button type="button" className="secondary-button" onClick={() => dispatch(selectRoute(route.id))}>
        <MapPin size={17} aria-hidden="true" />
        Select route
      </button>
    </article>
  );
}

export default RouteCard;
