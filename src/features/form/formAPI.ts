export function createIncident(payload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };
  return fetch(`http://localhost:5000/new-incident`, requestOptions)
    .then((response => response.json()))
}
