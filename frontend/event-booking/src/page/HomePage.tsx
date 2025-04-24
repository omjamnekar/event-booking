import React, { useEffect, useState } from 'react';
import { getEvents } from '../services/api.service';
import { Link } from 'react-router-dom';
import './css/Home.css'; 

type Event = {
  id: number;
  name: string;
  description: string;
  date: string;
};

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Upcoming Events</h1>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <ul className="event-list">
          {events.map((event) => (
            <li key={event.id} className="event-item">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <Link to={`/event/${event.id}`}>
                <button className="view-book-btn">View & Book</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
