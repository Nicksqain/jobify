import React, { useRef, useEffect } from 'react';
import './prompt.scss';

interface PromptProps {
      isOpen: boolean;
      message: string;
      onConfirm: () => void;
      onCancel: () => void;
      inputValue: string;
      setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const Prompt: React.FC<PromptProps> = ({
      isOpen,
      message,
      onConfirm,
      onCancel,
      inputValue,
      setInputValue,
}) => {
      const promptRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                  if (isOpen && promptRef.current && !promptRef.current.contains(event.target as Node)) {
                        onCancel();
                        setInputValue('');
                  }
            };

            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                  document.removeEventListener('mousedown', handleClickOutside);
            };
      }, [isOpen, onCancel, setInputValue]);

      const handleConfirm = () => {
            onConfirm();
            setInputValue(''); // Сбросить значение после подтверждения
      };

      const handleCancel = () => {
            onCancel();
            setInputValue(''); // Сбросить значение после отмены
      };

      return (
            <div className="j-prompt" style={{ display: isOpen ? '' : 'none' }} >
                  <div className="prompt-content" ref={promptRef}>
                        <div className='dflex align-items-center flex-row gap-10'>
                              <div>{message}</div>
                              <input className='j-input' type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                              <button className='danger-btn' onClick={handleConfirm}>Confirm</button>
                              <button className='secondary-btn' onClick={handleCancel}>Cancel</button>
                        </div>
                  </div>
            </div>
      );
};

export default Prompt;
