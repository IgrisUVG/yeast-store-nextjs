"use client";

import { ReactNode, useState } from "react";

interface Tab {
  defaultActive?: boolean,
  label: ReactNode | string,
  content: ReactNode | string,
  id: string,
}

interface TabsPanelProps {
  tabs: Tab[],
}

export default function TabsPanel({ tabs }: TabsPanelProps) {
  const firstActiveTab = tabs.findIndex((t) => t.defaultActive === true);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(
    firstActiveTab === -1 ? 0 : firstActiveTab
  );

  return <>
    <div className="account-tabs">{tabs.map((t, i) => <button
      key={`${t.id}-button`}
      className={`account-tab ${i === activeTabIndex ? `active` : ``}`}
      onClick={() => setActiveTabIndex(i)}
    >{t.label}</button>)}</div>

    <div className="tab-content">{tabs.map((t, i) => <div
      className={`tab-pane ${i === activeTabIndex ? `active` : ``}`}
      key={`${t.id}-tab`}
    >{t.content}</div>)}</div>
  </>;
}
