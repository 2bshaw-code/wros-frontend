export type PackageId = 'starter' | 'growth' | 'pro' | 'founder'

export type PublicPackage = {
  id: PackageId
  name: string
  positioning: string
  features: string[]
  branding: string
  roleOutcome: string
}

export const publicPackages: PublicPackage[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    positioning: 'A focused beginning for one retail workspace.',
    features: ['Basic CRM', 'Basic catalog', 'Basic messaging', 'Limited automation', 'Logo and colour branding'],
    branding: 'Logo and core colours',
    roleOutcome: 'Merchant access after onboarding approval',
  },
  {
    id: 'growth',
    name: 'Growth Pack',
    positioning: 'Full daily operations for an active merchant team.',
    features: ['Full CRM', 'Full catalog', 'Full messaging', 'Advanced automation', 'Brand standards upload', 'Custom colours, logo and links'],
    branding: 'Brand standards, links and custom palette',
    roleOutcome: 'Merchant access with expanded abilities after approval',
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    positioning: 'Advanced visibility and coordinated multi-workspace operations.',
    features: ['Everything in Growth', 'Multi-tenant support', 'Advanced analytics', 'AI-assisted workflows', 'Priority support'],
    branding: 'Advanced brand controls across workspaces',
    roleOutcome: 'Pro merchant abilities after approval',
  },
  {
    id: 'founder',
    name: 'Founder Pack',
    positioning: 'A reviewed strategic package for platform-level collaboration.',
    features: ['Everything in Pro', 'Founder console eligibility', 'BOB advanced tools', 'Full brand customisation', 'Dedicated onboarding'],
    branding: 'Full customisation with dedicated onboarding',
    roleOutcome: 'Founder access requires manual security approval',
  },
]

export const getPublicPackage = (id: string) => publicPackages.find((item) => item.id === id) || publicPackages[0]
