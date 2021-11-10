@extends('layouts.default')
@section('title', 'Đơn hàng đã đặt')
@section('content')
    <div id="order-placed-page">
        <div id="list-order-placed">
            @include('order.list-order-placed', ['data' => $data])
        </div>
        <div id="modal-box" class="modal-box">
        </div>
    </div>
    

@endsection

@section('js_custom')
    <script src="{{ asset('js/order-placed.js') }}"></script>
@endsection
