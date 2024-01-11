import React, { ReactNode } from 'react';
import './accordion.scss'

type AccordionProps = {
      children: ReactNode;
};

type AccordionSectionProps = {
      isOpen?: boolean;
      onClick?: () => void;
      title: string;
      children?: ReactNode;
};

function Accordion(props: AccordionProps) {
      const [activeSection, setActiveSection] = React.useState<number | null>(null);

      const toggleSection = (sectionIndex: number) => {
            if (sectionIndex === activeSection) {
                  setActiveSection(null);
            } else {
                  setActiveSection(sectionIndex);
            }
      };

      return (
            <div className="accordion">
                  {React.Children.map(props.children, (child, index) => {
                        if (React.isValidElement(child)) {
                              return React.cloneElement(child, {
                                    // @ts-ignore
                                    isOpen: activeSection === index,
                                    onClick: () => toggleSection(index),
                              });
                        }
                        return null;
                  })}
            </div>
      );
}

function AccordionSection(props: AccordionSectionProps) {
      return (
            <div className="accordion-section">
                  <div className="accordion-header" onClick={props.onClick}>
                        <h3>{props.title}</h3>
                        <div className={`arrow ${props.isOpen ? 'open' : ''}`}>
                              <img className='chevron' src="/Chevron_Down.svg" alt="" />
                        </div>
                  </div>
                  {props.isOpen && (
                        <div className="accordion-content">
                              {props.children}
                        </div>
                  )}
            </div>
      );
}

export { Accordion, AccordionSection };
