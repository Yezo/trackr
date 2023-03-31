import React from "react"
import { Modal, Form, Button } from "react-bootstrap"

type Props = {
  showAddJob: boolean
  setShowAddJob: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  formref: React.MutableRefObject<null>
  validated: boolean
}

export default function AddJobForm({
  showAddJob,
  setShowAddJob,
  handleSubmit,
  formref,
  validated,
}: Props) {
  return (
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
              <Form.Select aria-label="Default select example" size="sm" required name="remote">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Hybrid">Hybrid</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="form-group" controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select aria-label="Default select example" size="sm" required name="status">
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
  )
}
