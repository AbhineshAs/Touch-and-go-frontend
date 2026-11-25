import { Organization, OrganizationMember } from "@/types";
import { MOCK_ORGANIZATIONS } from "@/lib/mocks/data";
import { api } from "./client";
import { mockDelay } from "./delay";

const ORG_STORAGE_KEY = "tag_employer_organizations";

function getStoredOrgs(): Organization[] {
  if (typeof window === "undefined") return MOCK_ORGANIZATIONS;
  try {
    const raw = localStorage.getItem(ORG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch { }
  return [...MOCK_ORGANIZATIONS];
}

function saveStoredOrgs(orgs: Organization[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ORG_STORAGE_KEY, JSON.stringify(orgs));
    window.dispatchEvent(new CustomEvent("tag_organization_updated", { detail: orgs }));
  } catch { }
}

let orgsState: Organization[] = getStoredOrgs();

export async function getOrganization(slugOrId: string = "org_razorwave"): Promise<Organization | null> {
  // 1. Try fetching from Django backend first
  try {
    const remote = await api.get<any>("/auth/organization/");
    if (remote && remote.name) {
      const current = getStoredOrgs();
      const idx = current.findIndex((o) => o.id === slugOrId || o.slug === slugOrId);
      const base = idx !== -1 ? current[idx] : MOCK_ORGANIZATIONS[0];
      const merged: Organization = {
        ...base,
        name: remote.name || base.name,
        logo: remote.logo !== undefined ? remote.logo : base.logo,
        tagline: remote.about ? remote.about.slice(0, 100) : base.tagline,
        about: remote.about || base.about,
        website: remote.website || base.website,
        domain: remote.domain || base.domain,
        companySize: remote.company_size || base.companySize,
        industry: remote.industry || base.industry,
      };
      if (idx !== -1) {
        current[idx] = merged;
      } else {
        current.push(merged);
      }
      orgsState = current;
      saveStoredOrgs(current);
      return merged;
    }
  } catch {
    // If backend offline or unreachable, fall back gracefully to local/mock storage
  }

  await mockDelay(100);
  const current = getStoredOrgs();
  const org = current.find((o) => o.id === slugOrId || o.slug === slugOrId);
  return org ? { ...org } : { ...MOCK_ORGANIZATIONS[0] };
}

export async function updateOrganization(
  id: string,
  updates: Partial<Organization>
): Promise<Organization> {
  const current = getStoredOrgs();
  const index = current.findIndex((o) => o.id === id);
  const targetIndex = index !== -1 ? index : 0;

  const updatedOrg: Organization = {
    ...current[targetIndex],
    ...updates,
  };
  current[targetIndex] = updatedOrg;
  orgsState = current;
  saveStoredOrgs(current);

  // Sync with Django backend if reachable
  try {
    const payload: Record<string, any> = {};
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.logo !== undefined) payload.logo = updates.logo;
    if (updates.about !== undefined) payload.about = updates.about;
    if (updates.website !== undefined) payload.website = updates.website;
    if (updates.industry !== undefined) payload.industry = updates.industry;
    if (updates.companySize !== undefined) payload.company_size = updates.companySize;
    if (Object.keys(payload).length > 0) {
      await api.patch("/auth/organization/", payload);
    }
  } catch {
    // Offline fallback already stored
  }

  return { ...updatedOrg };
}

export async function deleteOrganizationLogo(id: string): Promise<Organization> {
  return updateOrganization(id, { logo: "" });
}

export async function getTeamMembers(organizationId: string = "org_razorwave"): Promise<OrganizationMember[]> {
  await mockDelay(120);
  const current = getStoredOrgs();
  const org = current.find((o) => o.id === organizationId);
  return org ? [...org.members] : [];
}

export async function inviteTeamMember(
  organizationId: string,
  data: { name: string; email: string; role: OrganizationMember["role"] }
): Promise<OrganizationMember> {
  await mockDelay(200);
  const current = getStoredOrgs();
  const org = current.find((o) => o.id === organizationId);
  if (!org) throw new Error("Organization not found");

  const newMember: OrganizationMember = {
    id: `mem_${Date.now()}`,
    userId: `usr_${Date.now()}`,
    name: data.name,
    email: data.email,
    role: data.role,
    status: "Invited",
    joinedAt: new Date().toISOString(),
  };

  org.members = [newMember, ...org.members];
  saveStoredOrgs(current);
  return newMember;
}

export async function removeTeamMember(organizationId: string, memberId: string): Promise<boolean> {
  await mockDelay(150);
  const current = getStoredOrgs();
  const org = current.find((o) => o.id === organizationId);
  if (!org) return false;
  org.members = org.members.filter((m) => m.id !== memberId);
  saveStoredOrgs(current);
  return true;
}
