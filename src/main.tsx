import { StrictMode } from 'react'
import { DataProvider } from './context/DataContext.tsx'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Background from './components/Background.tsx'
import Detail from './components/Detail.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <Background />
      <Detail />
      <App />
    </DataProvider>
  </StrictMode>,
)

const loader = document.getElementById('loader')
if (loader) {
  loader.classList.add('fade-out')
  setTimeout(() => {
    loader.remove()
  }, 5500)
}