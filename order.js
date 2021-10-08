getOrderDetailAPI();

//get order detail API
function getOrderDetailAPI() {
    $.ajax({
        type: "GET",
        url: "https://5dd36f7f6625890014a6e565.mockapi.io/api/v1/etrust",
        success: function (res) {
            var orders, fieldOrder;
            res[0].data.forEach((itemData) => {
                let orderData = JSON.stringify(itemData);
                let status;
                if (itemData.confirmed == 1) {
                    status = "Confirmed";
                } else {
                    status = "Unconfimred";
                }
                orders += `<tr>`;
                orders += `<td> ${itemData.order_id} </td>`;
                orders += `<td> ${status} </td>`;
                orders += `<td> ${itemData.customer_name} </td>`;
                orders += `<td> ${itemData.addr1} </td>`;
                orders += `
                    <td>
                        <button type="button" class="btn btn-outline-info btn-view" data-toggle="modal" data-target="#modalDetail" data-order='${orderData}'>View</button>
                        <button type="button" class="btn btn-outline-success" onclick="confirmOrder()">Confirm</button>
                    </td>
                `;
                orders += "</tr>";
            });
            $("#data").html(orders);

            $(".btn-view").click(function () {
                let orderDetailHTML = $("#order-detail");
                let data = $(this).data("order");
                fieldOrder = "";
                let status;
                if (data.confirmed == 1) {
                    status = "Confirmed";
                } else {
                    status = "Unconfimred";
                }
                fieldOrder = `
                    <tr>
                        <td>Order Id</td>
                        <td>${data.order_id} </td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>${status} </td>
                    </tr>
                    <tr>
                        <td>Customer Name</td>
                        <td>${data.customer_name} </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>${data.email} </td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>${data.telM} </td>
                    </tr>
                    <tr>
                        <td>Mobile phone</td>
                        <td>${data.telM2} </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>${data.addr1} </td>
                    </tr>
                    <tr>
                        <td>Notes</td>
                        <td>${data.notes} </td>
                    </tr>
                `;
                orderDetailHTML.html(fieldOrder);
            });
        }
    });
}

// btn order details confirmation
function confirmOrder() {
    let status = confirm("Confirm order!");
    if (status == true) {
        console.log("OK");
    } else {
        console.log("Cancel");
    }
}