<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tech = Category::where('slug', 'technology')->first();
        $web = Category::where('slug', 'web-development')->first();
        $design = Category::where('slug', 'design-ui')->first();
        $laravel = Category::where('slug', 'laravel-php')->first();
        $ai = Category::where('slug', 'artificial-intelligence')->first();

        $posts = [
            [
                'category_id' => $laravel?->id,
                'title' => 'Getting Started with Laravel 13 and React',
                'slug' => 'getting-started-with-laravel-13-and-react',
                'excerpt' => 'Discover the newest features in Laravel 13 and how to build seamless single-page applications with React and Inertia.js.',
                'body' => "Laravel 13 continues the tradition of developer happiness and relentless performance refinements. Combined with Inertia.js v3 and React 19, building modern full-stack single page web applications has never been smoother.\n\nIn this guide, we explore how Laravel handles server-side routing, data hydration, and authentication while delegating component rendering directly to modern React components without the overhead of building traditional separate REST APIs.",
            ],
            [
                'category_id' => $web?->id,
                'title' => 'Mastering Tailwind CSS v4 in Modern Web Apps',
                'slug' => 'mastering-tailwind-css-v4-in-modern-web-apps',
                'excerpt' => 'Learn how the new CSS-first configuration and lightning-fast engine in Tailwind CSS v4 speed up your frontend workflow.',
                'body' => "Tailwind CSS v4 introduces a major rewrite of the framework, switching to a CSS-first approach using the `@theme` directive instead of standard JavaScript configuration files.\n\nWith lightning-fast compilation, native CSS cascade layers, and automatic content detection, styling web applications is now significantly faster and more enjoyable.",
            ],
            [
                'category_id' => $ai?->id,
                'title' => 'The Evolution of AI-Powered Development Tools',
                'slug' => 'the-evolution-of-ai-powered-development-tools',
                'excerpt' => 'How modern AI assistants and autonomous coding agents are reshaping software engineering.',
                'body' => "From simple inline autocomplete suggestions to autonomous multi-file refactoring agents, artificial intelligence has fundamentally altered the pace and craft of software development.\n\nEngineers now spend more time on high-level architecture, design specifications, and domain logic while delegating boilerplate creation and repetitive test setups to intelligent coding assistants.",
            ],
            [
                'category_id' => $design?->id,
                'title' => 'Modern UI/UX Principles for Clean Web Design',
                'slug' => 'modern-ui-ux-principles-for-clean-web-design',
                'excerpt' => 'Key guidelines for typography, spacing, and accessibility that make your web applications delightful to use.',
                'body' => "Great user interface design is invisible. It guides the user seamlessly toward their goals without friction or distraction.\n\nBy following foundational principles of visual hierarchy, consistent spacing scales, high contrast ratios, and clear typography, any developer can craft interfaces that feel polished, professional, and accessible.",
            ],
            [
                'category_id' => $laravel?->id,
                'title' => 'Building Scalable APIs with Laravel Eloquent Resources',
                'slug' => 'building-scalable-apis-with-laravel-eloquent-resources',
                'excerpt' => 'A complete guide to structuring JSON responses and preventing N+1 queries using Eloquent API resources.',
                'body' => "Eloquent API resources provide an expressive and unified transformation layer between your database models and your frontend consumers.\n\nThey ensure your internal database schema is decoupled from external contracts, making future schema migrations and versioning painless while keeping payload sizes lean.",
            ],
            [
                'category_id' => $tech?->id,
                'title' => 'Optimizing SQLite for High-Performance Local Apps',
                'slug' => 'optimizing-sqlite-for-high-performance-local-apps',
                'excerpt' => 'Why SQLite is the go-to embedded database engine and how WAL mode changes the game.',
                'body' => "SQLite is often misunderstood as merely an in-memory test database. In reality, modern SQLite engines with Write-Ahead Logging (WAL) and memory-mapped I/O can easily handle thousands of read and write transactions per second.\n\nFor microservices, single-tenant SaaS apps, and local tools, SQLite delivers unmatched simplicity and zero-maintenance reliability.",
            ],
            [
                'category_id' => $web?->id,
                'title' => 'State Management in React 19: What You Need to Know',
                'slug' => 'state-management-in-react-19-what-you-need-to-know',
                'excerpt' => 'An overview of React 19 hooks, server actions, and modern approaches to state synchronization.',
                'body' => "React 19 introduces major additions that streamline async data fetching and mutation handling. Hooks like `useActionState`, `useOptimistic`, and `useFormStatus` simplify form management without requiring heavyweight external state stores.\n\nCoupled with the React Compiler, unnecessary re-renders are eliminated automatically without tedious manual `useMemo` or `useCallback` annotations.",
            ],
            [
                'category_id' => $design?->id,
                'title' => 'Designing Accessible Dark Mode Experiences',
                'slug' => 'designing-accessible-dark-mode-experiences',
                'excerpt' => 'Techniques for maintaining contrast ratios and pleasant visual hierarchies when implementing dark themes.',
                'body' => "Implementing dark mode is far more nuanced than simply flipping black and white colors. True accessibility requires paying close attention to elevation, desaturated accent colors, reduced eye strain, and readable font weights.\n\nIn this article, we cover practical tips for designing harmonious dark palettes in Tailwind CSS.",
            ],
            [
                'category_id' => $ai?->id,
                'title' => 'Understanding Neural Networks and Machine Learning Basics',
                'slug' => 'understanding-neural-networks-and-machine-learning-basics',
                'excerpt' => 'A beginner-friendly breakdown of weights, biases, and activation functions in deep learning.',
                'body' => "Behind every generative model and image recognizer is a network of mathematical functions arranged in layers.\n\nWe break down how inputs are weighted, summed, and transformed through non-linear activation functions, and how backpropagation allows the network to learn from its mistakes during training.",
            ],
            [
                'category_id' => $tech?->id,
                'title' => 'The Rise of Edge Computing and Serverless Deployments',
                'slug' => 'the-rise-of-edge-computing-and-serverless-deployments',
                'excerpt' => 'How running code close to your users at the edge reduces latency and changes cloud architecture.',
                'body' => "Traditional cloud architectures centralize compute in a few massive regional data centers. Edge computing moves logic directly to Points of Presence (PoPs) worldwide.\n\nThis dramatically cuts round-trip latency for global user bases and opens up new paradigms for distributed caching and state synchronization.",
            ],
        ];

        foreach ($posts as $post) {
            Post::updateOrCreate(['slug' => $post['slug']], $post);
        }
    }
}
