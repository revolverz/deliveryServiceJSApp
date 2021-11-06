const renderItems = (data) => {
    data.forEach( ( elem ) => {
        console.log(elem);
    })
}

fetch(`https://testbackend-204d3-default-rtdb.firebaseio.com/db/partners.json`)
    .then((response) => response.json())
    .then((data) => {
        renderItems(data);
    })
    .catch((error) => {
        console.log(error);
    })
