import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function useRatings(onUpdate) {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:4000');
    socketRef.current.on('rating-updated', (payload) => {
      if (onUpdate) onUpdate(payload.id, payload.rating);
    });
    return () => socketRef.current.disconnect();
  }, [onUpdate]);
}