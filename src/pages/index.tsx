import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout title="Home" description="Welcome to My Blog">
      <main className="container">
        <div style={{ textAlign: 'center', padding: '50px 20px' }}>
          <h1>Welcome to My Personal Blog</h1>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Sharing thoughts on technology, programming, and life.
          </p>
          <div style={{ marginTop: '30px' }}>
            <Link className="button button--primary button--lg" to="/blog">
              Read My Blog
            </Link>
            <a href="/TianliangZhang" target="_blank" rel="noopener noreferrer" className="button button--secondary button--lg" style={{ marginLeft: '15px' }}>
              About Me
            </a>

          </div>
          <div style={{ marginTop: '40px' }}>
            <a href="https://github.com/xingkongliang" target="_blank" className="button button--link">GitHub</a>
            <a href="https://www.linkedin.com/in/zhangtianliang" target="_blank" className="button button--link" style={{ marginLeft: '10px' }}>LinkedIn</a>
            <a href="mailto:tianliangjay@gmail.com" className="button button--link" style={{ marginLeft: '10px' }}>Email</a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
