(function ($) {
    let Menu = function () { };
    jQuery.Menu = new Menu();
    jQuery.extend(Menu.prototype, {
        showModal: function (
            data = {},
            url = "dashboard/menus/create",
            method = "get"
        ) {
            izanagi(
                url,
                method,
                data,
                null,
                jQuery.Menu.showModalCallback,
                // jQuery.Menu.showModalCallbackError
            );
        },

        showModalCallback: function (res) {
            if (res.data.status) {
                $("#menu-page #modal-box").html("");
                $("#menu-page #modal-box").html(res.data.view);
                // $("#menu-page #modal-form").modal({
                //     backdrop: "static",
                //     keyboard: false,
                // });
                $("#menu-page #modal-form").modal("show");
            }
        },
        showModalCallbackError: function (err) {
            console.log(err);

            if (err.status == 404) {
                swalAlert(err.data.icon, err.data.title, err.data.message);
                jQuery.Menu.getDataTable();
            }
        },

        getDataTable: function () {
            data = {};
            izanagi(
                "dashboard/menus/dataTable",
                "get",
                data,
                null,
                jQuery.Menu.getDataTableCallback,
                ""
            );
        },

        getDataTableCallback: function (res) {
            if (res.data.status) {
                $("#menu-page #list-area").html(res.data.view);
                jQuery.Menu.clearSearch();
            }
        },

        getParams: function (ele, object = {}) {
            return ele.serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, object);
        },

        submitData: function (data, url, method) {
            izanagi(
                // "dashboard/menus/store",
                // "post",
                url,
                method,
                data,
                null,
                jQuery.Menu.submitDataCallback,
                jQuery.Menu.submitDataCallbackError
            );
        },

        submitDataCallback: function (res) {
            if (res.data.status) {
                $("#menu-page #modal-form").modal("hide");
                $("#menu-page #list-area").html(res.data.view);
                if (res.data.clear_search) {
                    jQuery.Menu.clearSearch();
                }
            }
        },

        submitDataCallbackError: function (err) {
            // console.log(error.status);
            if (err.status == 422) {
                jQuery.Menu.validateError(err.data.errors);
            } else if (err.status == 404) {
                $("#menu-page #modal-form").modal("hide");
                swalAlert(err.data.icon, err.data.title, err.data.message);
                jQuery.Menu.getDataTable();
            }
        },

        validateError: function (err) {
            $("#menu-page #modal-box .error-mes").remove();
            $("#menu-page #modal-box .is-invalid").removeClass("is-invalid");
            $.each(err, function (key, value) {
                $("#menu-page #modal-box  #" + key).addClass("is-invalid");

                $("#menu-page #modal-box  #" + key)
                    .parent()
                    .append(
                        "<span class='text-danger error-mes'>" +
                        value +
                        "</span>"
                    );
            });
        },

        clearSearch: function () {
            $("input[name='kName']").val("");
            $("#statusSearch").val("");
            $("#statusSearch").trigger("change");
        },

        deleteConfirm: function (data) {
            // console.log(data);
            swalAlertConfirm(
                "warning",
                "Are you sure?",
                "You won't be able to revert this!",
                "Delete",
                "#6e7d88",
                "#ff0000",
                jQuery.Menu.deleteItems,
                data
            );
        },
        deleteItems: function (data) {
            // console.log(data);
            izanagi(
                "dashboard/menus/delete",
                "delete",
                null,
                data,
                jQuery.Menu.deleteItemsCallback,
                jQuery.Menu.deleteItemsCallbackError
            );
        },
        deleteItemsCallback: function (res) {
            if (res.data.status) {
                $("#menu-page #list-area").html(res.data.view);
                jQuery.Menu.clearSearch();
            }
        },

        deleteItemsCallbackError: function (err) {
            // console.log(err);
            if (err.status == 404 || err.status == 500) {
                $("#menu-page #modal-form").modal("hide");
                swalAlert(err.data.icon, err.data.title, err.data.message);
                jQuery.Menu.getDataTable();
            }
        },

        searchData: function (
            data = {},
            url = "dashboard/menus/search",
            method = "post"
        ) {
            izanagi(
                url,
                method,
                data,
                null,
                jQuery.Menu.searchDataCallback,
                jQuery.Menu.searchDataCallbackError
            );
        },

        searchDataCallback: function (res) {
            if (res.data.status) {
                // $("#menu-page #search-area").html(res.data.view_search);
                $("#menu-page #list-area").html(res.data.view);
                // $("#menu-page #modal-form").modal("show");
                // console.log($("#menu-page .pagination-custom"));
            }
        },
        searchDataCallbackError: function (err) {
            console.log(err);

            if (err.status == 404) {
                swalAlert(err.data.icon, err.data.title, err.data.message);
                jQuery.Menu.getDataTable();
            }
        },

        addCart: function (
            data = {},
            url = "cart/add",
            method = "get"
        ) {
            izanagi(
                url,
                method,
                data,
                null,
                jQuery.Menu.addCartCallback,
                jQuery.Menu.addCartCallbackError
            );
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
                jQuery.Menu.getCartCallback
                // jQuery.Menu.showModalCallbackError
            );
        },

        addCartCallback: function (res) {
            if(res.data.status) {
                swalAlert(res.data.icon, res.data.title, res.data.message);
                jQuery.Menu.getCart();
            }
        },

        addCartCallbackError: function (err) {
            console.log(err);

            if (err.status == 404) {
                swalAlert(err.data.icon, err.data.title, err.data.message);
                jQuery.Menu.getDataTable();
            }
        },

        getCartCallback: function (res) {
            if (res.data.status) {
                let myCart = $(".my-cart");
                let listProductInCart = $(".list-product-in-cart");
                let qtyProduct = $(".qty-product-in-cart");

                qtyProduct.html(Object.keys(res.data.cart.product).length);

                let html = '';
                $.each(res.data.cart.product, function (key, value) {
                    // alert(value.tenmon);
                    html += `
                        <a href="#" class="dropdown-item cart-item">
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
        let $layoutSearch = $("#menu-page #search-area");
        let $layoutList = $("#menu-page #list-area");
        let $modalBox = $("#menu-page #modal-box");

        $layoutSearch.on("click", ".button-clear", function () {
            jQuery.Menu.clearSearch();
            data = jQuery.Menu.getParams($("#form-search"));
            jQuery.Menu.searchData(data);
        });

        $layoutSearch.on("click", ".button-search", function () {
            // e.preventDefault();
            data = jQuery.Menu.getParams($("#form-search"));
            // let url = "dashboard/menus/search";
            // let method = "post";
            jQuery.Menu.searchData(data);
        });

        $layoutList.on("click", ".product-detail", function () {
            let data = {};
            let id = $(this).parent().parent().attr("data-key");
            if (id == null || id == "" || id == "undefined") {
                return;
            }
            let url = "menu/detail/" + id;
            let method = "post";
            jQuery.Menu.showModal(data, url, method);
        });

        $layoutList.on("click", ".btn-order", function () {
            let data = {};
            let id = $(this).parent().parent().parent().attr("data-key");
            if (id == null || id == "" || id == "undefined") {
                return;
            }
            let url = "menu/detail/" + id;
            let method = "post";
            jQuery.Menu.showModal(data, url, method);
        });


        //Modal box
        $modalBox.on("click", ".increase-qty", function () {
            let qty = $(this).parent().siblings("input").val();
            if ($.isNumeric(qty)) {
                $(this).parent().siblings("input").val(parseInt(qty) + 1);
            } else {
                $(this).parent().siblings("input").val(1);
            }
        });

        $modalBox.on("click", ".decrease-qty", function () {
            let qty = $(this).parent().siblings("input").val();
            if ($.isNumeric(qty) && parseInt(qty) > 1) {
                $(this).parent().siblings("input").val(parseInt(qty) - 1);
            } else {
                $(this).parent().siblings("input").val(1);
            }
        });

        $modalBox.on("keyup", "input[name='qty']", function () {
            let qty = $(this).val();
            if (!$.isNumeric(qty) || parseInt(qty) < 1) {
                alert("Vui lòng nhập số!");
                $(this).val(1);
            }
        });

        $modalBox.on("click", "#add-cart", function () {
            let qty = $(this).siblings(".qty-product").children("input").val();
            let id = $("input[name='id-product']").val();
            let data = { id: id, qty: qty };

            let url = "cart/add";
            let method = "post";
            $("#menu-page #modal-form").modal("toggle");
            jQuery.Menu.addCart(data, url, method);
        });

    } catch (e) {
        console.log(e);
        alert("The engine can't understand this code, it's invalid");
    }
});
