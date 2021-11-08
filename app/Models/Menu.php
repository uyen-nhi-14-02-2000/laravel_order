<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Menu extends Model
{
    use HasFactory;

    protected $table = 'menu';

    protected $searchField = [
        'kName' => [
            'value' => null,
            'compare' => 'like',
            'nameDB' => 'name',
        ],
        'kStatus' => [
            'value' => null,
            'compare' => '=',
            'nameDB' => 'status',
        ],
    ];

    public function search($pageCustom, $sort = null)
    {
        $query = Menu::query();

        foreach ($this->searchField as $field => $data) {
            // dd($data['value']);
            if ($data['value'] != null && $data['value'] != '') {
                if ($data['compare'] == 'like') {
                    $query->where($data['nameDB'], $data['compare'], '%' . $data['value'] . '%');
                } else {
                    $query->where($data['nameDB'], $data['compare'], $data['value']);
                }
            }
        }

        foreach ($sort as $key => $value) {
            $query->orderBy($key, $value);
        }

        return $query->paginate($pageCustom['numberOnPage'], $pageCustom['columns'], $pageCustom['pageName'], $pageCustom['page']);
    }
}
