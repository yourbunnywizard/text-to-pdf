import { IconProps } from '@/components/icons/Icon.types';
import { memo } from 'react';

const DownloadIcon = memo(
  ({ size = 24, color = '#191C36', ...props }: IconProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 256 256"
        {...props}
      >
        <path d="M228,144v64a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V144a12,12,0,0,1,24,0v52H204V144a12,12,0,0,1,24,0Zm-108.49,8.49a12,12,0,0,0,17,0l40-40a12,12,0,0,0-17-17L140,115V32a12,12,0,0,0-24,0v83L96.49,95.51a12,12,0,0,0-17,17Z"></path>
      </svg>
    );
  }
);

export default DownloadIcon;
