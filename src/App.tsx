import { useEffect, useRef, useState } from "react"
import { IJobListing } from "./types/JobListingType"
import { getJobs, saveJobs } from "./storage/Storage"
import { v4 as uuidv4 } from "uuid"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import "./App.css"
import { Card } from "react-bootstrap"
import EmptyMessage from "./utils/EmptyMessage"

function App() {
  const [showAddJob, setShowAddJob] = useState(false)
  const [showEditJob, setShowEditJob] = useState(false)
  const [jobs, setJobs] = useState<IJobListing[]>([])
  const formref = useRef(null)
  const [validated, setValidated] = useState(false)
  const [edit, setEdit] = useState({
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
          </Button>
        </nav>

        {showAddJob && (
          <Modal show={showAddJob} onHide={() => setShowAddJob(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add a job listing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <Form onSubmit={handleSubmit} noValidate ref={formref} validated={validated}>
                  <Form.Group className="form-group" controlId="position">
                    <Form.Label>Job Position *</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="e.g: Front-end Engineer..."
                      required
                      name="position"
                    />
                  </Form.Group>

                  <Form.Group className="form-group" controlId="company">
                    <Form.Label>Company *</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="e.g: Facebook..."
                      required
                      name="company"
                    />
                  </Form.Group>

                  <Form.Group className="form-group" controlId="location">
                    <Form.Label>Location *</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="e.g: Canada..."
                      required
                      name="location"
                    />
                  </Form.Group>

                  <Form.Group className="form-group" controlId="remote">
                    <Form.Label>Remote</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      size="sm"
                      required
                      name="remote"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Hybrid">Hybrid</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="form-group" controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      size="sm"
                      required
                      name="status"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Accepted">Accepted</option>
                    </Form.Select>
                  </Form.Group>
                  <div className="form-footer">
                    <Button variant="secondary" onClick={() => setShowAddJob(false)}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </Modal.Body>
          </Modal>
        )}

        {showEditJob && (
          <Modal show={showEditJob} onHide={() => setShowEditJob(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit a job listing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <Form onSubmit={handleEditSubmit} noValidate ref={formref} validated={validated}>
                  <Form.Group className="form-group" controlId="position">
                    <Form.Label>Job Position *</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="e.g: Front-end Engineer..."
                      required
                      name="position"
                      value={edit.position}
                      onChange={(e) =>
                        setEdit((prevState) => {
                          return {
                            ...prevState,
                            position: e.target.value,
                          }
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="form-group" controlId="company">
                    <Form.Label>Company *</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="e.g: Facebook..."
                      required
                      name="company"
                      value={edit.company}
                      onChange={(e) =>
                        setEdit((prevState) => {
                          return {
                            ...prevState,
                            company: e.target.value,
                          }
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="form-group" controlId="location">
                    <Form.Label>Location *</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="e.g: Canada..."
                      required
                      name="location"
                      value={edit.location}
                      onChange={(e) =>
                        setEdit((prevState) => {
                          return {
                            ...prevState,
                            location: e.target.value,
                          }
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="form-group" controlId="remote">
                    <Form.Label>Remote</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      size="sm"
                      required
                      name="remote"
                      value={edit.remote}
                      onChange={(e) =>
                        setEdit((prevState) => {
                          return {
                            ...prevState,
                            remote: e.target.value,
                          }
                        })
                      }
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Hybrid">Hybrid</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="form-group" controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      size="sm"
                      required
                      name="status"
                      value={edit.status}
                      onChange={(e) =>
                        setEdit((prevState) => {
                          return {
                            ...prevState,
                            status: e.target.value,
                          }
                        })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Accepted">Accepted</option>
                    </Form.Select>
                  </Form.Group>
                  <div className="form-footer">
                    <Button variant="secondary" onClick={() => setShowEditJob(false)}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </Modal.Body>
          </Modal>
        )}

        <main className={`${jobs.length > 0 ? "main-wrapper" : "message-wrapper"}`}>
          {jobs.length > 0 ? (
            <div className="card-wrapper">
              {jobs.map(({ id, position, company, location, remote, status }) => (
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{position}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{company}</Card.Subtitle>
                    <Card.Text>
                      {location} {remote} {status}
                    </Card.Text>

                    <Button className="btn-primary" onClick={() => handleEditJob(id)}>
                      Edit
                    </Button>
                    <Button className="btn-primary" onClick={() => handleDeleteJob(id)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyMessage />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
