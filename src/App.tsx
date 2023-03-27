import { useEffect, useState } from "react"
import { IJobListing } from "./types/JobListingType"
import Button from "react-bootstrap/Button"
import { getJobs } from "./storage/Storage"
import JobTable from "./components/Table/JobTable"
import EditJob from "./components/EditJob.tsx/EditJob"
import AddJob from "./components/AddJob/AddJob"

function App() {
  const [toggleAddPanel, setToggleAddPanel] = useState(false)
  const [toggleEditPanel, setToggleEditPanel] = useState(false)
  const [jobs, setJobs] = useState<IJobListing[]>([])
  const [form, setForm] = useState({
    id: "",
    position: "",
    company: "",
    location: "",
    remote: "Yes",
    status: "Pending",
  })

  //Set the new list of letters to local storage whenever a user memorizes a letter
  useEffect(() => {
    const alphabets = getJobs()
    setJobs(alphabets)
  }, [getJobs])

  const handleAddJob = () => {
    setForm({
      id: "",
      position: "",
      company: "",
      location: "",
      remote: "Yes",
      status: "Pending",
    })
    setToggleAddPanel(true)
  }

  return (
    <>
      <Button variant="primary" onClick={handleAddJob}>
        Add a job
      </Button>
      <AddJob
        setJobs={setJobs}
        jobs={jobs}
        form={form}
        setForm={setForm}
        toggleAddPanel={toggleAddPanel}
        setToggleAddPanel={setToggleAddPanel}
      />

      <JobTable
        jobs={jobs}
        setJobs={setJobs}
        toggleEditPanel={toggleEditPanel}
        setToggleEditPanel={setToggleEditPanel}
        form={form}
        setForm={setForm}
      ></JobTable>

      {toggleEditPanel && (
        <EditJob
          jobs={jobs}
          setJobs={setJobs}
          toggleEditPanel={toggleEditPanel}
          setToggleEditPanel={setToggleEditPanel}
          form={form}
          setForm={setForm}
        ></EditJob>
      )}
    </>
  )
}

export default App
