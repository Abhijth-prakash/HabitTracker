import z from "zod";

const Schema = z.object({
    habit:z.string().min(1, "habit is required")
})



export default Schema