export function createIncident(payload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'From': payload.from },
    body: payload?.form
  };
  return fetch(`http://localhost:5000/new-incident`, requestOptions)
    .then((response => response.json()))
}
