import { baseUrl } from "../utils/constants";

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

function addCardLike(_id, token) {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

function removeCardLike(_id, token) {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

export { getItems, addItem, deleteItem, addCardLike, removeCardLike };