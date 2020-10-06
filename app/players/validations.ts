import * as z from "zod"

export const PlayerInput = z.object({
  name: z.string(),
})
export type PlayerInputType = z.infer<typeof PlayerInput>
