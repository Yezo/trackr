import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./JobForm.css"
import { useState } from "react"
type Props = {}

export default function JobForm({}: Props) {
  const [form, setForm] = useState({
    position: "",
    company: "",
    location: "",
    remote: "Yes",
    status: "Pending",
  })
  const [validated, setValidated] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    setValidated(true)
  }

  const setField = (field: any, value: any) => {
    setForm({ ...form, [field]: value })
  }

  return (
    <div className="container">
      <Form className="form-container" onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="position">
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

        <Form.Group className="mb-3" controlId="company">
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

        <Form.Group className="mb-3" controlId="location">
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

        <Form.Group className="mb-3" controlId="remote">
          <Form.Label>Remote</Form.Label>
          <Form.Select
            aria-label="Default select example"
            size="sm"
            required
            value={form.remote}
            onChange={(e) => setField("remote", e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="Hybrid">Hybrid</option>
            <option value="No">No</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="status">
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
