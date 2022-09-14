import { Dialog, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import AddEntryForm, { EntryFormValues } from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add entry to patient log</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
