import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Login from '../pages/Login.tsx'
import Dashboard from '../pages/Dashboard.tsx'
import Register from '../pages/Register.tsx'
import CRM from '../pages/CRM.tsx'
import Docs from '../pages/Docs.tsx'
import Legal from '../pages/Legal.tsx'
import Settings from '../pages/Settings.tsx'
import NotFound from '../pages/NotFound.tsx'

export default function AppRoutes() { return <Routes><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /><Route element={<ProtectedRoute />}><Route path="/dashboard" element={<Dashboard />} /><Route path="/crm" element={<CRM />} /><Route path="/docs" element={<Docs />} /><Route path="/legal" element={<Legal />} /><Route path="/settings" element={<Settings />} /></Route><Route path="/" element={<Navigate to="/dashboard" replace />} /><Route path="*" element={<NotFound />} /></Routes> }