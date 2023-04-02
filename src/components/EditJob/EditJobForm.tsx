import React from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { EditListingType } from "../../types/EditListingType"

type Props = {
  showEditJob: boolean
  setShowEditJob: React.Dispatch<React.SetStateAction<boolean>>
  handleEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  formref: React.MutableRefObject<null>
  validated: boolean
  edit: EditListingType
  setEdit: React.Dispatch<React.SetStateAction<EditListingType>>
}

export default function EditJobForm({
  showEditJob,
  setShowEditJob,
  handleEditSubmit,
  formref,
  validated,
  edit,
  setEdit,
}: Props) {
  return (
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
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
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
  )
}
