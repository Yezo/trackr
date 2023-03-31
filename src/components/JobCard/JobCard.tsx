import { Card, Button } from "react-bootstrap"
import { IJobListing } from "../../types/JobListingType"
import "./JobCard.css"

type Props = {
  jobs: IJobListing[]
  handleEditJob: (id: string) => void
  handleDeleteJob: (id: string) => void
}

export default function JobCard({ jobs, handleEditJob, handleDeleteJob }: Props) {
  return (
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
  )
}
