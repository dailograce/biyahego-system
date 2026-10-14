import { QrCode, TicketCheck } from "lucide-react";
import { useSelector } from "react-redux";

function TicketsPage() {
  const tickets = useSelector((state) => state.booking.savedTickets);
  const routes = useSelector((state) => state.routes.items);

  return (
    <section className="stack">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Redux State</p>
          <h2>Saved tickets</h2>
        </div>
        <TicketCheck size={28} aria-hidden="true" />
      </div>

      <div className="ticket-list">
        {tickets.map((ticket) => {
          const route = routes.find((item) => item.id === ticket.routeId);
          return (
            <article className="ticket" key={ticket.ticketNo}>
              <div className="ticket-main">
                <span className="route-id">{ticket.ticketNo}</span>
                <h3>{ticket.passenger}</h3>
                <p>{route ? `${route.origin} to ${route.destination}` : ticket.routeId}</p>
                <span className="status-badge boarding">{ticket.status}</span>
              </div>
              <div className="qr-box" aria-label="Ticket QR placeholder">
                <QrCode size={52} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default TicketsPage;
