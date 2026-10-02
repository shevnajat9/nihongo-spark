import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Nihongo Spark crashed:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--text-primary, #fff)',
            background: 'var(--bg-primary, #0f172a)'
          }}
        >
          <div style={{ fontSize: '3rem' }}>😵</div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
            Ups, terjadi kesalahan tak terduga.
          </h1>
          <p style={{ color: 'var(--text-secondary, #94a3b8)', maxWidth: '420px' }}>
            Nihongo Spark mengalami error dan tidak dapat menampilkan halaman ini.
            Coba muat ulang aplikasi.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              padding: '0.75rem 1.75rem',
              borderRadius: '30px',
              border: 'none',
              background: 'linear-gradient(135deg, var(--accent-primary, #8b5cf6), var(--accent-cyan, #06b6d4))',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Muat Ulang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
