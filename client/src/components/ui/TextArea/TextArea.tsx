import React, { FC, useEffect, useState } from 'react'
import './textArea.scss'
interface TextAreaProps {
      resizable: boolean;
      setValue: (value: string) => void;
      placeholder?: string;
      maxLength: number;
      rows?: number;
}

const TextArea: FC<TextAreaProps> = ({ resizable, setValue, placeholder, maxLength, rows }) => {
      // const [selectedValue, setSelectedValue] = useState<string | null>(null);

      const handleChange = (value: string) => {
            setValue(value);
      }
      return (
            <textarea className='j-textarea'
                  placeholder={placeholder}
                  maxLength={maxLength}
                  rows={rows}
                  onChange={(event) => handleChange(event.target.value)} style={resizable ? {} : { resize: 'none' }} defaultValue=""></textarea>

      )
}

export default TextArea;