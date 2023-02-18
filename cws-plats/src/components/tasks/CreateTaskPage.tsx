import client, { getApiUrl } from "@/core/client";
import { createTaskSchema } from "@/lib/tasks/schema";
import {
  Button,
  Flex,
  Heading,
  Spacer,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Tab } from "@headlessui/react";
import { useFormik } from "formik";
import Router from "next/router";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import BackButton from "../common/BackButton/BackButton";
import {
  default as BasicInfomation,
  default as BasicInformation,
} from "./components/BasicInformation";
import EventList from "./components/EventList";
import TaskDetail from "./components/TaskDetail";
import TaskList from "./components/TaskList";

export type CreateTaskFormValues = z.infer<typeof createTaskSchema>;

function CreateTaskPage() {
  const tabs = [
    { name: "Basic Infomation", component: BasicInformation },
    { name: "Detail", component: TaskDetail },
    { name: "Task list", component: TaskList },
    { name: "Event List", component: EventList },
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const formik = useFormik<CreateTaskFormValues>({
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
      events: [],
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
      const events = values.events.map((item) => {
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
            events,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ),
        {
          loading: {
            title: "Creating task",
            description: "Please wait...",
          },
          success: () => {
            Router.push("/tasks");

            return {
              title: "Success",
              description: "Task created",
              status: "success",
            };
          },
          error: (error) => {
            if ((error as any)?.response?.data?.message) {
              return {
                title: "Error",
                description: (error as any).response.data.message,
                status: "error",
              };
            }

            return {
              title: "Error",
              description: error.message,
              status: "error",
            };
          },
        }
      );
    },
  });

  const toast = useToast();

  useEffect(() => {
    if (!formik.isValidating && formik.isSubmitting && !formik.isValid) {
      if (formik.errors.base || formik.errors.image) {
        setSelectedIndex(0);
      } else if (formik.errors.slider) {
        setSelectedIndex(1);
      } else if (formik.errors.locations || formik.errors.social) {
        setSelectedIndex(2);
      } else if (formik.errors.events) {
        setSelectedIndex(3);
      }

      toast({
        title: "Error",
        description: `Please check your input, there are some errors: ${Object.keys(
          formik.errors
        ).join(", ")}
        `,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [
    formik.errors,
    formik.isSubmitting,
    formik.isValid,
    formik.isValidating,
    toast,
  ]);

  return (
    <div className="space-y-3">
      <BackButton />
      <Heading size="lg">Create task</Heading>

      <div>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <form onSubmit={formik.handleSubmit}>
            <VStack alignItems="stretch">
              <BasicInfomation formik={formik} />
              <TaskDetail formik={formik} />
              <TaskList formik={formik} />
              <EventList formik={formik} />
            </VStack>
            <Spacer p={1} />

            <Flex
              justifyContent="center"
              position="fixed"
              bottom={2}
              insetX={0}
            >
              <Button
                colorScheme="blue"
                size="lg"
                w="xl"
                onClick={() => {
                  formik.handleSubmit();
                }}
                disabled={selectedIndex === 0}
                rightIcon={<IoIosAddCircle />}
              >
                Create
              </Button>
            </Flex>
          </form>
        </Tab.Group>
      </div>
    </div>
  );
}

CreateTaskPage.title = "Task management";

export default CreateTaskPage;
