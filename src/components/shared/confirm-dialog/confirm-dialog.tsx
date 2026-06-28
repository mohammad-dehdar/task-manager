'use client';

import { Button, Modal } from '@/components/ui';

import type { ConfirmDialogProps } from './types';

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isLoading = false,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmColor = 'error',
}: ConfirmDialogProps) {
  return (
    <Modal open={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-sm text-neutral-600">{description}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="outline"
          color="gray"
          onClick={onClose}
          isDisabled={isLoading}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="fill"
          color={confirmColor}
          onClick={onConfirm}
          isLoading={isLoading}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
