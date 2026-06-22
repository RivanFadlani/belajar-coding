import { useImmer } from "use-immer"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"

export default function Task() {
  const [influencers, setInfluencers] = useImmer([])

  function handleSubmit(name) {
    setInfluencers(draft => {
      draft.push(name)
    })
  }

  return (
    <div>
      <TaskForm onSubmit={handleSubmit} />
      <TaskList influencers={influencers} />
    </div>
  )
}
