import { Select } from "@/components/common";
import Modal from "@/components/common/Modal/Modal";
import SearchableSelect from "@/components/common/SearchableSelect/SearchableSelect";
import { getIsInvalid } from "@/core/formik";
import { queryClient } from "@/core/queryClient";
import { createEventSchema, postCreateEvent } from "@/lib/admin/events";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Dropzone from "../../../common/AppDropzone/AppDropzone";
import { useEventContext } from "../context";

function CreateEventModal() {
  const { dispatch } = useEventContext();
  const { isCreateModalOpen: isOpen } = useEventContext();
  const [isSubmited, setIsSubmited] = useState(false);
  const toggle = () => dispatch({ type: "TOGGLE_CREATE_EVENT", payload: null });

  const formik = useFormik<z.infer<typeof createEventSchema>>({
    initialValues: {
      details: [],
      max_job: 0,
      name: "",
      rewards: {
        amount: 0,
        reward_id: "",
      },
      status: 0,
      task_id: "",
      type: 0,
    },
    validateOnChange: isSubmited,
    onSubmit: async (values) => {
      setIsSubmited(true);

      toast.promise(postCreateEvent(values), {
        loading: "Creating...",
        success: (data) => {
          formik.resetForm();
          toggle();
          queryClient.invalidateQueries(["rewards"]);

          return `Reward created: ${data.name}`;
        },
        error: (err) => {
          formik.setErrors(err.errors);

          return `Error: ${err?.message}`;
        },
      });
    },
    validationSchema: toFormikValidationSchema(createEventSchema),
  });

  return (
    <Modal title="Create event" isOpen={isOpen} onClose={toggle}>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-3">
          <FormControl isRequired isInvalid={!!formik.errors.name}>
            <FormLabel>Name</FormLabel>
            <Input {...formik.getFieldProps("name")} />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={getIsInvalid(formik, "type")}>
            <FormLabel>Type</FormLabel>
            <Select placeholder="Description" {...formik.getFieldProps("type")}>
              <option value="0">Session</option>
              <option value="1">Booth</option>
              <option value="2">Hub</option>
            </Select>
            <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={getIsInvalid(formik, "status")}>
            <FormLabel>Status</FormLabel>
            <Select {...formik.getFieldProps("status")}>
              <option value="0">Draft</option>
              <option value="1">Public</option>
            </Select>
            <FormErrorMessage>{formik.errors.status}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!formik.errors.max_job}>
            <FormLabel>Max Job</FormLabel>
            <Input {...formik.getFieldProps("max_job")} />
            <FormErrorMessage>{formik.errors.max_job}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={getIsInvalid(formik, "task_id")}>
            <FormLabel>Task</FormLabel>
            <SearchableSelect
              {...formik.getFieldProps("task_id")}
              options={[{ value: "1", label: "Task 1" }]}
              onChange={(value) => formik.setFieldValue("task_id", value)}
              isMulti={false}
            />
            <FormErrorMessage>{formik.errors.task_id}</FormErrorMessage>
          </FormControl>
        </div>
        <Modal.Bottom toggle={toggle}>
          <Button colorScheme="blue" type="submit">
            Create
          </Button>
        </Modal.Bottom>
      </form>
    </Modal>
  );
}

export default CreateEventModal;
