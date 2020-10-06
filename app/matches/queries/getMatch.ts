import { NotFoundError } from "blitz"
import db, { FindOneMatchArgs } from "db"

type GetMatchInput = {
  where: FindOneMatchArgs["where"]
}

export default async function getMatch({ where }: GetMatchInput, _ctx = {}) {
  const match = await db.match.findOne({ where, include: { players: true } })

  if (!match) throw new NotFoundError()

  return match
}
