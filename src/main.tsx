import { StrictMode } from 'react'
import { DataProvider } from './context/DataContext.tsx'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Background from './components/Background.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <Background />
      <App />
    </DataProvider>
  </StrictMode>,
)
