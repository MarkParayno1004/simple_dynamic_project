<?php

use App\Models\Category;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('it displays the homepage with list of blog posts and categories', function () {
    $category = Category::factory()->create(['name' => 'Laravel']);
    $posts = Post::factory()->count(3)->create(['category_id' => $category->id]);

    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('posts/index')
        ->has('posts', 3)
        ->has('categories', 1)
        ->where('selectedCategoryId', null)
    );
});

test('it filters posts by category_id query parameter', function () {
    $categoryA = Category::factory()->create(['name' => 'Design']);
    $categoryB = Category::factory()->create(['name' => 'Backend']);

    $postA = Post::factory()->create(['category_id' => $categoryA->id, 'title' => 'Design Post']);
    $postB = Post::factory()->create(['category_id' => $categoryB->id, 'title' => 'Backend Post']);

    $response = $this->get('/?category_id='.$categoryA->id);

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('posts/index')
        ->has('posts', 1)
        ->where('posts.0.id', $postA->id)
        ->where('posts.0.title', 'Design Post')
        ->where('selectedCategoryId', $categoryA->id)
        ->where('selectedCategory.id', $categoryA->id)
    );
});

test('it displays a specific blog post page', function () {
    $category = Category::factory()->create(['name' => 'AI']);
    $post = Post::factory()->create([
        'category_id' => $category->id,
        'title' => 'Exploring AI Agents',
        'slug' => 'exploring-ai-agents',
        'excerpt' => 'An article about AI agents.',
        'body' => 'Full body of the post content.',
    ]);

    $response = $this->get('/posts/'.$post->slug);

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('posts/show')
        ->where('post.id', $post->id)
        ->where('post.title', 'Exploring AI Agents')
        ->where('post.slug', 'exploring-ai-agents')
        ->where('post.category.name', 'AI')
        ->has('categories')
    );
});

test('it returns 404 for a non-existent post slug', function () {
    $response = $this->get('/posts/non-existent-post');

    $response->assertNotFound();
});
