import { useEffect, useRef, useState } from "react"
import { IJobListing } from "./types/JobListingType"
import { getJobs, saveJobs } from "./storage/Storage"
import { EditListingType } from "./types/EditListingType"
import { v4 as uuidv4 } from "uuid"

import Button from "react-bootstrap/Button"
import EmptyMessage from "./utils/EmptyMessage"
import AddJobForm from "./components/AddJob/AddJobForm"
import EditJobForm from "./components/EditJob/EditJobForm"
import JobCard from "./components/JobCard/JobCard"

import "./App.css"

function App() {
  const [showAddJob, setShowAddJob] = useState(false)
  const [showEditJob, setShowEditJob] = useState(false)
  const [validated, setValidated] = useState(false)
  const formref = useRef(null)
  const [jobs, setJobs] = useState<IJobListing[]>([])
  const [edit, setEdit] = useState<EditListingType>({
    id: "",
    position: "",
    company: "",
    location: "",
    remote: "Yes",
    status: "Pending",
  })

  //Set the new list of letters to local storage whenever a user memorizes a letter
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const joblist = await getJobs()
        joblist == null ? setJobs([]) : setJobs(joblist)
      } catch (err) {
        console.log(err)
      }
    }
    fetchJobs()
  }, [])

  const handleAddJob = (item: any) => {
    const id = uuidv4()
    const newItem = { id, ...item }

    setJobs([...jobs, newItem])
    saveJobs([...jobs, newItem])
  }

  const handleEditJob = (id: string) => {
    setShowEditJob(true)
    const jobToBeEdited = jobs.filter((item) => item.id === id)

    // Set the form data to be the same as the job listing user wants to edit
    setEdit({
      id: id,
      position: jobToBeEdited[0].position,
      company: jobToBeEdited[0].company,
      location: jobToBeEdited[0].location,
      remote: jobToBeEdited[0].remote,
      status: jobToBeEdited[0].status,
    })
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //Form data information returned as an object
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    //Get the ID of the current item since FormData doesn't provide the ID
    const id = edit.id
    const dataWithID = [{ ...data, id }]

    //Check if any field is empty
    const values = Object.values(edit)
    const isEmpty = values.includes("")
    if (isEmpty) {
      setValidated(true)
    } else {
      //Replace the item inside the jobs array that matches the one being edited
      const index = jobs.findIndex((item) => item.id === dataWithID[0].id)
      jobs[index] = dataWithID[0] as any
      setValidated(false)
      saveJobs([...jobs])
      setShowEditJob(false)
    }
  }

  const handleDeleteJob = (id: string) => {
    const removeJob = jobs.filter((item) => item.id !== id)
    setJobs(removeJob)
    saveJobs(removeJob)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const jobForm = e.currentTarget
    if (jobForm.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    //Check if any field is empty
    const values = [...formData.values()]
    const isEmpty = values.includes("")
    if (isEmpty) {
      setValidated(true)
    } else {
      setValidated(false)
      handleAddJob(data)
      setShowAddJob(false)
    }
  }

  return (
    <div className="app-container">
      <div className="container app-container">
        <nav className="nav-wrapper">
          <h1 className="nav-logo-text">Trackr</h1>
          <Button
            className="btn-primary btn-add "
            onClick={() => {
              setShowAddJob(!showAddJob)
              setValidated(false)
            }}
          >
            <CreateButtonSVG />
          </Button>
        </nav>

        {showAddJob && (
          <AddJobForm
            showAddJob={showAddJob}
            setShowAddJob={setShowAddJob}
            handleSubmit={handleSubmit}
            formref={formref}
            validated={validated}
          ></AddJobForm>
        )}

        {showEditJob && (
          <EditJobForm
            showEditJob={showEditJob}
            setShowEditJob={setShowEditJob}
            handleEditSubmit={handleEditSubmit}
            formref={formref}
            validated={validated}
            edit={edit}
            setEdit={setEdit}
          ></EditJobForm>
        )}

        <main className={`${jobs.length > 0 ? "main-wrapper" : "message-wrapper"}`}>
          {jobs.length > 0 ? (
            <JobCard
              jobs={jobs}
              handleEditJob={handleEditJob}
              handleDeleteJob={handleDeleteJob}
            ></JobCard>
          ) : (
            <EmptyMessage />
          )}
        </main>
      </div>
    </div>
  )
}

export default App

const CreateButtonSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}
