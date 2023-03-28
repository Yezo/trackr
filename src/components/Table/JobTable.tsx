import { IJobListing } from "../../types/JobListingType"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import "./JobTable.css"
import { getJobs, saveJobs } from "../../storage/Storage"
import { useEffect } from "react"

type Props = {
  setJobs: React.Dispatch<React.SetStateAction<IJobListing[]>>
  jobs: IJobListing[]
  toggleEditPanel: boolean
  setToggleEditPanel: React.Dispatch<React.SetStateAction<boolean>>
  form: IJobListing
  setForm: React.Dispatch<React.SetStateAction<IJobListing>>
}

export default function JobTable({
  jobs,
  setJobs,
  toggleEditPanel,
  setToggleEditPanel,
  form,
  setForm,
}: Props) {
  const handleEdit = (id: string) => {
    let job = jobs.filter((item) => item.id === id)
    console.log(job[0])
    setForm(job[0])
    setToggleEditPanel(!toggleEditPanel)
  }

  const handleRemove = (id: string) => {
    let job = jobs.filter((item) => item.id === id)
    const index = jobs.findIndex((x) => x.id === id)
    console.log(job[0])
    if (index < 0) {
      return
    }
    jobs.splice(index, 1)
    saveJobs([...jobs])
  }

  // useEffect(() => {
  //   const list = getJobs()
  //   setJobs(list)
  // }, [])

  return (
    <>
      {jobs ? (
        jobs.map(({ id, position, company, location, remote, status }) => (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{position}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{company}</Card.Subtitle>
              <Card.Text>
                {location} {remote} {status}
              </Card.Text>

              <Button className="btn-primary" onClick={() => handleEdit(id)}>
                Edit
              </Button>
              <Button className="btn-primary" onClick={() => handleRemove(id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <EmptyWarningMessage />
      )}
    </>
  )
}

const EmptyWarningMessage = () => {
  return (
    <div className="warning-message">
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
        <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path>
        <path d="M12 13v8"></path>
        <path d="M12 3v3"></path>
      </svg>
      <p>It appears you have no job applications, try adding one.</p>
    </div>
  )
}
