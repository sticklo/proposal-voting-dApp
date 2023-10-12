import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { useProposals } from '../hooks';
import { useToast } from './hooks';
import { AxiosError } from 'axios';

const DisplayProposals = () => {
  const toast = useToast();
  const { data: proposals, error, mutate, voteProposal } = useProposals();
  console.log(error);

  const handleVoteProposal = async (id: number) => {
    try {
      await voteProposal(id);
      toast({
        status: 'success',
        title: 'Vote successfully placed',
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
      await mutate();
    }
  };

  return error ? (
    <Flex minH="40vh" alignItems="center" justifyContent="center">
      <Text>{error}</Text>
    </Flex>
  ) : (
    <Stack gap={4}>
      {proposals.map((p) => (
        <Card key={p.id}>
          <CardHeader>
            <Heading size="md">{p.title}</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Description
                </Heading>
                <Text pt="2" fontSize="sm">
                  {p.description}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Vote count
                </Heading>
                <Text pt="2" fontSize="sm">
                  {p.voteCount}
                </Text>
              </Box>
            </Stack>
          </CardBody>
          {/* <Divider /> */}
          <CardFooter>
            <Button
              disabled={!p.canVote}
              variant="solid"
              onClick={() => handleVoteProposal(p.id)}
            >
              Vote
            </Button>
          </CardFooter>
        </Card>
      ))}
    </Stack>
  );
};

export default DisplayProposals;
