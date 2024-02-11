import { Checkbox, Stack } from '@chakra-ui/react'
import React, { FC, useEffect } from 'react'

interface CreateProjectProps {

}

const CreateProject: FC<CreateProjectProps> = ({ }) => {
      const [checkedItems, setCheckedItems] = React.useState([
            { id: 1, isChecked: false },
            { id: 2, isChecked: false },
            { id: 3, isChecked: false },
      ]);

      useEffect(() => {
            console.debug(checkedItems)
      }, [checkedItems])
      const handleCheckboxChange = (id: number) => {
            setCheckedItems((prevCheckedItems) =>
                  prevCheckedItems.map((item) =>
                        item.id === id ? { ...item, isChecked: !item.isChecked } : item
                  )
            );
      };

      return (
            <>
                  {checkedItems.length > 0 && (
                        <>
                              <Checkbox
                                    isChecked={checkedItems.every((item) => item.isChecked)}
                                    isIndeterminate={
                                          checkedItems.some((item) => item.isChecked) &&
                                          !checkedItems.every((item) => item.isChecked)
                                    }
                                    onChange={(e) => {
                                          const newCheckedState = checkedItems.map((item) => ({
                                                ...item,
                                                isChecked: e.target.checked,
                                          }));
                                          setCheckedItems(newCheckedState);
                                    }}
                              >
                                    Parent Checkbox
                              </Checkbox>
                              <Stack pl={6} mt={1} spacing={1}>
                                    {checkedItems.map((item) => (
                                          <Checkbox
                                                key={item.id}
                                                isChecked={item.isChecked}
                                                onChange={() => handleCheckboxChange(item.id)}
                                          >
                                                Child Checkbox {item.id}
                                          </Checkbox>
                                    ))}
                              </Stack>
                        </>
                  )}
            </>
      );
}

export default CreateProject;