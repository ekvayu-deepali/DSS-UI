"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  InputAdornment,
  FormGroup,
  IconButton,
} from "@mui/material";
import { faEnvelope, faLock, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ValidationHelper } from "@/helpers";
import { EMAIL_ADDRESS, PASSWORD } from "@/constants";
import { TextInputField, Icon, Spacing, SpacingEnum } from "@/components/common";

interface AddApproverModalProps {
  open: boolean;
  onClose: () => void;
  approverData: {
    email: string;
    password: string;
  };
  onInputChange: (e: any) => void;
  onAddApprover: () => void;
}

const AddApproverModal: React.FC<AddApproverModalProps> = ({
  open,
  onClose,
  approverData,
  onInputChange,
  onAddApprover,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Add New Approver
        <IconButton 
          edge="end" 
          color="inherit" 
          onClick={onClose} 
          aria-label="close"
        >
          <Icon
            icon={faTimes}
            title="Close"
            color="inherit"
            size="small"
            onlyIcon
          />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <FormGroup>
            <TextInputField
              type="email"
              fullWidth
              placeholder={EMAIL_ADDRESS}
              label={EMAIL_ADDRESS}
              onChange={onInputChange}
              value={approverData.email}
              name="email"
              validation={ValidationHelper.emailValidator}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon
                      icon={faEnvelope}
                      title="Email"
                      color="inherit"
                      size="small"
                      onlyIcon
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormGroup>
          <Spacing spacing={2} variant={SpacingEnum.TOP} />
          <FormGroup>
            <TextInputField
              type="password"
              fullWidth
              placeholder={PASSWORD}
              label={PASSWORD}
              onChange={onInputChange}
              name="password"
              value={approverData.password}
              validation={ValidationHelper.validateNotEmpty}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon
                      icon={faLock}
                      title="Password"
                      color="inherit"
                      size="small"
                      onlyIcon
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormGroup>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={onAddApprover} 
          color="primary" 
          variant="contained"
          disabled={!approverData.email || !approverData.password}
        >
          Add Executor
        </Button>
      </DialogActions>
    </Dialog>
  );
};export default AddApproverModal;

