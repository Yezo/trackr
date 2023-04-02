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
        <Card className="card-job" key={id}>
          <Card.Body className="card-content-wrapper">
            <div>
              <Card.Title>{position}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{company}</Card.Subtitle>
              <Card.Text>
                <div className="btn-extra">{location}</div>
                {remote === "Remote" ? <div className="btn-extra">Remote</div> : null}
                {remote === "On-site" ? <div className="btn-extra">On-site</div> : null}
                {remote === "Hybrid" ? <div className="btn-extra">Hybrid</div> : null}

                <div className="btn-extra">{status}</div>
              </Card.Text>
            </div>
            <div className="btn-group">
              <button className="btn-edit" onClick={() => handleEditJob(id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button className="btn-remove" onClick={() => handleDeleteJob(id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}
