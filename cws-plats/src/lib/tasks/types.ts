export interface Task {
  id: string;
  name: string;
  description: string;
  image: string;
  type: number;
  status: number;
  post_by: string;
  locations: Location[];
  socials: Social[];
  galleries: Gallery[];
}

export interface Location {
  id: string;
  task_id: string;
  reward_id: string;
  name: string;
  description: string;
  amount: number;
  job_num: number;
  order: number;
  status: number;
  task_location_jobs: TaskLocationJob[];
}

export interface TaskLocationJob {
  id: string;
  task_location_id: string;
  name: string;
  address: string;
  lat: string;
  lng: string;
  status: boolean;
  order: number;
}

export interface Social {
  id: string;
  task_id: string;
  reward_id: string;
  name: string;
  description: any;
  platform: number;
  type: number;
  url: string;
  amount: number;
  order: number;
  status: boolean;
  lock: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}

export interface Gallery {
  url_image: string;
  status: boolean;
  created_at: any;
  updated_at: any;
  deleted_at: any;
}

export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
