import React from "react"
import Layout from "app/layouts/Layout"
import { Head, useRouter, BlitzPage } from "blitz"
import createMatch from "app/matches/mutations/createMatch"
import Form from "app/components/Form"
import { MatchInput, MatchInputType } from "app/matches/validations"
import LabeledTextField from "app/components/LabeledTextField"
import LabeledDateField from "app/components/LabeledDateField"
import LabeledNumberField from "app/components/LabeledNumberField"
import faker from "faker"

const NewMatchPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>New Match</title>
      </Head>

      <main>
        <h1>Create New Match</h1>

        <Form<MatchInputType>
          schema={MatchInput}
          initialValues={{
            name: `${faker.commerce.color()}-${(faker.vehicle.model() || "").toLowerCase()}`,
            date: new Date(),
            maxPlayersCount: 10,
          }}
          submitText="Create"
          onSubmit={async ({ name, date, maxPlayersCount }) => {
            try {
              const match = await createMatch({ data: { name, date, maxPlayersCount } })
              alert("Success!" + JSON.stringify(match))
              router.push("/matches/[slug]", `/matches/${match.slug}`)
            } catch (error) {
              alert("Error creating match " + JSON.stringify(error, null, 2))
            }
          }}
        >
          <LabeledTextField name="name" id="Name" label="Name" />
          <LabeledDateField name="date" id="date" label="Date" />
          <LabeledNumberField
            name="maxPlayersCount"
            id="maxPlayersCount"
            label="Amount of Players"
          />
        </Form>
      </main>
    </div>
  )
}

NewMatchPage.getLayout = (page) => <Layout title={"Create New Match"}>{page}</Layout>

export default NewMatchPage
