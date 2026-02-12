const baseUrl = "http://localhost:3001";

function processServerResponse(res){
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(processServerResponse);
}


function addItem({ name, imageUrl, weather }) {
    return fetch(`${baseUrl}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    body: JSON.stringify({ name, imageUrl, weather }),
    }).then(processServerResponse);

}



function deleteItem(_id) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
  }).then(processServerResponse);
}

export { getItems, addItem, deleteItem };