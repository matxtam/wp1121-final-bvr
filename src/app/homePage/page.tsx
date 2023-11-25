import { Button } from "@/components/ui/button"
import NewGameBtn from "./_components/NewGameBtn"


export default function HomePage() {
  return (
  <>
    <h3>Players</h3>
    <section>
      <Button></Button>
      {/* map of players */}
    </section>
    <h3>Game History</h3>
    <section className="flex">
      <NewGameBtn/>
      {/* map of history games */}
    </section>
  </>)
}