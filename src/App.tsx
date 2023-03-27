import { useState } from "react"
import { IJobListing } from "./types/JobListingType"
import Button from "react-bootstrap/Button"
import JobForm from "./components/JobForm/JobForm"

function App() {
  const [jobs, setJobs] = useState<IJobListing[]>([])
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add a job
      </Button>
      <JobForm show={show} handleClose={handleClose} setJobs={setJobs} jobs={jobs} />
    </>
  )
}

export default App
