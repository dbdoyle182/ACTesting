console.log("This is connected");

const queryMagento = () => {
    $.ajax({
        method: "GET",
        url: "http://www.security-camera-warehouse.com/api/rest/customers"
    })
    .then((response) => {
        console.log(response)
    })
}

queryMagento();
