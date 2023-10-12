import useSWR from 'swr';
import { API } from '../lib';
import { Proposal } from '../types';
import { useBoundStore } from '../store';

const fetcher = (url: string) => API.get(url).then((res) => res.data);

export function useProposals() {
  const account = useBoundStore((state) => state.account);
  const { data, error, isLoading, mutate } = useSWR<Proposal[]>(
    `/proposals?address=${account}`,
    fetcher
  );

  const addProposal = async (payload: { description: string; title: string }) =>
    API.post('/proposals', {
      address: account,
      ...payload,
    });

  const voteProposal = async (id: number) =>
    API.patch(`/proposals/${id}/vote`, { address: account });

  return {
    data: data ?? [],
    isLoading,
    error: error?.response?.data?.message,
    mutate,
    addProposal,
    voteProposal,
  };
}
