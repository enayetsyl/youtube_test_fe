// App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [googleId, setGoogleId] = useState('');
  const handleAuth = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };
console.log(googleId)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const googleId = params.get('googleId');
    if (googleId) {
      setGoogleId(googleId);
      console.log('Google ID:', googleId);
      // Optionally clear the URL parameters
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  const handleUpload = async () => {
    
    const response = await fetch('http://localhost:3001/uploadVideo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: googleId }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <button onClick={handleAuth}>Authorize YouTube Access</button>
      <button onClick={handleUpload}>Upload Video</button>
    </div>
  );
}

export default App;
