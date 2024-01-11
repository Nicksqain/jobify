import React, { FC, useEffect } from 'react'

interface ConfirmProps {
      isOpen: boolean;
      message: string;
      onConfirm: () => void;
      onCancel: () => void;
}

const Confirm: React.FC<ConfirmProps> = ({ isOpen, message, onConfirm, onCancel }) => {
      useEffect(() => {
            console.log('isOpen changed:', isOpen);
      }, [isOpen]);

      return (
            <div style={{ display: isOpen ? 'block' : 'none' }}>

                  <div className='dflex align-items-center flex-row gap-20'>
                        <div>{message}</div>
                        <div className='dflex flex-row gap-10'>
                              <button className='danger-btn' onClick={() => onConfirm()}>Confirm</button>
                              <button className='secondary-btn' onClick={() => onCancel()}>Cancel</button>
                        </div>
                  </div>
            </div>
      );
};

export default React.memo(Confirm);