import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  description: z.string().optional(),
  color: z.string().min(1, 'Color is required'),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();

export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;
