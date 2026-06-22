export default function TaskList({ influencers = [] }) {
  return (
    <div>
      <h2>List</h2>
      <ul>
        {influencers.map((influencer, index) => (
          <li key={index}>{influencer}</li>
        ))}
      </ul>
    </div>
  )
}
