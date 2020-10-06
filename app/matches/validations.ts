import * as z from "zod"

export const MatchInput = z.object({
  name: z.string(),
  date: z.date(),
  maxPlayersCount: z.number(),
})
export type MatchInputType = z.infer<typeof MatchInput>
