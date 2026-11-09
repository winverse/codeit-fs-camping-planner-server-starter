import { z } from 'zod';
import {
  MAX_MEMO_LENGTH,
  MAX_PEOPLE,
  MAX_RATING,
  MIN_PEOPLE,
  MIN_RATING,
  TRIP_STATUS_TRANSITIONS,
  TRIP_STATUSES,
} from '#constants';

export const createTripSchema = z
  .object({
    campsiteId: z.number().int().min(1),
    people: z.number().int().min(MIN_PEOPLE).max(MAX_PEOPLE),
    memo: z.string().max(MAX_MEMO_LENGTH).optional(),
  })
  .strict();

export const tripListQuerySchema = z.object({
  status: z.enum(TRIP_STATUSES).optional(),
});

export const updateTripSchema = z
  .object({
    people: z.number().int().min(MIN_PEOPLE).max(MAX_PEOPLE).optional(),
    memo: z.string().max(MAX_MEMO_LENGTH).optional(),
    status: z.enum(TRIP_STATUSES).optional(),
    rating: z.number().int().min(MIN_RATING).max(MAX_RATING).optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, {
    message: '변경할 값을 하나 이상 보내야 합니다.',
  });

export function toTripResponse(trip) {
  if (trip.campsite === null) {
    throw new Error(`캠핑 계획 ${trip.id}의 캠핑장이 없습니다.`);
  }

  return {
    id: trip.id,
    campsite: {
      id: trip.campsite.id,
      name: trip.campsite.name,
      imageUrl: trip.campsite.imageUrl,
    },
    people: trip.people,
    status: trip.status,
    rating: trip.rating,
    memo: trip.memo,
    allowedNextStatuses: [...TRIP_STATUS_TRANSITIONS[trip.status]],
  };
}
