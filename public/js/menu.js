(function ($) {
    let Menu = function () {};
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
                jQuery.Menu.showModalCallback
                // jQuery.Menu.showModalCallbackError
            );
        },

        showModalCallback: function (res) {
            console.log(res.data.view);
            if (res.data.status) {
                $("#menu-page #modal-box").html("");
                $("#menu-page #modal-box").html(res.data.view);
                $("#menu-page #modal-form").modal({
                    backdrop: "static",
                    keyboard: false,
                });
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

        // $layoutList.on("click", "#button-add", function () {
        //     // e.preventDefault();
        //     data = {};
        //     let url = "dashboard/menus/create";
        //     let method = "get";
        //     jQuery.Menu.showModal();
        // });

        // $modalBox.on("click", "#button-store", function () {
        //     let data = jQuery.Menu.getParams($("#form-save"));
        //     let url = "dashboard/menus/store";
        //     let method = "post";
        //     jQuery.Menu.submitData(data, url, method);
        // });

        // $modalBox.on("click", "#button-update", function () {
        //     let page =
        //         Number(
        //             $(".page-item.active").find(".page-link").attr("data-page")
        //         ) || 1;

        //     let data = jQuery.Menu.getParams(
        //         $("#form-save"),
        //         jQuery.Menu.getParams($("#form-search"), {
        //             page: page,
        //         })
        //     );

        //     let url = "dashboard/menus/update/" + data.id;
        //     let method = "post";
        //     jQuery.Menu.submitData(data, url, method);
        // });

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

        // $layoutList.on("click", ".button-edit", function () {
        //     let data = {};
        //     let id = $(this).parent().parent().attr("data-key");
        //     if (id == null || id == "" || id == "undefined") {
        //         return;
        //     }
        //     let url = "dashboard/menus/edit/" + id;
        //     let method = "get";
        //     jQuery.Menu.showModal(data, url, method);
        // });

        // $layoutList.on("click", ".button-delete", function () {
        //     // let data = {};
        //     let id = $(this).parent().parent().attr("data-key");
        //     if (id == null || id == "" || id == "undefined") {
        //         return;
        //     }

        //     let page =
        //         Number(
        //             $(".page-item.active").find(".page-link").attr("data-page")
        //         ) || 1;

        //     let data = jQuery.Menu.getParams($("#form-search"), {
        //         page: page,
        //         id: id,
        //     });
        //     jQuery.Menu.deleteConfirm(data);
        // });
    } catch (e) {
        console.log(e);
        alert("The engine can't understand this code, it's invalid");
    }
});
