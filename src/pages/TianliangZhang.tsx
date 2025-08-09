import React from 'react';

export default function TianliangZhang(): JSX.Element {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <iframe 
        src="/cv/index.html"
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 'none',
          margin: 0,
          padding: 0
        }}
        title="Tianliang Zhang's CV"
      />
    </div>
  );
}