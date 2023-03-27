import { IJobListing } from "../../types/JobListingType"
import "./JobTable.css"

type Props = { jobs: IJobListing[] }

export default function JobTable({ jobs }: Props) {
  return (
    <>
      {jobs ? (
        jobs.map((item) => <div key={item.company}>{item.company}</div>)
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
