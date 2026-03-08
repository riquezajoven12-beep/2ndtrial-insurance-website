import { z } from 'zod';

export const leadSchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  phone: z.string().min(8, 'Valid phone number required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  age: z.number().min(18).max(100).optional(),
  family_size: z.string().optional(),
  monthly_budget: z.number().min(0).optional(),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
  preferred_contact_time: z.string().optional(),
});

export const enquirySchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  phone: z.string().min(8, 'Valid phone number required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  product_interests: z.array(z.object({ id: z.string(), name: z.string() })).min(1),
  message: z.string().optional(),
});

export const clientSchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  phone: z.string().min(8, 'Valid phone number required'),
  email: z.string().email().optional().or(z.literal('')),
  plans: z.string().optional(),
  monthly_premium: z.number().min(0).optional(),
  notes: z.string().optional(),
  assigned_agent: z.string().uuid().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type EnquiryInput = z.infer<typeof enquirySchema>;
export type ClientInput = z.infer<typeof clientSchema>;
