import { Select } from "@/components/common";
import Modal from "@/components/common/Modal/Modal";
import { getIsInvalid } from "@/core/formik";
import { queryClient } from "@/core/queryClient";
import { createAssetSchema, postCreateReward } from "@/lib/admin/rewards";
import { selectIsCreateModalOpen, toggleCreateModal } from "@/store/rewardPage";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import {  useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Dropzone from "../../../common/AppDropzone/AppDropzone";

function CreateAssetsModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCreateModalOpen);
  const [isSubmited, setIsSubmited] = useState(false);

  const toggle = () => dispatch(toggleCreateModal());

  const formik = useFormik<z.infer<typeof createAssetSchema>>({
    initialValues: {
      name: "",
      description: "",
      image: new File([], ""),
      status: "0",
      order: 0,
    },
    validateOnChange: isSubmited,
    onSubmit: async (values) => {
      setIsSubmited(true);

      toast.promise(postCreateReward(values), {
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
    validationSchema: toFormikValidationSchema(createAssetSchema),
  });

  return (
    <Modal title="Create reward" isOpen={isOpen} onClose={toggle}>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-3">
          <div className="flex flex-col-reverse gap-2 md:flex-row md:items-center">
            <Dropzone
              className="self-start"
              onDrop={(acceptedFiles) => {
                if (acceptedFiles instanceof Array)
                  formik.setFieldValue("image", acceptedFiles[0]);
              }}
              value={[formik.values.image]}
            />
            <div className="grow">
              <FormControl isRequired isInvalid={!!formik.errors.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input {...formik.getFieldProps("name")} />
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              </FormControl>
            </div>
          </div>

          <FormControl isInvalid={getIsInvalid(formik, "description")}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              placeholder="Description"
              {...formik.getFieldProps("description")}
            />
            {formik.errors?.description && (
              <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={getIsInvalid(formik, "status")}>
            <FormLabel htmlFor="status">Status</FormLabel>
            <Select {...formik.getFieldProps("status")}>
              <option value="0">Draft</option>
              <option value="1">Public</option>
            </Select>
            {formik.errors?.status && (
              <FormErrorMessage>{formik.errors.status}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={getIsInvalid(formik, "order")}>
            <FormLabel htmlFor="order">Order</FormLabel>
            <Input {...formik.getFieldProps("order")} />
            <FormErrorMessage>{formik.errors.order}</FormErrorMessage>
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

export default CreateAssetsModal;
