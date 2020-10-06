import db, { MatchCreateArgs } from "db"
import uuid4 from "uuid4"

type CreateMatchInput = {
  data: Omit<MatchCreateArgs["data"], "slug">
}
export default async function createMatch({ data }: CreateMatchInput, _ctx = {}) {
  const match = await db.match.create({ data: { ...data, slug: uuid4() } })

  return match
}
