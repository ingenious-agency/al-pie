import db, { PlayerCreateArgs } from "db"

type CreatePlayerInput = {
  data: PlayerCreateArgs["data"]
}
export default async function createPlayer({ data }: CreatePlayerInput, _ctx = {}) {
  const player = await db.player.create({ data })

  return player
}
