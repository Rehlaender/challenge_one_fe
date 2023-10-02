export function fetchIncidentsByService(serviceId) {
  return fetch(`http://localhost:5000/incidents-by-service/${serviceId}`)
    .then((response => response.json()))
}

export function fetchEditIncident(payload) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };
  return fetch(`http://localhost:5000/update-incident-status`, requestOptions)
    .then((response => response.json()))
}


