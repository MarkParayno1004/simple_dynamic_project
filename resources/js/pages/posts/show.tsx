import { Head, Link } from '@inertiajs/react';
import BlogLayout from '@/layouts/blog-layout';
import { home } from '@/routes';
import type { Category, Post } from '@/types/blog';

interface PostShowProps {
    post: Post;
    categories: Category[];
}

export default function PostShow({ post, categories }: PostShowProps) {
    const formattedDate = new Date(post.created_at).toLocaleDateString(
        'en-US',
        {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        },
    );

    // Split paragraphs if body contains line breaks
    const bodyParagraphs = post.body.split('\n\n').filter(Boolean);

    return (
        <BlogLayout
            categories={categories}
            selectedCategoryId={post.category_id}
        >
            <Head title={post.title} />

            <article className="space-y-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-xs sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
                {/* Navigation Back Link */}
                <div>
                    <Link
                        href={home.url()}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                        <span>←</span>
                        <span>Back to all posts</span>
                    </Link>
                </div>

                {/* Article Header */}
                <header className="space-y-4 border-b border-zinc-100 pb-6 dark:border-zinc-800">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                        {post.category && (
                            <Link
                                href={home.url({
                                    query: { category_id: post.category.id },
                                })}
                                className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-800 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                            >
                                {post.category.name}
                            </Link>
                        )}
                        <time dateTime={post.created_at}>{formattedDate}</time>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
                        {post.title}
                    </h1>

                    {post.excerpt && (
                        <p className="text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
                            {post.excerpt}
                        </p>
                    )}
                </header>

                {/* Article Content */}
                <div className="prose prose-zinc max-w-none space-y-5 text-base leading-relaxed text-zinc-800 dark:text-zinc-200">
                    {bodyParagraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>

                {/* Article Footer */}
                <footer className="border-t border-zinc-100 pt-6 dark:border-zinc-800">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <Link
                            href={home.url()}
                            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-xs transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                        >
                            ← All Articles
                        </Link>

                        {post.category && (
                            <Link
                                href={home.url({
                                    query: { category_id: post.category.id },
                                })}
                                className="text-sm font-medium text-zinc-600 underline underline-offset-4 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            >
                                More in {post.category.name} →
                            </Link>
                        )}
                    </div>
                </footer>
            </article>
        </BlogLayout>
    );
}
