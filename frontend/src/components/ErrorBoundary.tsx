import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * React Error Boundary — catches rendering errors in child components
 * and shows a friendly fallback UI instead of a blank screen.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            maxWidth: '600px',
            margin: '3rem auto',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-danger)' }}>
            Something went wrong
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            An unexpected error occurred while rendering this component.
            Try refreshing the page.
          </p>
          <details
            style={{
              textAlign: 'left',
              background: 'var(--surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <summary style={{ cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Error details
            </summary>
            <pre
              style={{
                marginTop: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--color-danger)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              {this.state.error?.message}
              {'\n'}
              {this.state.error?.stack}
            </pre>
          </details>
          <button
            className="btn"
            onClick={() => window.location.reload()}
            style={{ padding: '0.5rem 1.5rem' }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
