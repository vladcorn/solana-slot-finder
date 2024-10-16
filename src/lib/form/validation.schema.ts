import {z} from 'zod';

export const timestampSchema = z.object({
    year: z.number().int().min(2020),
    month: z.number().int().min(1).max(12),
    day: z.number().int().min(1).max(31),
    hour: z.number().int().min(0).max(23),
    minute: z.number().int().min(0).max(59),
    second: z.number().int().min(0).max(59),
});

export type TimestampSchema = z.infer<typeof timestampSchema>;
