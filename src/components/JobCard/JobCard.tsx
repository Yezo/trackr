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
        <Card style={{ width: "18rem" }} className="card-job">
          <Card.Body>
            <Card.Title>{position}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{company}</Card.Subtitle>
            <Card.Text>
              <div className="btn-extra">{location}</div>
              {remote === "Yes" ? <div className="btn-extra">Remote</div> : null}
              {remote === "No" ? <div className="btn-extra">On-site</div> : null}
              {remote === "Hybrid" ? <div className="btn-extra">Hybrid</div> : null}

              <div className="btn-extra">{status}</div>
            </Card.Text>

            <Button className="btn-secondary btn-test" onClick={() => handleEditJob(id)}>
              Edit
            </Button>
            <Button className="btn-primary btn-danger" onClick={() => handleDeleteJob(id)}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}
