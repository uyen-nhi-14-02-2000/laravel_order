<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class AdminPolicy
{
    use HandlesAuthorization;

    public function isAdmin(User $user)
    {
        return auth()->user()->chuc_vu === 1 ? Response::allow() : Response::deny('You do not own this post.');
    }
}
