import { useEffect, useState } from 'react';

export function useConferenceInfo() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/conference-info/')
      .then(r => r.json())
      .then(setInfo)
      .catch(() => {});
  }, []);

  return info;
}