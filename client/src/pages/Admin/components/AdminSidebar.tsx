import React, { FC } from 'react'
import { Accordion, AccordionSection } from '../../../components/ui/Accordion/Accordion';
import { NavLink } from 'react-router-dom';

interface AdminSidebarProps {

}

const AdminSidebar: FC<AdminSidebarProps> = ({ }) => {
      return (
            <div className='admin-sidebar'>
                  <h2 className='title'>Dashboard</h2>
                  <Accordion>
                        <AccordionSection title="Модерация">

                              <NavLink to={"/admin/moder/orders"}>Заказы</NavLink>
                        </AccordionSection>
                        <AccordionSection title="Задачи">
                              Содержимое раздела 2
                        </AccordionSection>
                        <AccordionSection title="Вакансии">
                              Содержимое раздела 3
                        </AccordionSection>
                  </Accordion>

            </div>
      )
}

export default AdminSidebar;