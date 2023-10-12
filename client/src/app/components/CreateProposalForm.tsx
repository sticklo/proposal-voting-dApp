import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useBoolean,
} from '@chakra-ui/react';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useToast } from './hooks';
import { AxiosError } from 'axios';
import { useProposals } from '../hooks';

const CreateProposalForm = () => {
  const toast = useToast();
  const { addProposal, mutate } = useProposals();
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useBoolean();

  const handleFieldChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setFormData((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
  };

  const handleSubmitProposal: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    (async () => {
      setIsSubmitting.on();
      try {
        await addProposal(formData);
        setFormData({ title: '', description: '' });
        toast({
          status: 'success',
          title: 'Proposal created',
        });
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast({
            status: 'error',
            title: err?.response?.data?.message || 'Something went wrong',
          });
        } else {
          toast({
            status: 'error',
            title: 'Something went wrong',
          });
        }
      } finally {
        setIsSubmitting.off();
        mutate();
      }
    })();
  };

  return (
    <form onSubmit={handleSubmitProposal}>
      <Stack>
        <FormControl isRequired>
          <FormLabel>Proposal title</FormLabel>
          <Input
            maxLength={30}
            name="title"
            onChange={handleFieldChange}
            placeholder="Title"
            value={formData.title}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Proposal description</FormLabel>
          <Input
            maxLength={70}
            name="description"
            onChange={handleFieldChange}
            placeholder="Description"
            value={formData.description}
          />
        </FormControl>
        <Button disabled={isSubmitting} type="submit">
          Add Proposal
        </Button>
      </Stack>
    </form>
  );
};

export default CreateProposalForm;
