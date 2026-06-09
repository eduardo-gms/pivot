import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../api';

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

  // Simple Markdown-to-HTML (handles #, ##, ###, **, ```, |tables|, \n)
  const renderContent = (md: string) => {
    const lines = md.split('\n');
    const html: string[] = [];
    let inCodeBlock = false;

    for (const line of lines) {
      if (line.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        html.push(inCodeBlock ? '<pre><code>' : '</code></pre>');
        continue;
      }

      if (inCodeBlock) {
        html.push(line);
        continue;
      }

      if (line.startsWith('### ')) {
        html.push(`<h3 style="margin-top:1.5rem;margin-bottom:0.5rem">${line.slice(4)}</h3>`);
      } else if (line.startsWith('## ')) {
        html.push(`<h2 style="margin-top:2rem;margin-bottom:0.75rem">${line.slice(3)}</h2>`);
      } else if (line.startsWith('# ')) {
        html.push(`<h1 style="margin-top:2rem;margin-bottom:0.75rem">${line.slice(2)}</h1>`);
      } else if (line.startsWith('| ')) {
        // Table row
        const cells = line.split('|').filter(Boolean).map((c) => c.trim());
        if (cells.every((c) => c.match(/^[-:]+$/))) {
          // Separator row — skip
          continue;
        }
        const tag = html.some((h) => h.includes('<table>')) ? 'td' : 'th';
        if (tag === 'th' && !html.some((h) => h.includes('<table>'))) {
          html.push('<table style="width:100%;border-collapse:collapse;margin:1rem 0"><thead><tr>');
        }
        html.push(`<tr>${cells.map((c) => `<${tag} style="padding:0.5rem;border:1px solid rgba(255,255,255,0.1)">${c}</${tag}>`).join('')}</tr>`);
        if (tag === 'th') {
          html.push('</thead><tbody>');
        }
      } else if (line.trim() === '' && html.some((h) => h.includes('<tbody>'))) {
        html.push('</tbody></table>');
      } else if (line.trim() === '') {
        html.push('<br/>');
      } else {
        // Inline formatting
        const formatted = line
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.+?)\*/g, '<em>$1</em>')
          .replace(/`(.+?)`/g, '<code style="background:rgba(255,255,255,0.1);padding:0.15rem 0.4rem;border-radius:4px">$1</code>');
        html.push(`<p style="line-height:1.7;margin-bottom:0.5rem">${formatted}</p>`);
      }
    }

    return html.join('\n');
  };

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

        <div
          className="glass-panel"
          style={{ padding: '2rem', lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{ __html: renderContent(article.content) }}
        />
      </article>
    </div>
  );
}
