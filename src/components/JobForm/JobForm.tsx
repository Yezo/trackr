import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./JobForm.css"
type Props = {}

export default function JobForm({}: Props) {
  return (
    <div className="container">
      <Form className="form-container">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Job Title</Form.Label>
          <Form.Control type="text" size="sm" placeholder="e.g: Front-end Engineer..." required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Company</Form.Label>
          <Form.Control type="text" size="sm" placeholder="e.g: Facebook..." required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" size="sm" placeholder="e.g: Canada..." required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Remote</Form.Label>
          <Form.Select aria-label="Default select example" size="sm" required>
            <option value="Pending">Yes</option>
            <option value="Rejected">Hybrid</option>
            <option value="Accepted">No</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Status</Form.Label>
          <Form.Select aria-label="Default select example" size="sm" required>
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
