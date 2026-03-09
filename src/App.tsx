import { useEffect } from 'react';
import { Group, Panel, Separator, usePanelRef } from 'react-resizable-panels';
import type { PanelSize } from 'react-resizable-panels';
import './App.css';
import { TopBar } from './components/TopBar';
import { MindMapCanvas } from './features/canvas/MindMapCanvas';
import { useAppStore } from './stores/app-store';

function ChevronIcon({ flipped }: { flipped: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${flipped ? 'rotate-180' : ''}`}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function App() {
  const { isSidebarCollapsed, toggleSidebar } = useAppStore();
  const panelRef = usePanelRef();

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }
    if (isSidebarCollapsed && !panel.isCollapsed()) {
      panel.collapse();
    } else if (!isSidebarCollapsed && panel.isCollapsed()) {
      panel.expand();
    }
  }, [isSidebarCollapsed, panelRef]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
        e.preventDefault();
        toggleSidebar();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  function handleSidebarResize(size: PanelSize) {
    const collapsed = size.asPercentage === 0;
    if (collapsed !== isSidebarCollapsed) {
      useAppStore.setState({ isSidebarCollapsed: collapsed });
    }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <TopBar projectName="Untitled Project" />

      <div className="relative flex flex-1 overflow-hidden">
        <Group orientation="horizontal" className="flex-1">
          <Panel
            panelRef={panelRef}
            defaultSize="320px"
            minSize="280px"
            maxSize="480px"
            collapsible
            collapsedSize={0}
            onResize={handleSidebarResize}
            groupResizeBehavior="preserve-pixel-size"
            className="flex flex-col overflow-hidden"
          >
            <div className="flex h-full flex-col overflow-hidden border-r border-gray-200 bg-gray-50">
              <div className="flex flex-1 items-center justify-center p-4">
                <p className="text-sm text-gray-400">Chat will go here</p>
              </div>
            </div>
          </Panel>

          <Separator className="group relative w-1 cursor-col-resize bg-gray-200 transition-colors hover:bg-blue-400 data-active:bg-blue-500">
            <button
              type="button"
              onClick={toggleSidebar}
              className="absolute top-1/2 left-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 opacity-0 shadow-sm transition-all hover:border-blue-400 hover:text-blue-500 group-hover:opacity-100"
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar (⌘\\)'}
            >
              <ChevronIcon flipped={isSidebarCollapsed} />
            </button>
          </Separator>

          <Panel className="flex flex-col overflow-hidden">
            <MindMapCanvas />
          </Panel>
        </Group>

        {isSidebarCollapsed && (
          <button
            type="button"
            onClick={toggleSidebar}
            className="absolute top-1/2 left-0 z-10 flex h-8 w-5 -translate-y-1/2 items-center justify-center rounded-r-md border border-l-0 border-gray-200 bg-white text-gray-500 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:text-gray-700"
            aria-label="Expand sidebar"
            title="Expand sidebar (⌘\\)"
          >
            <ChevronIcon flipped={true} />
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
