import React, { Suspense, useState } from "react"
import { Head, useQuery, useParam, BlitzPage } from "blitz"
import getMatch from "app/matches/queries/getMatch"
import LabeledTextField from "app/components/LabeledTextField"
import Form from "app/components/Form"
import { PlayerInput, PlayerInputType } from "app/players/validations"
import createPlayer from "app/players/mutations/createPlayer"
import deletePlayer from "app/players/mutations/deletePlayer"
import useInterval from "@use-it/interval"
import { useIdleTimer } from "react-idle-timer"
import Layout from "app/layouts/Layout"

export const Match = () => {
  const slug = useParam("slug", "string")
  const [match, { refetch }] = useQuery(getMatch, {
    where: { slug },
  })
  const [idle, setIsIdle] = useState(false)
  const setActive = () => setIsIdle(false)
  const setIdle = () => setIsIdle(true)
  useIdleTimer({
    timeout: 10000,
    debounce: 500,
    onIdle: setIdle,
    onActive: setActive,
  })
  useInterval(refetch, idle ? null : 5000)

  const removePlayer = (id: number) => async () => {
    await deletePlayer({ where: { id } })
    refetch()
  }

  return (
    <div
      className={`transition-all bg-white duration-100 ${idle ? "bg-gray-700 bg-opacity-50" : ""}`}
    >
      <h1>Match {match.name || match.slug}</h1>
      {match.players.length > 0 ? (
        <ol>
          {match.players.map((player) => {
            return (
              <li key={player.id}>
                {player.name} <button onClick={removePlayer(player.id)}>-</button>
              </li>
            )
          })}
        </ol>
      ) : (
        "There are no players yet"
      )}
      <Form<PlayerInputType>
        schema={PlayerInput}
        initialValues={{ name: undefined }}
        submitText="Create"
        disabled={match.players.length >= match.maxPlayersCount}
        onSubmit={async ({ name }) => {
          await createPlayer({ data: { name, match: { connect: { slug } } } })
          refetch()
        }}
      >
        <LabeledTextField name="name" label="Your Name" />
      </Form>
    </div>
  )
}

const ShowMatchPage: BlitzPage = () => {
  return (
    <Layout title="⚽️ I'm Playing">
      <Head>
        <title>Match</title>
      </Head>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Match />
        </Suspense>
      </main>
    </Layout>
  )
}

export default ShowMatchPage
