import { useEffect, useState } from "react"
import { IJobListing } from "./types/JobListingType"
import Button from "react-bootstrap/Button"
import JobForm from "./components/JobForm/JobForm"
import { getJobs } from "./storage/Storage"
import JobTable from "./components/Table/JobTable"

function App() {
  const [jobs, setJobs] = useState<IJobListing[]>([])
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  //Set the new list of letters to local storage whenever a user memorizes a letter
  useEffect(() => {
    const alphabets = getJobs()
    setJobs(alphabets)
  }, [getJobs])
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add a job
      </Button>
      <JobForm show={show} handleClose={handleClose} setJobs={setJobs} jobs={jobs} />

      <JobTable jobs={jobs}></JobTable>
    </>
  )
}

export default App
