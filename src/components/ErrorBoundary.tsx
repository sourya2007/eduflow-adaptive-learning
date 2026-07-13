import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-on-surface">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm p-8 max-w-[448px] w-full text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-error-container text-on-error-container rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-on-surface mb-2 tracking-tight">Something went wrong</h1>
            <p className="text-on-surface-variant mb-8">
              We encountered an unexpected error while loading this page. Please try again.
            </p>
            <div className="flex flex-col w-full gap-4">
              <button
                onClick={() => {
                  // @ts-ignore
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="w-full py-3 px-4 bg-primary text-on-primary rounded-lg font-semibold shadow-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                Try Again
              </button>
              <Link to="/" className="w-full py-3 px-4 bg-surface-container text-on-surface rounded-lg font-medium hover:bg-surface-container-high transition-colors">
                Return to Home
              </Link>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
               <div className="mt-8 text-left w-full overflow-auto bg-surface-container p-4 rounded-lg text-xs font-mono text-on-surface-variant">
                 <p className="font-bold mb-2 text-error">{this.state.error.toString()}</p>
                 <pre>{this.state.error.stack}</pre>
               </div>
            )}
          </div>
        </div>
      );
    }

    // @ts-ignore
    return this.props.children;
  }
}

export default ErrorBoundary;
