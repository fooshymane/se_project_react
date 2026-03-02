const baseUrl = "http://localhost:3001";

function processServerResponse(res){
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(processServerResponse);
}


function addItem({ name, imageUrl, weather }, token) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(processServerResponse);
}

function deleteItem(_id, token) {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers,
  }).then(processServerResponse);
}

export { getItems, addItem, deleteItem };