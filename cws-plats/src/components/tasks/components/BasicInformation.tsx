import AppDropzone from "@/components/common/AppDropzone/AppDropzone";
import { Card, Select } from "@/components/common";
import { FormikProps } from "formik";
import { CreateTaskFormValues } from "../CreateTaskPage";
import SearchableSelect from "@/components/common/SearchableSelect/SearchableSelect";
import { useFetchGroups } from "@/lib/admin/group/queries";
import { Group } from "@/lib/admin/groups";
import { useMemo } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  Input,
  Stack,
} from "@chakra-ui/react";

type Props = {
  formik: FormikProps<CreateTaskFormValues>;
} & React.HTMLAttributes<HTMLDivElement>;

function BasicInfomation({ formik, ...rest }: Props) {
  const fetchGroups = useFetchGroups({ page: 1, limit: 99999 });

  const mapGroupsToOptions = (groups: Group[]) => {
    return groups.map((group) => ({
      label: group.name,
      value: group.id,
    }));
  };

  const groupOptions = useMemo(() => {
    if (fetchGroups.isSuccess) {
      return mapGroupsToOptions(fetchGroups.data.data);
    }
  }, [fetchGroups.isSuccess, fetchGroups.data?.data]);

  return (
    <section>
      <Card {...rest}>
        <Card.Heading>Basic Information</Card.Heading>
        <Card.Divider />

        <Card.Body className="flex flex-col space-y-3 space-x-0 md:flex-row md:space-y-0 md:space-x-6">
          <div className="w-full space-y-3 md:w-1/3">
            <FormControl
              isRequired
              isInvalid={
                !!formik.errors.base?.name && !!formik.touched.base?.name
              }
            >
              <FormLabel>Name</FormLabel>
              <Input
                {...formik.getFieldProps("base.name")}
                placeholder="Enter task name"
              />
              <FormErrorMessage>{formik.errors.base?.name}</FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={
                !!formik.errors.base?.description &&
                !!formik.touched.base?.description
              }
            >
              <FormLabel>Description</FormLabel>

              <Textarea
                placeholder="Enter task description"
                required={true}
                {...formik.getFieldProps("base.description")}
              />

              <FormErrorMessage>
                {formik.errors.base?.description}
              </FormErrorMessage>
            </FormControl>

            {/* Order */}
            <FormControl
              isRequired
              isInvalid={
                !!formik.errors.base?.order && !!formik.touched.base?.order
              }
            >
              <FormLabel>Order</FormLabel>
              <Input {...formik.getFieldProps("base.order")} />
              <FormErrorMessage>{formik.errors.base?.order}</FormErrorMessage>
            </FormControl>

            {/* Status */}
            <FormControl
              isRequired
              isInvalid={
                !!formik.errors.base?.status && !!formik.touched.base?.status
              }
            >
              <FormLabel>Status</FormLabel>

              <Select isRequired {...formik.getFieldProps("base.status")}>
                <option value="0">Draft</option>
                <option value="1">Published</option>
              </Select>

              <FormErrorMessage>{formik.errors.base?.status}</FormErrorMessage>
            </FormControl>
          </div>

          <Stack className="w-full space-y-3 md:w-1/3">
            <FormControl isRequired isInvalid={!!formik.errors.image}>
              <FormLabel>Cover image</FormLabel>
              <AppDropzone
                onDrop={(acceptedFiles) => {
                  if (acceptedFiles instanceof Array)
                    formik.setFieldValue("image", acceptedFiles[0]);
                }}
                value={[formik.values.image]}
              />
            </FormControl>

            {/* Groups */}
            <FormControl
              isRequired
              isInvalid={
                !!formik.errors.base?.group_id &&
                !!formik.touched.base?.group_id
              }
            >
              <FormLabel>Groups</FormLabel>

              <SearchableSelect
                options={groupOptions}
                placeholder="Select groups"
                error={
                  formik.touched.base?.group_id && formik.errors.base?.group_id
                    ? (formik.errors.base?.group_id as string)
                    : undefined
                }
                required={true}
                {...formik.getFieldProps("base.group_id")}
                isMulti={true}
                onChange={(values: any) => {
                  formik.setFieldValue("base.group_id", values);
                }}
              />
            </FormControl>
          </Stack>
        </Card.Body>
      </Card>
    </section>
  );
}
export default BasicInfomation;
