import { z } from 'zod';

const userValidationSchema = z.object({
    password: z
        .string({
            invalid_type_error: 'Password must be string',
        })
        .max(20, { message: 'Password can not be more than 20 characters' })
        .optional(),
});
// role is removed from here because will set this in the endpoint

export const UserValidation = {
    userValidationSchema,
};