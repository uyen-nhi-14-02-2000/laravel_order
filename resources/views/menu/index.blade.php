@extends('layouts.default')
@section('title', 'Thực đơn')
@section('content')
    <div id="menu-page">
        <div id="search-area" class="" style=" padding-top: 10px">
            @include('menu.search', ['search' => $search = null])
        </div>
        <div id="list-area">
            <div class="row">
                @foreach ($data as $item)
                    <div class="col-12 col-md-3">
                        <div class="card card-success" data-key="{{ $item->id }}">
                            <div class="card-header">
                                <h3 class="card-title">{{ $item->tenmon }}</h3>
                            </div>
                            <div class="card-body">
                                <img class="product-detail" src="{{ $item->anh }}" style="max-height: 140px; width: 100%"
                                    alt="">
                            </div>
                            <div class="card-footer">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="price">Giá: {{ $item->gia }} VND</div>
                                    <div class="btn-order"><a class="btn btn-sm btn-primary" href="#">Đặt hàng</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
        <div id="modal-box" class="modal-box">
        </div>
    </div>

@endsection

@section('js_custom')
    <script src="{{ asset('js/menu.js') }}"></script>
@endsection
