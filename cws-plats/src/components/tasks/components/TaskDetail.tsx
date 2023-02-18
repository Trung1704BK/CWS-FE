import { AppDropzone, Card } from "@/components/common";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { CreateTaskFormValues } from "../CreateTaskPage";

type Props = {
  formik: FormikProps<CreateTaskFormValues>;
} & React.HTMLAttributes<HTMLDivElement>;

const TaskDetail = ({ formik, ...rest }: Props) => {
  return (
    <section>
      <Card {...rest}>
        <Card.Heading>Task Detail</Card.Heading>
        <Card.Divider />

        <Card.Body className="flex flex-col space-y-3 space-x-0 md:flex-row md:space-y-0 md:space-x-3">
          <div className="max-w-lg space-y-2">
            <FormControl isRequired isInvalid={!!formik.errors.slider}>
              <FormLabel>Slider</FormLabel>
              <AppDropzone
                onDrop={(acceptedFiles) => {
                  if (acceptedFiles instanceof Array)
                    formik.setFieldValue("slider", [
                      ...formik.values.slider,
                      ...acceptedFiles,
                    ]);
                }}
                onDelete={(index) => {
                  formik.setFieldValue("slider", [
                    ...formik.values.slider.slice(0, index),
                    ...formik.values.slider.slice(index + 1),
                  ]);
                }}
                className="h-28 rounded-xl border border-dashed border-sky-300 bg-sky-100 p-2"
                multiple
                error={formik.errors.slider as string}
                // Map to array buffer
                value={formik.values.slider?.map((file) =>
                  file instanceof File ? URL.createObjectURL(file) : file
                )}
              />
            </FormControl>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};
export default TaskDetail;
