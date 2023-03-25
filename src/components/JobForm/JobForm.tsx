import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import "./JobForm.css"
import { useState } from "react"
type Props = {
  show: boolean
  handleClose: () => void
}

export default function JobForm({ show, handleClose }: Props) {
  const [validated, setValidated] = useState(false)
  const [form, setForm] = useState({
    position: "",
    company: "",
    location: "",
    remote: "Yes",
    status: "Pending",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //Form validation
    const jobForm = e.currentTarget
    if (jobForm.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)

    //Check if there are any fields that are empty, if not, submit and close modal
    let checkEmpty = Object.values(form).filter((item) => item.length <= 0)
    if (checkEmpty.length === 0) handleClose()
  }

  const setField = (field: any, value: any) => {
    setForm({ ...form, [field]: value })
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a job listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <Form onSubmit={handleSubmit} noValidate validated={validated}>
            <Form.Group className="form-group" controlId="position">
              <Form.Label>Job Position</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="e.g: Front-end Engineer..."
                required
                value={form.position}
                onChange={(e) => setField("position", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="form-group" controlId="company">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="e.g: Facebook..."
                required
                value={form.company}
                onChange={(e) => setField("company", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="form-group" controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="e.g: Canada..."
                required
                value={form.location}
                onChange={(e) => setField("location", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="form-group" controlId="remote">
              <Form.Label>Remote</Form.Label>
              <Form.Select
                aria-label="Default select example"
                size="sm"
                required
                value={form.remote}
                onChange={(e) => setField("remote", e.target.value)}
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
                value={form.status}
                onChange={(e) => setField("status", e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Accepted">Accepted</option>
              </Form.Select>
            </Form.Group>
            <div className="form-footer">
              <Button variant="secondary" onClick={handleClose}>
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
  )
}
