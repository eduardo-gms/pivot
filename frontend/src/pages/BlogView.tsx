import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { api } from '../api';
import 'highlight.js/styles/github-dark.css'; // Add a syntax highlighting theme

interface ArticleDetail {
  id: string;
  slug: string;
  algorithmId: string | null;
  createdAt: string;
  title: string;
  content: string;
  seoDescription: string | null;
}

export function BlogView() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    setIsLoading(true);
    api
      .get<ArticleDetail>(`/articles/${slug}`)
      .then((res) => {
        setArticle(res.data);
        setError(null);
      })
      .catch(() => {
        setError('Article not found');
      })
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) {
    return <p style={{ textAlign: 'center', color: '#64748b', marginTop: '3rem' }}>{t('Loading')}...</p>;
  }

  if (error || !article) {
    return (
      <div style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>404</h2>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>{t('Article not found')}</p>
        <Link to="/" className="btn">← {t('Home')}</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      <Link to="/" style={{ color: '#6366f1', fontSize: '0.9rem' }}>
        ← {t('Home')}
      </Link>

      <article style={{ marginTop: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
          {article.title}
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '2rem' }}>
          {new Date(article.createdAt).toLocaleDateString()}
        </p>

        <div className="glass-panel" style={{ padding: '2rem', lineHeight: 1.7 }}>
          <div className="prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  );
}
