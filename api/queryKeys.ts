const recordKeys = {
  all: ['records'] as const,
  lists: () => [...recordKeys.all, 'list'] as const,
  list: (filters: string) => [...recordKeys.lists(), { filters }] as const,
  details: () => [...recordKeys.all, 'detail'] as const,
  detail: (id: number) => [...recordKeys.details(), id] as const,
};
