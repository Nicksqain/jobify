import { Children, FC, ReactElement, ReactNode } from "react";
interface TabProps {
  children: ReactNode | ReactElement,
  title: string
}
const Tab: FC<TabProps> = ({ children }) => {
  return (
    <>
      {Children.map(children, (child: any, i) => {
        console.log(child);
        return <>{child.props.title}</>;
      })}
      ;
    </>
  );
};

export default Tab;
