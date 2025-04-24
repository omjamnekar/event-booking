import  { useEffect, useState } from "react";
import { api } from "../services/api.service";
import "./css/EventLiist.css";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchEvents = async () => {
    try {
      const url = search
        ? `/events?search=${search}`
        : `/events?page=${page}&limit=5`;
      const res = await api.get(url);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [page, search]);

  return (
    <div className="event-list-container">
      <h1 className="event-list-heading">Explore Events</h1>

      <div className="mb-6">
        <input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="event-card-container">
        {events.map((event: any) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <button className="btn-view-details">View Details</button>
          </div>
        ))}
      </div>

      <div className="pagination-buttons">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default EventList;
