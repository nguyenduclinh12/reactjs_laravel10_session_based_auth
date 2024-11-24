<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;

class CategoryPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct() {
       
    }

    private function isOwner(User $user, Category $category)
    {
        return $user->id === $category->creator_id;
    }
    private function isAdmin(User $user)
    {
        return $user->tokenCan('admin');
    }

    public function viewAny(User $user)
    {
        return $user->tokenCan('category:view') || $this->isAdmin($user);
    }
    public function view(User $user, Category $category)
    {
        return $this->isOwner($user, $category) || $this->isAdmin($user);
    }
    public function create(User $user)
    {
        return $user->tokenCan('category:create') || $this->isAdmin($user);
    }
    public function update(User $user, Category $category)
    {
        return $this->isOwner($user, $category) || $this->isAdmin($user);
    }
    public function delete(User $user, Category $category)
    {
        return $this->isOwner($user, $category) || $this->isAdmin($user);
    }
}
