import { describe, it, expect } from 'vitest';
import { calculateSTV, type STVVote } from './voting';

describe('calculateSTV', () => {
  it('returns correct total, options and winners', () => {
    const votes: STVVote[] = [
      {
        id: '1',
        selection: [
          {
            optionId: 'option-1',
          },
          {
            optionId: 'option-2',
          },
          {
            optionId: 'option-3',
          },
        ],
      },
      {
        id: '2',
        selection: [
          {
            optionId: 'option-3',
          },
          {
            optionId: 'option-1',
          },
          {
            optionId: 'option-2',
          },
        ],
      },
      {
        id: '3',
        selection: [
          {
            optionId: 'option-3',
          },
          {
            optionId: 'option-1',
          },
          {
            optionId: 'option-2',
          },
        ],
      },
      {
        id: '4',
        selection: [
          {
            optionId: 'option-3',
          },
        ],
      },
      {
        id: '5',
        selection: [
          {
            optionId: 'option-2',
          },
          {
            optionId: 'option-1',
          },
        ],
      },
    ];
    const { total, options, winners } = calculateSTV(votes);

    expect(total).toEqual(5);
    expect(options).toEqual({
      'option-1': 4,
      'option-2': 4,
      'option-3': 4,
    });
    expect(winners).toEqual(['option-3', 'option-1', 'option-2']);

    expect(calculateSTV([])).toEqual({ total: 0, options: {}, winners: [] });
  });
});
