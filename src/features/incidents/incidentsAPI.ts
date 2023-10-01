export function fetchIncidentsByService(serviceId) {
  return fetch(`http://localhost:5000/incidents-by-service/${serviceId}`)
    .then((response => response.json()))
}

