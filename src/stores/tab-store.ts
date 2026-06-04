import { create } from 'zustand';

export type TabId = 'home' | 'about' | 'services' | 'projects' | 'automation' | 'contact' | 'consultation';

const tabLabels: Record<TabId, string> = {
  home: 'Home',
  about: 'About',
  services: 'Services',
  projects: 'Projects',
  automation: 'Automation & AI',
  contact: 'Contact',
  consultation: 'Consultation',
};

const validTabs = Object.keys(tabLabels) as TabId[];

function parseHashTab(hash: string): TabId {
  const candidate = hash.replace('#', '') as TabId;
  return validTabs.includes(candidate) ? candidate : 'home';
}

interface TabStore {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  activeTab: 'home',
  setActiveTab: (tab) => {
    set({ activeTab: tab });
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `#${tab}`);
      document.title = `${tabLabels[tab]} | Charlessolarwater Projects`;
    }
  },
}));

export { tabLabels };

/** Call once on client mount to restore tab from URL hash */
export function initTabFromUrl() {
  if (typeof window === 'undefined') return;
  const tab = parseHashTab(window.location.hash);
  useTabStore.getState().setActiveTab(tab);

  window.addEventListener('popstate', () => {
    const t = parseHashTab(window.location.hash);
    useTabStore.getState().setActiveTab(t);
  });
}
