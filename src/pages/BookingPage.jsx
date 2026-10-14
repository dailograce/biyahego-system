import { AlertCircle, CheckCircle2, TicketPlus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitBooking, updateDraft } from "../store/bookingSlice.js";
import { fetchRoutes } from "../store/routeSlice.js";

function BookingPage() {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const draft = useSelector((state) => state.booking);
  const { items, status, selectedRouteId } = useSelector((state) => state.routes);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRoutes());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (selectedRouteId) {
      dispatch(updateDraft({ routeId: selectedRouteId }));
    }
  }, [dispatch, selectedRouteId]);

  const selectedRoute = useMemo(
    () => items.find((route) => route.id === draft.routeId),
    [items, draft.routeId]
  );

  const validate = () => {
    const nextErrors = {};
    if (draft.passenger.trim().length < 3) {
      nextErrors.passenger = "Enter the passenger's full name.";
    }
    if (!/^09\d{9}$/.test(draft.contact.trim())) {
      nextErrors.contact = "Use an 11-digit Philippine mobile number starting with 09.";
    }
    if (!draft.routeId) {
      nextErrors.routeId = "Select a route.";
    }
    if (Number(draft.seats) < 1 || Number(draft.seats) > 6) {
      nextErrors.seats = "Reserve 1 to 6 seats only.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(false);
    if (!validate()) return;
    dispatch(submitBooking());
    setSubmitted(true);
  };

  return (
    <section className="booking-layout">
      <form className="booking-form" onSubmit={handleSubmit} noValidate>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Validated Form</p>
            <h2>Reserve a trip</h2>
          </div>
          <TicketPlus size={28} aria-hidden="true" />
        </div>

        {submitted && (
          <p className="success-message" role="status">
            <CheckCircle2 size={18} aria-hidden="true" />
            Booking saved to local ticket state.
          </p>
        )}

        <label>
          Passenger name
          <input
            value={draft.passenger}
            onChange={(event) => dispatch(updateDraft({ passenger: event.target.value }))}
            aria-invalid={Boolean(errors.passenger)}
            aria-describedby={errors.passenger ? "passenger-error" : undefined}
            placeholder="Grace Dailo"
          />
          {errors.passenger && <span id="passenger-error" className="field-error">{errors.passenger}</span>}
        </label>

        <label>
          Mobile number
          <input
            value={draft.contact}
            onChange={(event) => dispatch(updateDraft({ contact: event.target.value }))}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? "contact-error" : undefined}
            placeholder="09171234567"
          />
          {errors.contact && <span id="contact-error" className="field-error">{errors.contact}</span>}
        </label>

        <label>
          Route
          <select
            value={draft.routeId}
            onChange={(event) => dispatch(updateDraft({ routeId: event.target.value }))}
            aria-invalid={Boolean(errors.routeId)}
          >
            {items.map((route) => (
              <option key={route.id} value={route.id}>
                {route.origin} to {route.destination}
              </option>
            ))}
          </select>
          {errors.routeId && <span className="field-error">{errors.routeId}</span>}
        </label>

        <label>
          Seats
          <input
            type="number"
            min="1"
            max="6"
            value={draft.seats}
            onChange={(event) => dispatch(updateDraft({ seats: event.target.value }))}
            aria-invalid={Boolean(errors.seats)}
          />
          {errors.seats && <span className="field-error">{errors.seats}</span>}
        </label>

        <button className="primary-button" type="submit">
          <TicketPlus size={18} aria-hidden="true" />
          Save booking
        </button>
      </form>

      <aside className="fare-panel">
        <p className="eyebrow">Trip Summary</p>
        {selectedRoute ? (
          <>
            <h2>{selectedRoute.destination}</h2>
            <dl>
              <div>
                <dt>Origin</dt>
                <dd>{selectedRoute.origin}</dd>
              </div>
              <div>
                <dt>Departure</dt>
                <dd>{selectedRoute.departure}</dd>
              </div>
              <div>
                <dt>Fare per seat</dt>
                <dd>PHP {selectedRoute.fare}</dd>
              </div>
              <div>
                <dt>Estimated total</dt>
                <dd>PHP {selectedRoute.fare * Number(draft.seats || 0)}</dd>
              </div>
            </dl>
          </>
        ) : (
          <p className="error-message">
            <AlertCircle size={18} aria-hidden="true" />
            Choose a route to preview the fare.
          </p>
        )}
      </aside>
    </section>
  );
}

export default BookingPage;
