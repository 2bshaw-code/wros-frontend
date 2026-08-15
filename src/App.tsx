import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useAuthStore } from './state/authStore'
import MainLayout from './layouts/MainLayout.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Orders from './pages/Orders.tsx'
import Catalog from './pages/Catalog.tsx'
import Customers from './pages/Customers.tsx'
import Messages from './pages/Messages.tsx'
import Settings from './pages/Settings.tsx'
import Products from './pages/Products.tsx'
import Inventory from './pages/Inventory.tsx'
import AddProduct from './pages/AddProduct.tsx'
import AddInvoice from './pages/AddInvoice.tsx'
import AddCategory from './pages/AddCategory.tsx'
import CustomerForm from './components/CustomerForm.tsx'
import InventoryForm from './components/InventoryForm.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import NotFound from './pages/NotFound.tsx'
import FounderRoute from './routes/FounderRoute.tsx'
import FounderLayout from './layouts/FounderLayout.tsx'
import FounderDashboard from './pages/FounderDashboard.tsx'
import FounderBob from './pages/FounderBob.tsx'
import FounderSales from './pages/FounderSales.tsx'
import FounderMarketing from './pages/FounderMarketing.tsx'
import FounderCommercial from './pages/FounderCommercial.tsx'
import FounderMediaStudio from './pages/FounderMediaStudio.tsx'
import FounderSystem from './pages/FounderSystem.tsx'
import FounderActions from './pages/FounderActions.tsx'
import FounderConfig from './pages/FounderConfig.tsx'
import FounderLogs from './pages/FounderLogs.tsx'
import FounderDeployments from './pages/FounderDeployments.tsx'
import QuantumHomePanel from './components/quantum/QuantumHomePanel.tsx'
import QuantumForecastingPanel from './components/quantum/QuantumForecastingPanel.tsx'
import QuantumOptimisationPanel from './components/quantum/QuantumOptimisationPanel.tsx'
import QuantumAnomaliesPanel from './components/quantum/QuantumAnomaliesPanel.tsx'
import QuantumSecurityPanel from './components/quantum/QuantumSecurityPanel.tsx'
import BobQuantumPanel from './components/quantum/BobQuantumPanel.tsx'
import NavigationGuard from './stability/NavigationGuard.tsx'
import HydrationStabilizer from './stability/HydrationStabilizer.tsx'
import BobLauncher from './components/BobLauncher.tsx'
import PublicLayout from './public/PublicLayout.tsx'
import OwnerLayout from './layouts/OwnerLayout.tsx'
import OwnerConsole from './pages/OwnerConsole.tsx'
import MerchantAutomation from './pages/MerchantAutomation.tsx'
import Docs from './pages/Docs.tsx'
import Legal from './pages/Legal.tsx'
import LandingPage from './public/LandingPage.tsx'
import AboutPage from './public/AboutPage.tsx'
import PricingPage from './public/PricingPage.tsx'
import ContactPage from './public/ContactPage.tsx'
import SupportPage from './public/SupportPage.tsx'
import ApplyPage from './public/ApplyPage.tsx'
import { ConsoleFallback, MerchantRoute, OwnerRoute, RoleHome } from './routes/RoleGuards.tsx'

export default function App() {
	const loadUser = useAuthStore((state) => state.loadUser)

	useEffect(() => { void loadUser() }, [loadUser])

	return (
		<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<ErrorBoundary>
				<HydrationStabilizer />
				<NavigationGuard />
				<Routes>
					<Route element={<PublicLayout />}>
						<Route path="/" element={<LandingPage />} />
						<Route path="/home" element={<LandingPage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/pricing" element={<PricingPage />} />
						<Route path="/contact" element={<ContactPage />} />
						<Route path="/support" element={<SupportPage />} />
						<Route path="/apply" element={<ApplyPage />} />
					</Route>
					<Route path="/auth/login" element={<Login />} />
					<Route path="/auth/signup" element={<Register />} />
					<Route path="/console" element={<RoleHome />} />
					<Route path="/console/merchant" element={<MerchantRoute />}>
						<Route element={<MainLayout />}>
							<Route index element={<Dashboard />} />
							<Route path="orders" element={<Orders />} />
							<Route path="catalog" element={<Catalog />} />
							<Route path="products" element={<Products />} />
							<Route path="products/add" element={<AddProduct />} />
							<Route path="products/:id/edit" element={<InventoryForm />} />
							<Route path="invoices/add" element={<AddInvoice />} />
							<Route path="categories/add" element={<AddCategory />} />
							<Route path="add-product" element={<AddProduct />} />
							<Route path="inventory" element={<Inventory />} />
							<Route path="inventory/add" element={<InventoryForm />} />
							<Route path="inventory/:id/edit" element={<InventoryForm />} />
							<Route path="customers" element={<Customers />} />
							<Route path="customers/add" element={<CustomerForm />} />
							<Route path="customers/:id/edit" element={<CustomerForm />} />
							<Route path="messages" element={<Messages />} />
							<Route path="automation" element={<MerchantAutomation />} />
							<Route path="docs" element={<Docs />} />
							<Route path="legal" element={<Legal />} />
							<Route path="settings" element={<Settings />} />
							<Route path="*" element={<ConsoleFallback label="Merchant" />} />
						</Route>
					</Route>
					<Route path="/console/owner" element={<OwnerRoute />}>
						<Route element={<OwnerLayout />}>
							<Route index element={<OwnerConsole />} />
							<Route path="onboarding" element={<OwnerConsole />} />
							<Route path="analytics" element={<OwnerConsole />} />
							<Route path="automation" element={<OwnerConsole />} />
							<Route path="settings" element={<OwnerConsole />} />
							<Route path="*" element={<ConsoleFallback label="Owner" />} />
						</Route>
					</Route>
					<Route path="/console/login" element={<Navigate to="/auth/login" replace />} />
					<Route path="/console/register" element={<Navigate to="/auth/signup" replace />} />
					{['orders','catalog','products','inventory','customers','messages','settings'].map((path) => <Route key={path} path={`/console/${path}/*`} element={<Navigate to={`/console/merchant/${path}`} replace />} />)}
					<Route path="/founder" element={<FounderRoute />}>
						<Route element={<FounderLayout />}>
							<Route index element={<FounderDashboard />} />
							<Route path="overview" element={<FounderDashboard />} />
							<Route path="system" element={<FounderSystem />} />
							<Route path="health" element={<FounderDashboard />} />
							<Route path="deployments" element={<FounderDeployments />} />
							<Route path="system/actions" element={<FounderActions />} />
							<Route path="config" element={<FounderConfig />} />
							<Route path="logs" element={<FounderLogs />} />
							<Route path="bob" element={<FounderBob />} />
							<Route path="bob/media" element={<FounderMediaStudio />} />
							<Route path="media" element={<FounderMediaStudio />} />
							<Route path="sales" element={<FounderSales />} />
							<Route path="marketing" element={<FounderMarketing />} />
							<Route path="commercial" element={<FounderCommercial />} />
							<Route path="quantum" element={<QuantumHomePanel />} />
							<Route path="quantum/forecasting" element={<QuantumForecastingPanel />} />
							<Route path="quantum/optimisation" element={<QuantumOptimisationPanel />} />
							<Route path="quantum/anomalies" element={<QuantumAnomaliesPanel />} />
							<Route path="quantum/security" element={<QuantumSecurityPanel />} />
							<Route path="bob/quantum" element={<BobQuantumPanel />} />
							<Route path="*" element={<ConsoleFallback label="Founder" />} />
						</Route>
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
				<BobLauncher />
			</ErrorBoundary>
		</BrowserRouter>
	)
}