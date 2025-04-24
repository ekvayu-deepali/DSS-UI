'use client';

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { 
  InputLabel, 
  Select, 
  SelectChangeEvent, 
  FormHelperText,
  Typography
} from '@mui/material';

import { ClassificationOptions } from '@/enum/classification.enum';
import { THIS_FILED_IS_REQUIRED } from '@/constants';
import { TextInputField } from '@/components/common';
import { ValidationHelper } from '@/helpers';
import { ITextInputFieldData } from '@/components/common/textInputField';

import { 
  IClassificationDropdownProps, 
  IClassificationDropdownRef 
} from './classification-dropdown.interface';
import { 
  StyledFormControl, 
  StyledMenuItem,
  CustomInputContainer
} from './classification-dropdown.style';

export const ClassificationDropdown = forwardRef<IClassificationDropdownRef, IClassificationDropdownProps>(
  ({ value, onChange, fullWidth = false, required = false }, ref) => {
    const [error, setError] = useState<string>('');
    const [otherValue, setOtherValue] = useState<string>('');
    const [selectedValue, setSelectedValue] = useState<string>(value || '');

    const handleChange = (event: SelectChangeEvent) => {
      const newValue = event.target.value;
      setSelectedValue(newValue);
      onChange(newValue === 'other' ? otherValue : newValue);
      setError('');
    };

    const handleOtherChange = (data: ITextInputFieldData) => {
      if (!data.event) return;
      const newOtherValue = data.event.target.value;
      setOtherValue(newOtherValue);
      onChange(newOtherValue);
    };

    const validateValue = (): boolean => {
      if (required) {
        if (!selectedValue) {
          setError(THIS_FILED_IS_REQUIRED);
          return false;
        }
        if (selectedValue === 'other' && !otherValue.trim()) {
          setError('Please specify the classification');
          return false;
        }
      }
      setError('');
      return true;
    };

    useImperativeHandle(ref, () => ({
      validateValue
    }));

    return (
      <>
        <StyledFormControl fullWidth={fullWidth} error={!!error}>
          <InputLabel id="classification-select-label">
            {required ? 'Classification *' : 'Classification'}
          </InputLabel>
          <Select
            labelId="classification-select-label"
            id="classification-select"
            value={selectedValue}
            label={required ? 'Classification *' : 'Classification'}
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300
                }
              }
            }}
          >
            {Object.values(ClassificationOptions).map((option) => (
              <StyledMenuItem
                key={option.value}
                value={option.value}
                color={option.color}
              >
                <Typography variant="body2">
                  {option.label}
                </Typography>
              </StyledMenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error}</FormHelperText>}
        </StyledFormControl>
        
        {selectedValue === 'other' && (
          <CustomInputContainer>
            <TextInputField
              fullWidth
              label="Specify Classification"
              value={otherValue}
              onChange={handleOtherChange}
              validation={ValidationHelper.validateNotEmpty}
              placeholder="Enter custom classification"
            />
          </CustomInputContainer>
        )}
      </>
    );
  });

ClassificationDropdown.displayName = 'ClassificationDropdown';

export default ClassificationDropdown;





