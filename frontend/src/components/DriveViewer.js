import React from 'react';
import DriveOAuth from './DriveOAuth';

function DriveViewer() {

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>📁 Google Drive Setup</h2>
      
      <DriveOAuth />

    </div>
  );
}

export default DriveViewer;
