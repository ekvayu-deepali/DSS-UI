import React, { memo } from 'react';
import _ from 'lodash';
import {
  Tooltip,
  Theme,
  useTheme,
  ChipPropsSizeOverrides,
} from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

import { CHIP_COLOR } from '@/constants';

import { CustomChip } from './chipComponent.style';

export interface IProps {
  value?: string;
  title?: string;
  label?: string;
  variant?: string;
  color?: string;
  size?:
    | OverridableStringUnion<'small' | 'medium', ChipPropsSizeOverrides>
    | undefined;
}

/**
 * common chip component
 * @component
 * @param {IProps} props
 * @return {ReactElement}
 */
export const ChipComponent = (props: IProps) => {
  const { title, variant, label, value = '', color, size } = props;
  const theme: Theme = useTheme();

  const labelValue = label || value.toLowerCase();
  const getColor = _.get(CHIP_COLOR, value.toUpperCase());
  const colorvalue = color || getColor;
  const themeVariant =
    variant || theme.palette.mode === 'dark' ? 'outlined' : 'filled';

  return (
    <Tooltip disableHoverListener={!title} arrow title={title || ''}>
      <CustomChip
        size={size || 'medium'}
        label={labelValue}
        variant={themeVariant}
        color={colorvalue || 'default'}
      />
    </Tooltip>
  );
};

export default memo(ChipComponent);
