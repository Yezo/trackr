import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import JobForm from "./components/JobForm/JobForm"
import { IJobListing } from "./types/JobListingType"

function App() {
  const [jobs, setJobs] = useState<IJobListing | null>(null)

  return (
    <div className="modal show" style={{ display: "block", position: "initial" }}>
      <JobForm />
    </div>
  )
}

export default App
