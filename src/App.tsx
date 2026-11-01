import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { lazy, Suspense, type ReactNode } from 'react'
import { SuppliersPage } from './pages/SuppliersPage'
import { SectionPage } from './pages/SectionPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { SiteLayout } from './components/SiteLayout'
import { AuthProvider } from './components/AuthProvider'
import { menuItems } from './content/home'
import { sections } from './sections'

const DesignPage = lazy(() => import('./pages/DesignPage').then(module => ({ default: module.DesignPage })))
const BusinessPage = lazy(() => import('./pages/BusinessPage').then(module => ({ default: module.BusinessPage })))
const KnowledgePage = lazy(() => import('./pages/KnowledgePage').then(module => ({ default: module.KnowledgePage })))
const SearchPage = lazy(() => import('./pages/SearchPage').then(module => ({ default: module.SearchPage })))
const KnowledgeArticlePage = lazy(() => import('./pages/KnowledgeArticlePage').then(module => ({ default: module.KnowledgeArticlePage })))
const DesignStagePage = lazy(() => import('./pages/DesignStagePage').then(module => ({ default: module.DesignStagePage })))
const DesignSurveyPage = lazy(() => import('./pages/DesignSurveyPage').then(module => ({ default: module.DesignSurveyPage })))
const DesignChecklistPage = lazy(() => import('./pages/DesignChecklistPage').then(module => ({ default: module.DesignChecklistPage })))
const SimilarPage = lazy(() => import('./pages/SimilarPage').then(module => ({ default: module.SimilarPage })))
const DocumentsPage = lazy(() => import('./pages/DocumentsPage').then(module => ({ default: module.DocumentsPage })))
const AccountPage = lazy(() => import('./pages/AccountPage').then(module => ({ default: module.AccountPage })))
function DesignSection({ children }: { children: ReactNode }) {
  return <Suspense fallback={<main id="main-content"><p role="status">Загрузка раздела…</p></main>}>{children}</Suspense>
}

const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(module => ({ default: module.PrivacyPage })))
const ReferencePage = lazy(() => import('./pages/ReferencePage').then(module => ({ default: module.ReferencePage })))

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/business" element={<DesignSection><BusinessPage /></DesignSection>} />
          <Route path="/similar-products" element={<DesignSection><SimilarPage /></DesignSection>} />
          <Route path="/similar-products/survey" element={<DesignSection><SimilarPage /></DesignSection>} />
          <Route path="/privacy" element={<DesignSection><PrivacyPage /></DesignSection>} />
          <Route path="/agreement" element={<DesignSection><ReferencePage document="agreement" /></DesignSection>} />
          <Route path="/fees" element={<DesignSection><ReferencePage document="fees" /></DesignSection>} />
          <Route path="/design" element={<DesignSection><DesignPage /></DesignSection>} />
          <Route path="/design/survey" element={<DesignSection><DesignSurveyPage /></DesignSection>} />
          <Route path="/design/result" element={<DesignSection><DesignSurveyPage /></DesignSection>} />
          <Route path="/design/stages/:stageId" element={<DesignSection><DesignStagePage /></DesignSection>} />
          <Route path="/design/checklist" element={<DesignSection><DesignChecklistPage /></DesignSection>} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/knowledge" element={<DesignSection><KnowledgePage /></DesignSection>} />
          <Route path="/search" element={<DesignSection><SearchPage /></DesignSection>} />
          <Route path="/documents" element={<DesignSection><DocumentsPage /></DesignSection>} />
          <Route path="/knowledge/:slug" element={<DesignSection><KnowledgeArticlePage /></DesignSection>} />
          {sections.filter(section => !['/business', '/design', '/similar-products'].includes(section.path)).map((section) => <Route key={section.path} path={section.path} element={<SectionPage title={section.title} />} />)}
          {menuItems.filter(item => !['/suppliers', '/knowledge', '/documents', '/fees'].includes(item.path)).map((item) => <Route key={item.path} path={item.path} element={<PlaceholderPage title={item.title} />} />)}
          <Route path="/account" element={<DesignSection><AccountPage /></DesignSection>} />
          <Route path="/account/routes/:routeId" element={<DesignSection><AccountPage /></DesignSection>} />
          <Route path="*" element={<SectionPage title="Страница не найдена" />} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
