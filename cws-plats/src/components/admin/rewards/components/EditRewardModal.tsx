import { Select } from "@/components/common";
import Modal from "@/components/common/Modal/Modal";
import { getIsInvalid } from "@/core/formik";
import { queryClient } from "@/core/queryClient";
import { postUpdateReward, updateRewardSchema } from "@/lib/admin/rewards";
import { hideEditModal, selectIsEditModalOpen } from "@/store/rewardPage";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  Input,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import AppDropzone from "../../../common/AppDropzone/AppDropzone";

function EditRewardModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsEditModalOpen);
  const reward = useAppSelector((state) => state.rewardPage.editReward);

  const toggle = () => dispatch(hideEditModal());

  const formik = useFormik<z.infer<typeof updateRewardSchema>>({
    initialValues: {
      id: reward?.id || "",
      name: reward?.name || "",
      description: reward?.description || "",
      image: new File([], ""),
      status: (reward?.status.toString() === "0" ? "0" : "1") || "0",
      order: reward?.order || 0,
    },
    onSubmit: async (values) => {
      toast.promise(postUpdateReward(values), {
        loading: "Creating...",
        success: (data) => {
          formik.resetForm();
          toggle();
          queryClient.invalidateQueries(["rewards"]);

          return `Reward updated: ${data.name}`;
        },
        error: (err) => {
          console.log(err.errors);
          formik.setErrors(err.errors);

          return `Error: ${err?.message}`;
        },
      });
    },
    validationSchema: toFormikValidationSchema(updateRewardSchema),
  });

  useEffect(() => {
    if (reward) {
      formik.setValues({
        id: reward.id,
        name: reward.name,
        description: reward.description,
        image: reward.image || new File([], ""),
        status: reward.status.toString() === "0" ? "0" : "1",
        order: parseInt(reward.order.toString()),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reward]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      formik.setFieldValue("image", acceptedFiles[0]);
    },
    [formik]
  );

  return (
    <Modal title="Edit reward" isOpen={isOpen} onClose={toggle}>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-3">
          <div className="flex flex-col-reverse items-center gap-2 md:flex-row">
            <div>
              {formik.errors?.image && (
                <div className="text-red-500">{formik.errors.image}</div>
              )}
              <AppDropzone
                onDrop={onDrop}
                // value={reward?.image ? [reward.image] : []}
                value={formik.values.image ? [formik.values.image] : []}
                className="aspect-square w-36"
              />
            </div>
            <FormControl isRequired isInvalid={!!formik.errors.name}>
              <FormLabel>Name</FormLabel>
              <Input w="full" {...formik.getFieldProps("name")} />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>
          </div>

          <FormControl
            isRequired
            isInvalid={getIsInvalid(formik, "description")}
          >
            <FormLabel>Description(En)</FormLabel>
            <Textarea {...formik.getFieldProps("description")} />
            <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={getIsInvalid(formik, "status")}>
            <FormLabel>Status</FormLabel>
            <Select {...formik.getFieldProps("status")}>
              <option value="0">Draft</option>
              <option value="1">Public</option>
            </Select>

            <FormErrorMessage>{formik.errors.status}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={getIsInvalid(formik, "order")}>
            <FormLabel>Order</FormLabel>
            <Input {...formik.getFieldProps("order")} />
            <FormErrorMessage>{formik.errors.order}</FormErrorMessage>
          </FormControl>
        </div>
        <Modal.Bottom toggle={toggle}>
          <Button colorScheme="blue" type="submit">
            Edit
          </Button>
        </Modal.Bottom>
      </form>
    </Modal>
  );
}

export default EditRewardModal;
