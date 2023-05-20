import { Children, FC, ReactNode, ReactElement, isValidElement } from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import "./tabs.scss";

interface TabsProps {
  children?: ReactNode | ReactElement,
  horizontal?: boolean
}

const Tabs: FC<TabsProps> = ({ children, horizontal }) => {
  // REF
  const tabButtonRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);
  // LOCATION
  const location = useLocation();

  // STATE
  const [tabs, setTabs] = useState<ReactNode[]>([]);
  const [currentTab, setCurrentTab] = useState(0);
  // CONST
  const tabsContent: ReactNode[] = [];
  // EFFECT
  // useEffect(() => {}, []);
  useEffect(() => {
    const tabButtons = tabsRef.current?.childNodes;
    // Tab buttons click

    tabButtons?.forEach((button, i) => {
      if (button instanceof HTMLElement) {

        i === currentTab && button.classList.add("activeTab");

        button.onclick = (e: MouseEvent) => {

          const target = e.currentTarget as HTMLElement;


          tabButtons.forEach((b) => (b as HTMLElement).classList.remove("activeTab"));
          button.classList.add("activeTab");
          const tabButton = target.querySelector(".tab-button") as HTMLElement | null;
          if (tabButton) { setCurrentTab(tabButton.tabIndex); }
        };
      }
    });
    setTabs((prev) => [...prev, ...tabsContent]);
  }, [setTabs, currentTab]);

  return (
    <>
      <div className="tabs">
        <div ref={tabsRef} className="tabs-choose_panel">
          {Children.map(children, (child: any, i) => {
            tabsContent.push(child.props.children);
            return (
              <>
                <div className="tab">
                  {isValidElement(child as any) && (child.type as any).name === "Tab" && (
                    <div ref={tabButtonRef} tabIndex={i} className="tab-button">
                      {child.props.title}
                    </div>
                  )}
                </div>
              </>
            );
          })}
        </div>
        <div className="tab-content">
          {tabs.map((content, i) => {
            return (
              <div key={i}>
                {currentTab === i ? (
                  <div key={i} ref={tabContentRef} className="tab-content-body">
                    {content}
                  </div>
                ) : (
                  void 0
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Tabs;
