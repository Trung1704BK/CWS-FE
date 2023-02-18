import { Select } from "@/components/common";
import Modal from "@/components/common/Modal/Modal";
import { queryClient } from "@/core/queryClient";
import { postUpdateGroup, updateGroupSchema } from "@/lib/admin/groups";
import { hideEditModal, selectIsEditModalOpen } from "@/store/groupPage";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import AppDropzone from "../../../common/AppDropzone/AppDropzone";

function EditGroupModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsEditModalOpen);
  const group = useAppSelector((state) => state.groupPage.editGroup);

  const toggle = () => dispatch(hideEditModal());

  const formik = useFormik<z.infer<typeof updateGroupSchema>>({
    initialValues: {
      id: group?.id || "",
      name: group?.name || "",
      name_en: group?.name_en || "",
      username: group?.username || "",
      country: group?.country || "",
      avatar: new File([], ""),
      cover: new File([], ""),
      desc_en: group?.desc_en || "",
      desc_vn: group?.desc_vn || "",
      status: (group?.status.toString() === "0" ? "0" : "1") || "0",
    },
    onSubmit: async (values) => {
      toast.promise(postUpdateGroup(values), {
        loading: "Creating...",
        success: () => {
          formik.resetForm();
          toggle();
          queryClient.invalidateQueries(["groups"]);

          return "Group updated: success";
        },
        error: (err) => {
          console.log(err.errors);
          formik.setErrors(err.errors);

          return `Error: ${err?.message}`;
        },
      });
    },
    validationSchema: toFormikValidationSchema(updateGroupSchema),
  });

  useEffect(() => {
    if (group) {
      formik.setValues({
        id: group.id,
        name: group.name,
        name_en: group.name_en,
        username: group.username,
        country: group.country,
        desc_vn: group.desc_vn,
        desc_en: group.desc_en,
        avatar: new File([], ""),
        cover: new File([], ""),
        status: group.status.toString() === "0" ? "0" : "1",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      formik.setFieldValue("avatar", acceptedFiles[0]);
    },
    [formik]
  );

  return (
    <Modal title="Edit group" isOpen={isOpen} onClose={toggle}>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-3">
          <div className="flex flex-col-reverse items-center gap-2 md:flex-row">
            <div>
              {formik.errors?.avatar && (
                <div className="text-red-500">{formik.errors.avatar}</div>
              )}
              <AppDropzone
                onDrop={onDrop}
                value={[group?.avatar_url || ""]}
                className="aspect-square w-36"
              />
            </div>
            <FormControl isRequired isInvalid={!!formik.errors.name}>
              <FormLabel>Name</FormLabel>
              <Input {...formik.getFieldProps("name")} />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>
          </div>

          <FormControl isRequired isInvalid={!!formik.errors.desc_en}>
            <FormLabel htmlFor="desc_en">Description (EN)</FormLabel>

            <Textarea {...formik.getFieldProps("desc_en")} />

            <FormErrorMessage>{formik.errors.desc_en}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!formik.errors.desc_vn}>
            <FormLabel htmlFor="desc.desc_vn">Description (VN)</FormLabel>
            <Textarea {...formik.getFieldProps("desc.desc_vn")} />
            <FormErrorMessage>{formik.errors.desc_vn}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!formik.errors.status}>
            <FormLabel htmlFor="status">Status</FormLabel>

            <Select {...formik.getFieldProps("status")}>
              <option value="0">Draft</option>
              <option value="1">Public</option>
            </Select>

            <FormErrorMessage>{formik.errors.desc_en}</FormErrorMessage>
          </FormControl>
        </div>
        <Modal.Bottom toggle={toggle}>
          <Button colorScheme="blue" type="submit">Edit</Button>
        </Modal.Bottom>
      </form>
    </Modal>
  );
}

export default EditGroupModal;

