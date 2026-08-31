import { Link } from '@inertiajs/react';
import type React from 'react';
import { home } from '@/routes';
import type { Category } from '@/types/blog';

interface BlogLayoutProps {
    categories: Category[];
    selectedCategoryId?: number | null;
    children: React.ReactNode;
}

export default function BlogLayout({
    categories,
    selectedCategoryId,
    children,
}: BlogLayoutProps) {
    const totalPostsCount = categories.reduce(
        (sum, cat) => sum + (cat.posts_count ?? 0),
        0,
    );

    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
            {/* Header / Navbar */}
            <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                    <Link
                        href={home.url()}
                        className="group flex items-center gap-3 transition"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold text-white shadow-sm transition group-hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:group-hover:bg-zinc-300">
                            B
                        </div>
                        <div>
                            <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                                Simple Blog
                            </span>
                            <span className="hidden text-xs text-zinc-500 sm:inline-block sm:ml-2 dark:text-zinc-400">
                                Powered by Laravel 13 & React
                            </span>
                        </div>
                    </Link>

                    <nav className="flex items-center gap-4 text-sm font-medium">
                        <Link
                            href={home.url()}
                            className="rounded-md px-3 py-1.5 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                        >
                            All Posts
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content & Sidebar Grid */}
            <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* Main Content Area */}
                    <main className="min-w-0 lg:col-span-8">
                        {children}
                    </main>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">
                            {/* Categories Card */}
                            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
                                    <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                                        Categories
                                    </h2>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {categories.length} Topics
                                    </span>
                                </div>

                                <ul className="space-y-1">
                                    <li>
                                        <Link
                                            href={home.url()}
                                            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                                                !selectedCategoryId
                                                    ? 'bg-zinc-900 font-medium text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-900'
                                                    : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/70 dark:hover:text-white'
                                            }`}
                                        >
                                            <span className="flex items-center gap-2">
                                                <span className="text-base">✦</span>
                                                <span>All Categories</span>
                                            </span>
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                    !selectedCategoryId
                                                        ? 'bg-zinc-700 text-white dark:bg-zinc-200 dark:text-zinc-900'
                                                        : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                                                }`}
                                            >
                                                {totalPostsCount}
                                            </span>
                                        </Link>
                                    </li>

                                    {categories.map((category) => {
                                        const isSelected =
                                            selectedCategoryId === category.id;

                                        return (
                                            <li key={category.id}>
                                                <Link
                                                    href={home.url({
                                                        query: {
                                                            category_id:
                                                                category.id,
                                                        },
                                                    })}
                                                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                                                        isSelected
                                                            ? 'bg-zinc-900 font-medium text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-900'
                                                            : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/70 dark:hover:text-white'
                                                    }`}
                                                >
                                                    <span className="truncate">
                                                        {category.name}
                                                    </span>
                                                    {typeof category.posts_count ===
                                                        'number' && (
                                                        <span
                                                            className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                                isSelected
                                                                    ? 'bg-zinc-700 text-white dark:bg-zinc-200 dark:text-zinc-900'
                                                                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                                                            }`}
                                                        >
                                                            {
                                                                category.posts_count
                                                            }
                                                        </span>
                                                    )}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* About Blog Card */}
                            <div className="rounded-xl border border-zinc-200 bg-white p-5 text-sm text-zinc-600 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                                <h3 className="mb-2 font-medium text-zinc-900 dark:text-zinc-100">
                                    About This Blog
                                </h3>
                                <p className="leading-relaxed">
                                    A minimalist blog built with Laravel 13,
                                    SQLite, Inertia.js v3, React 19, and Tailwind CSS.
                                    Explore topics by selecting categories above.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-auto border-t border-zinc-200 bg-white py-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <p>
                        © {new Date().getFullYear()} Simple Blog. Built with
                        Laravel 13 & React.
                    </p>
                </div>
            </footer>
        </div>
    );
}
