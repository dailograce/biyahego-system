import { BusFront, Clock3, MapPinned, TicketCheck } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RouteMap from "../components/RouteMap.jsx";
import StatCard from "../components/StatCard.jsx";
import { fetchRoutes } from "../store/routeSlice.js";

function Dashboard() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.routes);
  const tickets = useSelector((state) => state.booking.savedTickets);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRoutes());
    }
  }, [dispatch, status]);

  const availableSeats = items.reduce((total, route) => total + route.seats, 0);

  return (
    <div className="page-grid">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">BIYAHEGO Control Center</p>
          <h2>Plan Butuan City trips from terminals, campuses, ports, and the airport.</h2>
          <p>Built for Butuan commuters, students, visitors, dispatchers, and local transport operators who need clear route visibility and seat status.</p>
        </div>
        <RouteMap />
      </section>

      <div className="stats-grid">
        <StatCard label="Active routes" value={items.length || "..."} detail="from mock API" icon={MapPinned} />
        <StatCard label="Open seats" value={status === "succeeded" ? availableSeats : "..."} detail="live schedule sample" icon={BusFront} />
        <StatCard label="Saved tickets" value={tickets.length} detail="Redux booking state" icon={TicketCheck} />
        <StatCard label="Average dispatch" value="8 min" detail="target terminal flow" icon={Clock3} />
      </div>

      <section className="workflow-panel">
        <h2>Core commuter flow</h2>
        <div className="timeline">
          <span>Search route</span>
          <span>Review fare</span>
          <span>Reserve seat</span>
          <span>Show ticket</span>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
