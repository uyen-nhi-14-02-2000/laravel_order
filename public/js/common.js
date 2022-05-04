function showProgress() {
    var progress_bar = jQuery("#progress");
    if (progress_bar.length == 1) {
        progress_bar.show();
    }
}

function hideProgress() {
    var progress_bar = jQuery("#progress");
    if (progress_bar.length == 1) {
        progress_bar.hide();
    }
}

axios.interceptors.request.use(
    function (options) {
        showProgress();
        return options;
    },
    function (error) {
        hideProgress();
    }
);

function izanagi(_action, _method, _data, _params, _callback, _callbackError) {
    var protocol = window.location.protocol;
    var hostname = window.location.hostname;
    var port = "8000";

    var options = {
        baseURL: protocol + "//" + hostname + ":" + port + "/",
        url: _action,
        method: _method,
    };

    if (typeof _data === "object") {
        if (_data instanceof FormData) {
            options.headers = {};
            options.headers["Content-Type"] = "multipart/form-data";
            options.data = _data;
        } else {
            options.data = qs.stringify(_data);
        }
    }

    if (typeof _params === "object") {
        options.params = _params;
    } else {
        options.params = qs.stringify(_params);
    }

    axios(options)
        .then(function (response) {
            // setTimeout(function () {
            //     hideProgress();
            // }, 500);
            if (typeof _callback == "function") {
                _callback(response);
            }
        })
        .catch(function (error) {
            // setTimeout(function () {
            //     hideProgress();
            // }, 500);
            // console.log();
            if (typeof _callbackError == "function") {
                _callbackError(error.response);
            }
        });
}

function swalAlert(type, title, message) {
    swal.fire({
        icon: type,
        title: title,
        html: message,
    });
}

function swalAlertConfirm(
    icon,
    title,
    message,
    confirmBtn,
    colorButtonCancel,
    colorButtonConfirm,
    _functionSubmit,
    data,
    cancelBtn = 'Cancel',
) {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: colorButtonConfirm,
        cancelButtonColor: colorButtonCancel,
        confirmButtonText: confirmBtn,
        cancelButtonText: cancelBtn,
    }).then((result) => {
        if (result.isConfirmed) {
            // _functionSubmit(data);
            if (typeof _functionSubmit == "function") {
                _functionSubmit(data);
            }
        }
    });
}

function getCart (data = {}, url = "cart", method = "get") {
    izanagi(
        url,
        method,
        data,
        null,
        getCartCallback
    );
}

function getCartCallback (res) {
    if (res.data.status) {
        let myCart = $(".my-cart");
        let listProductInCart = $(".list-product-in-cart");
        let qtyProduct = $(".qty-product-in-cart");

        let protocol = window.location.protocol;
        let hostname = window.location.hostname;
        var port = "8000";

        let url = protocol + "//" + hostname + ":" + port + "/order";

        // console.log(res.data);
        qtyProduct.html(Object.keys(res.data.cart).length);

        let html = "";
        $.each(res.data.cart, function (key, value) {
            // alert(value.tenmon);
            html +=
                `
                <a href="#" class="dropdown-item cart-item" data-id="` +
                value.id +
                `">
                    <!-- Message Start -->
                    <div class="media">
                        <img src="` +
                value.anh +
                `"
                            alt="Image product" class="img-size-50 mr-3 img-circle">
                        <div class="media-body">
                            <h3 class="dropdown-item-title text-wrap">` +
                value.tenmon +
                `</h3>
                            <p class="text-sm">Số lượng: ` +
                value.qty +
                `</p>
                            <p class="text-sm text-muted"><i class="fas fa-dollar-sign"></i> Giá: ` +
                value.gia +
                ` VND</p>
                        </div>
                    </div>
                    <!-- Message End -->
                </a>
                <div class="dropdown-divider"></div>`;
        });
        html +=
            `<a href="` +
            url +
            `" class="dropdown-item dropdown-footer">Tới trang giỏ hàng</a>`;
        listProductInCart.html(html);
    }
}
