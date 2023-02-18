import { Select } from "@/components/common";
import ErrorLabel from "@/components/common/ErrorLabel/ErrorLabel";
import Modal from "@/components/common/Modal/Modal";
import { getIsInvalid } from "@/core/formik";
import { queryClient } from "@/core/queryClient";
import { createGroupSchema, postCreateGroup } from "@/lib/admin/groups";
import { selectIsCreateModalOpen, toggleCreateModal } from "@/store/groupPage";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  Button,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Dropzone from "../../../common/AppDropzone/AppDropzone";

function CreateGroupsModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCreateModalOpen);
  const [isSubmited, setIsSubmited] = useState(false);

  const toggle = () => dispatch(toggleCreateModal());

  const formik = useFormik<z.infer<typeof createGroupSchema>>({
    initialValues: {
      name: "",
      name_en: "",
      username: "",
      country: "",
      avatar: new File([], ""),
      cover: new File([], ""),
      desc_vn: "",
      desc_en: "",
      status: "0",
    },
    validateOnChange: isSubmited,
    onSubmit: async (values) => {
      setIsSubmited(true);

      toast.promise(postCreateGroup(values), {
        loading: "Creating...",
        success: (data) => {
          formik.resetForm();
          toggle();
          queryClient.invalidateQueries(["groups"]);

          return `Group created: ${data.name}`;
        },
        error: (err) => {
          formik.setErrors(err.errors);

          return `Error: ${err?.message}`;
        },
      });
    },
    validationSchema: toFormikValidationSchema(createGroupSchema),
  });

  return (
    <Modal title="Create Group" isOpen={isOpen} onClose={toggle}>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-3">
          <FormLabel>Avatar</FormLabel>
          <div className="flex flex-col-reverse gap-2 md:flex-row md:items-center">
            <Dropzone
              className="self-start"
              onDrop={(acceptedFiles) => {
                if (acceptedFiles instanceof Array)
                  formik.setFieldValue("avatar", acceptedFiles[0]);
              }}
              value={[formik.values.avatar]}
              error={formik.errors?.avatar as string}
            />
            <div className="grow">
              <FormControl isRequired isInvalid={getIsInvalid(formik, "name")}>
                <FormLabel>Name</FormLabel>
                <Input {...formik.getFieldProps("name")} />
                <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>
              </FormControl>
            </div>
          </div>
          <div>
            <FormLabel>Cover</FormLabel>
          </div>
          <div className="flex flex-col-reverse gap-2 md:flex-row md:items-center">
            <Dropzone
              className="self-start"
              onDrop={(acceptedFiles) => {
                if (acceptedFiles instanceof Array)
                  formik.setFieldValue("cover", acceptedFiles[0]);
              }}
              value={[formik.values.cover]}
              error={formik.errors?.cover as string}
            />

            <div className="grow">
              <FormControl
                isRequired
                isInvalid={getIsInvalid(formik, "name_en")}
              >
                <FormLabel>Name(En)</FormLabel>
                <Input {...formik.getFieldProps("name_en")} />
                <FormErrorMessage>{formik.errors?.name_en}</FormErrorMessage>
              </FormControl>
            </div>
          </div>

          <FormControl isRequired isInvalid={getIsInvalid(formik, "username")}>
            <FormLabel>User Name</FormLabel>
            <Input {...formik.getFieldProps("username")} />
            <FormErrorMessage>{formik.errors?.username}</FormErrorMessage>
          </FormControl>

          {/* Country */}
          <FormControl isRequired isInvalid={getIsInvalid(formik, "country")}>
            <FormLabel>Country</FormLabel>
            <Input {...formik.getFieldProps("country")} />
            <FormErrorMessage>{formik.errors?.country}</FormErrorMessage>
          </FormControl>

          {/* Description */}
          <FormControl isRequired isInvalid={getIsInvalid(formik, "desc_en")}>
            <FormLabel>Description(En)</FormLabel>
            <Textarea {...formik.getFieldProps("desc_en")} />
            <FormErrorMessage>{formik.errors?.desc_en}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={getIsInvalid(formik, "desc_vn")}>
            <FormLabel>Description(Vn)</FormLabel>
            <Textarea {...formik.getFieldProps("desc_vn")} />
            <FormErrorMessage>{formik.errors?.desc_vn}</FormErrorMessage>
          </FormControl>

          {/* Status */}
          <FormControl isInvalid={getIsInvalid(formik, "status")} isRequired>
            <FormLabel htmlFor="status">Status</FormLabel>
            <Select {...formik.getFieldProps("status")}>
              <option value="0">Draft</option>
              <option value="1">Public</option>
            </Select>
            {formik.errors?.status && (
              <ErrorLabel error={formik.errors.status as string} />
            )}
          </FormControl>
        </div>
        <Modal.Bottom toggle={toggle}>
          <Button colorScheme="blue" type="submit">Create</Button>
        </Modal.Bottom>
      </form>
    </Modal>
  );
}

export default CreateGroupsModal;
