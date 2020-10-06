import db, { PlayerDeleteArgs } from "db"

type DeletePlayerInput = {
  where: PlayerDeleteArgs["where"]
}

export default async function deletePlayer({ where }: DeletePlayerInput, _ctx = {}) {
  const player = await db.player.delete({ where })

  return player
}
