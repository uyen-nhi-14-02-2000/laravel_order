<div class="card card-info">
    <div class="card-header">
        <h3 class="card-title">{{ __('Tìm kiếm') }}</h3>

        <div class="card-tools">
            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                <i class="fas fa-minus"></i>
            </button>
        </div>
    </div>
    <!-- /.card-header -->
    <div class="card-body">
        <form id="form-search" action="">
            <div class="row d-flex justify-content-between align-items-center">
                <div class="form-group col-md-6 row my-0">
                    <label for="nameSearch" class="col-md-3 col-form-label">{{ __('Name category') }}</label>
                    <div class="col-md-9">
                        <input type="text" value="" class="form-control" id="nameSearch" name="kName">
                    </div>
                </div>
                <div class="form-group col-md-6 row my-0">
                    <label for="statusSearch" class="col-md-2 col-form-label">{{ __('Status') }}</label>
                    <div class="col-md-10">
                        <select name="kStatus" id="statusSearch" class="form-control">
                            <option value="">{{ __('All') }}</option>
                            {{-- <option value="1">{{ __('Active') }}</option>
                            <option value="0">{{ __('Disable') }}</option> --}}
                            {{-- @foreach (array_reverse(config('constant.status')) as $status)
                                <option value="{{ $status['value'] }}">
                                    {{ __($status['text']) }}</option>
                            @endforeach --}}
                        </select>
                    </div>
                </div>
            </div>
        </form>
        <!-- /.row -->
    </div>
    <!-- /.card-body -->
    <div class="custom-search-footer card-footer d-flex justify-content-end">
        <button class="btn btn-xs btn-default mx-1 button-custom button-clear">{{ __('Làm mới') }}</button>
        <button class="btn btn-xs btn-success mx-1 button-custom button-search">{{ __('Tìm kiếm') }}</button>
    </div>
</div>
