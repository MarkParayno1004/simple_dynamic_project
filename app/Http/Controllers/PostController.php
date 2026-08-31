<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of blog posts, optionally filtered by category.
     */
    public function index(Request $request): Response
    {
        $categoryId = $request->query('category_id');

        $posts = Post::query()
            ->with('category')
            ->when($categoryId, function ($query, $catId): void {
                $query->where('category_id', $catId);
            })
            ->latest()
            ->get();

        $categories = Category::query()
            ->withCount('posts')
            ->orderBy('name')
            ->get();

        $selectedCategory = $categoryId ? Category::find($categoryId) : null;

        return Inertia::render('posts/index', [
            'posts' => $posts,
            'categories' => $categories,
            'selectedCategoryId' => $categoryId ? (int) $categoryId : null,
            'selectedCategory' => $selectedCategory,
        ]);
    }

    /**
     * Display the specified blog post.
     */
    public function show(Post $post): Response
    {
        $post->load('category');

        $categories = Category::query()
            ->withCount('posts')
            ->orderBy('name')
            ->get();

        return Inertia::render('posts/show', [
            'post' => $post,
            'categories' => $categories,
        ]);
    }
}
