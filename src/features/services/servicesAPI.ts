export function fetchServices() {
  return fetch("http://localhost:5000/services")
    .then((response => response.json()))
}