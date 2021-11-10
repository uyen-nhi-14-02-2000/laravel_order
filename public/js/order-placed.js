(function ($) {
    let OrderPlaced = function () { 
        this.isDone = false;
    };
    jQuery.OrderPlaced = new OrderPlaced();
    jQuery.extend(OrderPlaced.prototype, {

        showModal: function (
            data = {},
            url = "",
            method = "get"
        ) {
            izanagi(
                url,
                method,
                data,
                null,
                jQuery.OrderPlaced.showModalCallback,
                // jQuery.OrderPlaced.showModalCallbackError
            );
        },

        showModalCallback: function (res) {
            if (res.data.status) {
                $("#order-placed-page #modal-box").html("");
                $("#order-placed-page #modal-box").html(res.data.view);
                // $("#menu-page #modal-form").modal({
                //     backdrop: "static",
                //     keyboard: false,
                // });
                $("#order-placed-page #modal-form").modal("show");
            }
        },
        showModalCallbackError: function (err) {
            console.log(err);

            if (err.status == 404) {
                swalAlert(err.data.icon, err.data.title, err.data.message);
                jQuery.OrderPlaced.getData();
            }
        },

        getData: function () {
            data = {};
            izanagi(
                "order/get-data",
                "post",
                data,
                null,
                jQuery.OrderPlaced.getDataCallback,
                ""
            );
        },

        getDataCallback: function (res) {
            if (res.data.status) {
                $("#order-placed-page #cart-area").html(res.data.view);
            }
        },

        removeCart: function (
            data = {},
            url = "cart/remove",
            method = "get"
        ) {
            izanagi(
                url,
                method,
                data,
                null,
                jQuery.OrderPlaced.removeCartCallback
            );
        },

        removeCartCallback: function (res) {
            if (res.data.status) {
                swalAlert(res.data.icon, res.data.title, res.data.message);
                jQuery.OrderPlaced.getCart();
                jQuery.OrderPlaced.getData();
            }
        },

        getCart: function (
            data = {},
            url = "cart",
            method = "get"
        ) {
            izanagi(
                url,
                method,
                data,
                null,
                jQuery.OrderPlaced.getCartCallback
                // jQuery.OrderPlaced.showModalCallbackError
            );
        },

        getCartCallback: function (res) {
            if (res.data.status) {
                let myCart = $(".my-cart");
                let listProductInCart = $(".list-product-in-cart");
                let qtyProduct = $(".qty-product-in-cart");

                // console.log(res.data);
                qtyProduct.html(Object.keys(res.data.cart).length);

                let html = '';
                $.each(res.data.cart, function (key, value) {
                    // alert(value.tenmon);
                    html += `
                        <a href="#" class="dropdown-item cart-item" data-id="` + value.id + `">
                            <!-- Message Start -->
                            <div class="media">
                                <img src="` + value.anh + `"
                                    alt="Image product" class="img-size-50 mr-3 img-circle">
                                <div class="media-body">
                                    <h3 class="dropdown-item-title text-wrap">` + value.tenmon + `</h3>
                                    <p class="text-sm">Số lượng: ` + value.qty + `</p>
                                    <p class="text-sm text-muted"><i class="fas fa-dollar-sign"></i> Giá: ` + value.gia + ` VND</p>
                                </div>
                            </div>
                            <!-- Message End -->
                        </a>
                        <div class="dropdown-divider"></div>`;
                });
                html += `<a href="#" class="dropdown-item dropdown-footer">Tới trang thanh toán</a>`;
                listProductInCart.html(html);
            }
        },
    });
})(jQuery);

$("document").ready(function () {
    try {
        let $listOrderPlaced = $("#order-placed-page #list-order-placed");
        let $myCart = $(".my-cart");

        //Remove product in cart
        $myCart.on("click", ".cart-item", function () {

            let id = $(this).data('id');
            let data = { id: id, isDelAll: false };

            let url = "cart/remove";
            let method = "post";
            // $("#order-placed-page #modal-form").modal("toggle");
            jQuery.OrderPlaced.removeCart(data, url, method);
        });

        $listOrderPlaced.on("click", ".fa-eye", function () {

            let id = $(this).parent().parent().data('id');

            let data = { id: id };
            let url = "order/placed-detail";
            let method = "post";
            jQuery.OrderPlaced.showModal(data, url, method);
        })

    } catch (e) {
        console.log(e);
        alert("The engine can't understand this code, it's invalid");
    }
});
