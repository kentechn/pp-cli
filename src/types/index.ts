export interface ArticleMetadata {
  title: string;
  tags: string[];
}

export interface CreateArticleOptions {
  title?: string;
}

export interface UpdateArticleOptions {
  title?: string;
  tags?: string[];
}

export interface Article {
  hash: string;
  username: string;
  metadata: ArticleMetadata;
  content: string;
}
