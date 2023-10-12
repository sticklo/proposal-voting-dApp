import { useToast as ChakraUseToast, UseToastOptions } from '@chakra-ui/react';

export const useToast = (props?: UseToastOptions) => {
  const chakraToast = ChakraUseToast({ ...props });

  const toast = (options?: UseToastOptions) => {
    const id = options?.id ?? options?.title?.toString() ?? '';
    if (!chakraToast.isActive(id)) {
      chakraToast({
        ...options,
        id,
      });
    }
  };

  return toast;
};
