import { Avatar } from '@chakra-ui/react';
import React, { FC, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { uploadProfileAvatar } from '../../../../api/uploadsApi';
import { setAvatar } from '../../../../slices/user.slice';
import { useQueryClient } from '@tanstack/react-query';

interface UploadAvatarProps {
      name: string
      avatar?: string
}

const UploadAvatar: FC<UploadAvatarProps> = (props) => {
      const avatarInputRef = useRef<HTMLInputElement>(null);
      const [timestamp, setTimestamp] = useState<number>(Date.now());

      const user = useAppSelector(state => state.userSlice.user)
      const queryClient = useQueryClient();

      const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files;
            if (files && files.length > 0) {

                  if (user) {
                        const file = files[0];
                        const formData = new FormData();
                        formData.append('avatar', file);
                        await uploadProfileAvatar(user?.id, formData);
                        await queryClient.invalidateQueries({ queryKey: ['userAvatar', user?.id] })
                        setTimestamp(Date.now());
                  }
            }
      };

      const handleClickAvatar = () => {
            if (avatarInputRef.current) {
                  avatarInputRef.current.click();
            }
      };

      return (
            <label>
                  <Avatar
                        mt={-50}
                        key={timestamp}
                        size="2xl"
                        name={props.name}
                        src={`${props.avatar}?timestamp=${timestamp}`}
                        onClick={handleClickAvatar}
                        style={{ cursor: 'pointer' }}
                  />
                  <input
                        id="avatarInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleAvatarChange}
                  />
            </label>
      );
}

export default UploadAvatar;