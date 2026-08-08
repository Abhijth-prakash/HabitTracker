import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string().min(1, "name is required"),
    email: z.string().email("email is required"),
    password: z.string().min(4, "minimum 4 characters required"),
    confirmPassword: z.string().min(1, "confirm password is required")
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
})

export const LoginSchema = z.object({
    email: z.string().email("email is required"),
    password : z.string().min(4,"minimum 4 characters required")
})