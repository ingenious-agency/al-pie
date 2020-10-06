import db, { PlayerUpdateArgs } from "db"

type UpdatePlayerInput = {
  where: PlayerUpdateArgs["where"]
  data: PlayerUpdateArgs["data"]
}

export default async function updatePlayer({ where, data }: UpdatePlayerInput, _ctx = {}) {
  const player = await db.player.update({ where, data })

  return player
}
