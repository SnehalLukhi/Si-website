import Home from './pages/Home/Home'
import UiUx from './pages/UiUx/UiUx'
import QaTester from './pages/QaTester/QaTester'
import WebDev from './pages/WebDev/WebDev'
import AppDev from './pages/AppDev/AppDev'
import Marketing from './pages/Marketing/Marketing'
import BlogPage from './pages/BlogPage/BlogPage'
import BlogDetail from './pages/BlogDetail/BlogDetail'
import CompanyOverview from './pages/CompanyOverview/CompanyOverview'
import LifePage from './pages/LifePage/LifePage'
import Contact from './pages/Contact/Contact'
import Careers from './pages/Careers/Careers'
import CareersPage from './pages/CareersPage/CareersPage'
import CareersFull from './pages/CareersFull/CareersFull'
import JobDetails from './pages/JobDetails/JobDetails'
import Products from './pages/Products/Products'
import AnimationPreview from './animation-preview/AnimationPreview'
import BackToTop from './components/common/BackToTop'

function App() {
  return (
    <>
      <CurrentPage />
      <BackToTop />
    </>
  )
}

function CurrentPage() {
  const path = window.location.pathname.replace(/\/$/, '')

  if (path === '/animation-preview') {
    return <AnimationPreview />
  }

  const jobMatch = path.match(/^\/careers\/job\/([^/]+)$/)
  if (jobMatch) {
    return <JobDetails jobId={jobMatch[1]} />
  }

  if (path === '/our-product') {
    return <Products />
  }

  if (path === '/careers/full') {
    return <CareersFull />
  }

  if (path === '/careers' || path === '/career') {
    return <CareersPage />
  }

  /* Jobs: the original Careers page (its job cards and the View All link to /careers/full) */
  if (path === '/jobs') {
    return <Careers />
  }

  if (path === '/contact-us' || path === '/contact') {
    return <Contact />
  }

  if (path === '/life-at-sahajanand') {
    return <LifePage />
  }

  if (path === '/company-overview') {
    return <CompanyOverview />
  }

  if (path === '/blog' || path === '/blogs') {
    return <BlogPage />
  }

  /* /blog/<slug>: any blog managed from Admin (a missing slug shows the Blog Not Found state) */
  const blogMatch = path.match(/^\/blogs?\/([^/]+)\/?$/)
  if (blogMatch) {
    return <BlogDetail slug={decodeURIComponent(blogMatch[1])} />
  }

  if (path === '/services/ui-ux' || path === '/ui-ux') {
    return <UiUx />
  }

  if (path === '/services/qa-tester' || path === '/qa-tester') {
    return <QaTester />
  }

  if (path === '/services/web-development' || path === '/web-development') {
    return <WebDev />
  }

  if (path === '/services/app-development' || path === '/app-development') {
    return <AppDev />
  }

  if (path === '/services/marketing' || path === '/marketing') {
    return <Marketing />
  }

  return <Home />
}

export default App
