// A mock function to mimic making an async request for data
export function fetchServices() {
    return fetch("http://localhost:5000/services")
      .then((response => response.json()))
  }
  