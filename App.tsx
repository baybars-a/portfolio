import React from 'react';
import Home from './app/page';

/**
 * This component now acts as the entry point for preview environments
 * that use a traditional index.html setup. It bridges to the main Next.js 
 * application page, ensuring the correct, editable portfolio is displayed.
 */
const App: React.FC = () => {
  return <Home />;
};

export default App;