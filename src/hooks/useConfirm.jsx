// import PropTypes from "prop-types";
import { useState } from 'react';
import createPromise from '../helpers/createPromise';
import { useDisclosure } from '@mantine/hooks';
import { Button, Divider, Group, Modal } from '@mantine/core';

export const useConfirm = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [resolver, setResolver] = useState({ resolver: null });

  const getConfirmation = () => {
    open();
    const [promise, resolve] = createPromise();
    setResolver({ resolve });
    return promise;
  };

  const onClose = async (status) => {
    close();
    resolver.resolve(status);
  };

  const ConfirmModal = ({
    message,
    title,
    confirmText,
    cancelText,
    confirmColor,
    cancelColor,
    size,
  }) => {
    return (
      <Modal
        opened={opened}
        onClose={() => onClose(false)}
        size={size}
        centered
        title={title}
      >
        <Divider mb={8} />
        {message}
        <Group justify="space-between" my={8} pt={16}>
          <Button
            color={confirmColor}
            onClick={() => onClose(true)}
            data-autofocus
          >
            {confirmText}
          </Button>
          <Button
            color={cancelColor}
            variant="outline"
            onClick={() => onClose(false)}
          >
            {cancelText}
          </Button>
        </Group>
      </Modal>
    );
  };

  return [getConfirmation, ConfirmModal];
};
