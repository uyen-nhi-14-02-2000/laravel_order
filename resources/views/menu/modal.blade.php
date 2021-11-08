<div class="modal fade" id="modal-form">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">{{ $data->tenmon }}</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="img d-flex justify-content-center" style="height: 300px;">
                    <img src="{{ $data->anh }}" style="height: 100%" alt="">
                </div>
                <div class="description">{{ $data->mota }}</div>
                <form id="form-save" action="" method="post">
                </form>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default" data-dismiss="modal">{{ __('Đóng') }}</button>
                <div class="d-flex">
                    <input type="text" class="form-control mr-2" value="1" style="width: 50px; text-align: center;">
                    <button type="button" id="{{ $data == null ? 'button-store' : 'button-update' }}"
                        class="btn btn-primary">{{ __('Thêm vào giỏ hàng') }}</button>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
