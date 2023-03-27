import { IJobListing } from "../types/JobListingType"

const STORAGE_KEY = "jobs"

export function saveJobs(data: IJobListing[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function getJobs() {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []
  return JSON.parse(data)
}
