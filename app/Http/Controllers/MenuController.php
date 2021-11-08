<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    private $model = null;
    private $data = null;
    private $sort = ['id' => 'desc'];
    private $pageCustom = null;

    public function __construct(Menu $menu)
    {
        $this->model = $menu;
        $this->pageCustom = config('constant')['pageCustom'];
    }

    public function index()
    {

        $this->data = $this->model->search($this->pageCustom, $this->sort);
        return view('menu.index', ['data' => $this->data]);
    }

    public function search(Request $request)
    {
        // $this->model->loadDataSearch($request);

        // if ($request->has('page')) {
        //     $this->pageCustom['page'] = $request->page;
        // }

        // $this->data = $this->model->search($this->pageCustom, $this->sort);

        // $this->data->withPath(route('backend.category.index'));

        // return response()->json([
        //     'status' => true,
        //     'view' => view('backend.category.data_table', ['data' => $this->data])->render(),
        //     'message' => 'Success!'
        // ], 200);
    }

    public function detail(Request $request, $id)
    {
        if ($request->ajax()) {

            $this->data = $this->model->find($id);

            if ($this->data == null) {
                return response()->json([
                    'status' => false,
                    'icon' => 'error',
                    'title' => __('Error'),
                    'message' => __('Page not found!'),
                ], 404);
            }

            return response()->json([
                'status' => true,
                'view' => view('menu.modal', ['data' => $this->data])->render(),
            ], 200);
        }

        return abort(404);
    }
}
