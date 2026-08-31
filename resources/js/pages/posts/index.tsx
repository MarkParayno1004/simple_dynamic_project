import { Head, Link } from '@inertiajs/react';
import BlogLayout from '@/layouts/blog-layout';
import { home } from '@/routes';
import { show as postShow } from '@/routes/posts';
import type { Category, Post } from '@/types/blog';

interface PostsIndexProps {
    posts: Post[];
    categories: Category[];
    selectedCategoryId?: number | null;
    selectedCategory?: Category | null;
}

export default function PostsIndex({
    posts,
    categories,
    selectedCategoryId,
    selectedCategory,
}: PostsIndexProps) {
    const pageTitle = selectedCategory
        ? `${selectedCategory.name} Posts`
        : 'Latest Blog Posts';

    return (
        <BlogLayout
            categories={categories}
            selectedCategoryId={selectedCategoryId}
        >
            <Head title={pageTitle} />

            <div className="space-y-6">
                {/* Page Title & Active Filter Bar */}
                <div className="flex flex-col gap-2 border-b border-zinc-200 pb-5 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
                            {selectedCategory ? (
                                <span className="flex items-center gap-2">
                                    <span>{selectedCategory.name}</span>
                                    <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                                        ({posts.length}{' '}
                                        {posts.length === 1 ? 'post' : 'posts'})
                                    </span>
                                </span>
                            ) : (
                                'Latest Blog Posts'
                            )}
                        </h1>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                            {selectedCategory
                                ? `Showing articles tagged under ${selectedCategory.name}`
                                : 'Explore insights, guides, and articles.'}
                        </p>
                    </div>

                    {selectedCategory && (
                        <Link
                            href={home.url()}
                            className="inline-flex items-center gap-1 self-start rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-xs transition hover:bg-zinc-50 hover:text-zinc-900 sm:self-auto dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
                        >
                            ✕ Clear Filter
                        </Link>
                    )}
                </div>

                {/* Posts List */}
                {posts.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
                        <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                            No posts found in this category.
                        </p>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            Try exploring other categories or view all posts.
                        </p>
                        <Link
                            href={home.url()}
                            className="mt-4 inline-block rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                            View All Posts
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {posts.map((post) => {
                            const postUrl = postShow.url(post);
                            const formattedDate = new Date(
                                post.created_at,
                            ).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            });

                            return (
                                <article
                                    key={post.id}
                                    className="group relative rounded-xl border border-zinc-200 bg-white p-6 shadow-xs transition duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                                >
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                                        {post.category && (
                                            <Link
                                                href={home.url({
                                                    query: {
                                                        category_id:
                                                            post.category.id,
                                                    },
                                                })}
                                                className="rounded-full bg-zinc-100 px-2.5 py-1 font-medium text-zinc-700 transition hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
                                            >
                                                {post.category.name}
                                            </Link>
                                        )}
                                        <time dateTime={post.created_at}>
                                            {formattedDate}
                                        </time>
                                    </div>

                                    <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                                        <Link
                                            href={postUrl}
                                            className="transition hover:text-zinc-600 dark:hover:text-zinc-300"
                                        >
                                            {post.title}
                                        </Link>
                                    </h2>

                                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-4 flex items-center">
                                        <Link
                                            href={postUrl}
                                            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-900 underline underline-offset-4 transition group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300"
                                        >
                                            <span>Read full article</span>
                                            <span className="transition-transform group-hover:translate-x-1">
                                                →
                                            </span>
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </BlogLayout>
    );
}
