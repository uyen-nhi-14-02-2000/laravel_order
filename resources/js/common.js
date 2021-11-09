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

    var options = {
        baseURL: protocol + "//" + hostname + "/",
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
    data
) {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: colorButtonConfirm,
        cancelButtonColor: colorButtonCancel,
        confirmButtonText: confirmBtn,
    }).then((result) => {
        if (result.isConfirmed) {
            // _functionSubmit(data);
            if (typeof _functionSubmit == "function") {
                _functionSubmit(data);
            }
        }
    });
}
