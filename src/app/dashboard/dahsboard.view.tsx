import { useEffect } from "react"

const DashboardPage = () => {
  useEffect(() => {
    console.log("first")
  }, [])
  return (
    <div>DashboardPage</div>
  )
}

export { DashboardPage }