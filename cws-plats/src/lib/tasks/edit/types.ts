import { BaseResponse } from "@/core/handleResponse";

export type EditTaskEntityResponse = BaseResponse<Data>;

interface Data {
  message: Message;
}

interface Message {
  id: string;
  creator_id: string;
  name: string;
  description: string;
  banner_url: string;
  start_at?: any;
  end_at?: any;
  status: number;
  type: number;
  order: number;
  created_at: string;
  cover_url: string;
  task_galleries: Taskgallery[];
  group_tasks: Grouptask[];
  task_socials: Tasksocial[];
  task_locations: Tasklocation[];
}

interface Tasklocation {
  id: string;
  task_id: string;
  reward_id: string;
  name: string;
  description: string;
  amount: number;
  job_num: number;
  order: number;
  status: number;
  task_location_jobs: Tasklocationjob[];
}

interface Tasklocationjob {
  id: string;
  task_location_id: string;
  name: string;
  address: string;
  lat: string;
  lng?: any;
  status: boolean;
  order: number;
}

interface Grouptask {
  name: string;
  name_en?: any;
  username: string;
  country: string;
  desc_vn: string;
  desc_en: string;
  avatar_url: string;
  cover_url: string;
  headline: string;
  site_url: string;
  twitter_url: string;
  telegram_url: string;
  facebook_url?: any;
  youtube_url: string;
  discord_url: string;
  instagram_url?: any;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  pivot: Pivot;
}

interface Pivot {
  task_id: string;
  group_id: string;
  created_at: string;
  updated_at: string;
}

interface Taskgallery {
  url_image: string;
  status: boolean;
  created_at?: any;
  updated_at?: any;
  deleted_at?: any;
}

interface Tasksocial {
  id: string;
  task_id: string;
  reward_id: string;
  name?: any;
  description?: any;
  platform: number;
  type: number;
  url: string;
  amount: number;
  order: number;
  status: boolean;
  lock: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}
