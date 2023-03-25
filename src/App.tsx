import { useState } from "react"
import Button from "react-bootstrap/Button"
import JobForm from "./components/JobForm/JobForm"
import { IJobListing } from "./types/JobListingType"

function App() {
  const [jobs, setJobs] = useState<IJobListing | null>(null)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add a job
      </Button>
      <JobForm show={show} handleClose={handleClose} />
    </>
  )
}

export default App
