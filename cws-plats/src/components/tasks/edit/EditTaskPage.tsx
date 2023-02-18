import TaskDetail from "../components/TaskDetail";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import BasicInformation from "../components/BasicInformation";
import TaskList from "../components/TaskList";
import { useFormik } from "formik";
import { createTaskSchema, editTaskSchema } from "@/lib/tasks/schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import BackButton from "../../common/BackButton/BackButton";
import client, { getApiUrl } from "@/core/client";
import { toast } from "react-hot-toast";
import Router, { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { EditTaskEntityResponse } from "@/lib/tasks/edit/types";
import { Heading } from "@chakra-ui/react";

export type EditTaskFormValues = z.infer<typeof editTaskSchema>;

function EditTaskPage() {
  const router = useRouter();
  const taskId = router.query.taskId;
  const tabs = [
    { name: "Basic Infomation", component: BasicInformation },
    { name: "Detail", component: TaskDetail },
    {
      name: "Task list",
      component: TaskList,
      overrideParams: {
        submitText: "Edit task",
      },
    },
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const formik = useFormik<EditTaskFormValues>({
    initialValues: {
      base: {
        description: "",
        name: "",
        group_id: [],
        status: 0,
        order: 0,
      },
      image: new File([], ""),
      slider: [],
      locations: [],
      social: [],
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: toFormikValidationSchema(createTaskSchema),
    onSubmit: (values) => {
      // transform group_id
      const group_id = values.base.group_id.map((item) => item.value);
      const locations = values.locations.map((item) => {
        return {
          ...item,
          reward_id: item.reward?.value,
        };
      });

      toast.promise(
        client.post(
          `${getApiUrl("action")}/tasks-cws/store`,
          {
            ...values,
            base: {
              ...values.base,
              group_id,
            },
            locations,
            id: taskId,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ),
        {
          loading: "Updating task...",
          success: () => {
            Router.push("/tasks");

            return "Task updated";
          },
          error: (error) => {
            return error.response.data.message || "Something went wrong";
          },
        }
      );
    },
  });
  const fetchTask = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async ({ queryKey }) => {
      const taskId = queryKey?.[1];

      return (
        await client.get<EditTaskEntityResponse>(
          `${getApiUrl("action")}/tasks-cws/edit/${taskId}`
        )
      ).data;
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!taskId,
  });

  useEffect(() => {
    if (fetchTask.isSuccess) {
      const data = fetchTask.data?.data.message;

      formik.setValues({
        base: {
          name: data?.name,
          description: data?.description,
          group_id: data?.group_tasks.map((v) => ({
            value: v.pivot.group_id,
            label: v.name,
          })),
          order: data.order,
          status: data.status,
        },
        image: data?.banner_url,
        locations: data.task_locations.map((v) => ({
          amount: v.amount,
          description: v.description,
          detail: v.task_location_jobs.map((v) => ({
            task_location_id: v.task_location_id,
            name: v.name,
            address: v.address,
            lat: parseInt(v.lat) || 0,
            lng: parseInt(v.lng) || 0,
            status: v.status === true ? 1 : 0,
            order: v.order,
            sort: 1,
          })),
          job_num: v.job_num,
          name: v.name,
          order: v.order,
          reward: {
            imageUrl: v.reward_id,
            label: "hi",
            value: v.reward_id,
          },
          status: v.status,
        })),
        slider: data.task_galleries.map((v) => v.url_image),
        social: data.task_socials.map((v) => ({
          amount: v.amount,
          platform: v.platform,
          reward_id: v.reward_id,
          type: v.type,
          url: v.url,
        })),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTask.data?.data.message, fetchTask.isSuccess]);

  return (
    <div className="space-y-3">
      <BackButton />
      <Heading size="lg">Edit task {fetchTask.data?.data.message.name}</Heading>
      <div>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex">
            {tabs.map((tab, index) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  classNames(
                    "px-3 py-2 text-sm font-medium",
                    selected
                      ? "rounded-t border border-b-0 border-gray-200 bg-white text-gray-900"
                      : "border-b text-gray-500 hover:bg-gray-50 hover:text-gray-700",
                    "outline-none"
                  )
                }
              >
                {index + 1}. {tab.name}
              </Tab>
            ))}
            <div className="grow border-b" />
          </Tab.List>

          <form onSubmit={formik.handleSubmit}>
            <Tab.Panels>
              {tabs.map((tab) => (
                <Tab.Panel
                  key={tab.name}
                  className="animate-opacity-1 duration-500"
                >
                  <tab.component
                    formik={formik as any}
                    className={classNames(
                      "rounded-t-none rounded-b-md border-t-0"
                    )}
                    // ...{tab.component === TaskList ? ...tab.overrideParams : ...{}}
                    {...tab.overrideParams}
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </form>
        </Tab.Group>
      </div>
    </div>
  );
}

EditTaskPage.title = "Edit task";

export default EditTaskPage;
