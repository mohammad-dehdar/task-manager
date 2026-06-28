import { AlertTriangle } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';

import { Button } from '@/components/ui';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error-100 dark:bg-error-900/30 text-error-500 dark:text-error-400">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Something went wrong</h3>
          <p className="mt-1 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <Button variant="outline" color="gray" onClick={this.handleReset} className="mt-4">
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}