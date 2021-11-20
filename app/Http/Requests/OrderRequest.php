<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'ten' => 'required|string|min:4|max:100',
            'diachi' => 'required|string'
        ];
    }

    public function messages()
    {
        return [
            'required' => ':attribute không được để trống!',
            'string' => ':attribute phải là kiểu chuỗi!',
            'min' => ':attribute phải có ít nhất :min ký tự!',
            'max' => ':attribute có tối đa :max ký tự!',
        ];
    }

    public function attributes()
    {
        return [
            'ten' => 'Tên món ăn',
            'diachi' => 'Mô tả',
        ];
    }
}
