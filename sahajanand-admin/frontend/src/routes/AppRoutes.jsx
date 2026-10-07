import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Jobs from '../pages/careers/Jobs'
import OurProducts from '../pages/products/OurProducts'
import Blogs from '../pages/blogs/Blogs'
import AiLab from '../pages/ai-lab/AiLab'
import ContactInquiries from '../pages/contact/ContactInquiries'
import RequireAuth from '../components/RequireAuth'
import Login from '../pages/auth/Login'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />

      <Route element={<RequireAuth />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/careers" replace />} />

          <Route path="careers/*" element={<Jobs />} />

          <Route path="products/*" element={<OurProducts />} />

          <Route path="blogs/*" element={<Blogs />} />

          <Route path="ai-lab/*" element={<AiLab />} />

          <Route path="contact-inquiries" element={<ContactInquiries />} />

          <Route path="*" element={<Navigate to="/careers" replace />} />
        </Route>
      </Route>
    </Routes>
  )
}
