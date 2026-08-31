export interface Category {
    id: number;
    name: string;
    slug: string;
    posts_count?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Post {
    id: number;
    category_id: number | null;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    created_at: string;
    updated_at: string;
    category?: Category | null;
}
