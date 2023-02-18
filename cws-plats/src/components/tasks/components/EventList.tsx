import { AppDropzone, Card, Select } from "@/components/common";
import SearchableSelect from "@/components/common/SearchableSelect/SearchableSelect";
import { getIsInvalid } from "@/core/formik";
import { useFetchRewards } from "@/lib/admin/rewards/queries";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import { useMemo } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { CreateTaskFormValues } from "../CreateTaskPage";
import { TaskItem } from "./TaskItem";

type Props = {
  formik: FormikProps<CreateTaskFormValues>;
} & React.HTMLAttributes<HTMLDivElement>;

const MAX_LIMIT = 10000;

const EventList = ({ formik, ...rest }: Props) => {
  const { data, isLoading } = useFetchRewards({
    limit: MAX_LIMIT,
    page: 1,
  });

  const rewardOptions = useMemo(() => {
    return data?.data.map((reward) => ({
      value: reward.id,
      label: reward.name,
      imageUrl: reward.image,
    }));
  }, [data]);

  const handleAddEvent = () => {
    formik.setFieldValue("events", [
      ...formik.values.events,
      {
        status: 0,
        type: 0,
        name: "",
        description: "",
        amount: 0,
        reward_id: "0",
        max_job: 0,
        details: [],
        reward: null,
        banner_url: null,
      } as unknown as (typeof formik.values.events)[0],
    ]);
  };

  const handleDeleteEvent = (index: number) => {
    const newEvents = formik.values.events.filter((_, i) => i !== index);
    formik.setFieldValue("events", newEvents);
  };

  const handleAddEventDetail = (index: number) => {
    formik.setFieldValue(
      "events",
      formik.values.events.map((event, i) => {
        if (i === index) {
          return {
            ...event,
            details: [
              ...event.details,
              {
                description: "",
                name: "",
                status: 0,
              } as (typeof formik.values.events)[0]["details"][0],
            ],
          };
        }

        return event;
      })
    );

    const newIndex = formik.values.events?.[index]?.details.length;
    if (!newIndex) {
      return;
    }

    formik.setFieldTouched(`events.${index}.details.${newIndex - 1}.address`);
  };

  const handleDeleteEventDetail = (eventIndex: number, detailIndex: number) => {
    const newDetails = formik.values.events?.[eventIndex]?.details.filter(
        (_, i) => i !== detailIndex
      ),
      newEvents = formik.values.events.map((event, i) => {
        if (i === eventIndex) {
          return {
            ...event,
            details: newDetails,
          };
        }

        return event;
      });

    formik.setFieldValue("events", newEvents);
  };

  return (
    <div className="space-y-3">
      <Card {...rest}>
        <Card.Heading>Event List</Card.Heading>
        <Card.Divider />
        <Card.Body>
          <Button
            size="sm"
            leftIcon={<MdAddCircleOutline className="text-white" />}
            onClick={handleAddEvent}
          >
            Add Event
          </Button>

          {formik.values.events?.map((event, index) => {
            const taskName = `Event ${index + 1}`;
            const eventError = formik.errors.events?.[index];
            const eventTouch = formik.touched.events?.[index];

            if (typeof eventError === "string") {
              return null;
            }

            return (
              <TaskItem
                key={index}
                index={index}
                taskName={taskName}
                onDelete={() => handleDeleteEvent(index)}
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="col-span-1">
                    <FormControl
                      isRequired
                      isInvalid={!!eventError?.name && !!eventTouch?.name}
                    >
                      <FormLabel>Name</FormLabel>
                      <Input
                        {...formik.getFieldProps(`events.${index}.name`)}
                      />
                      <FormErrorMessage>{eventError?.name}</FormErrorMessage>
                    </FormControl>
                  </div>

                  {/* 
                      status: number;
                      type: number;
                      name: string;
                      description: string;
                      amount: number;
                      reward_id: string;
                      max_job: number;
                      banner_url: File;
                  */}

                  <FormControl
                    isInvalid={getIsInvalid(
                      formik,
                      `events.${index}.type` as any
                    )}
                    isRequired
                  >
                    <FormLabel>Type</FormLabel>
                    <Select {...formik.getFieldProps(`events.${index}.type`)}>
                      <option value="0">Session</option>
                      <option value="1">Booth</option>
                      <option value="2">Hub</option>
                    </Select>
                  </FormControl>

                  <FormControl
                    isInvalid={
                      !!eventError?.description && !!eventTouch?.description
                    }
                    isRequired
                  >
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      {...formik.getFieldProps(`events.${index}.description`)}
                    />
                    <FormErrorMessage>
                      {eventError?.description}
                    </FormErrorMessage>
                  </FormControl>

                  {/* Max job */}
                  <FormControl isRequired isInvalid={!!eventError?.max_job}>
                    <FormLabel>Max Job</FormLabel>
                    <Input
                      {...formik.getFieldProps(`events.${index}.max_job`)}
                      type="number"
                    />
                    <FormErrorMessage>{eventError?.max_job}</FormErrorMessage>
                  </FormControl>

                  {/* Reward */}
                  <FormControl
                    isInvalid={!!eventError?.reward && !!eventTouch?.reward}
                    isRequired
                  >
                    <FormLabel>Reward</FormLabel>
                    <SearchableSelect
                      options={rewardOptions}
                      isLoading={isLoading}
                      {...formik.getFieldProps(`events.${index}.reward`)}
                      onChange={(value: any) => {
                        formik.setFieldValue(`events.${index}.reward`, value);
                      }}
                      placeholder="Select reward"
                    />
                    <FormErrorMessage>
                      {eventError?.reward as string}
                    </FormErrorMessage>
                  </FormControl>
                  {/* Amount */}
                  <FormControl isRequired isInvalid={!!eventError?.amount}>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      {...formik.getFieldProps(`events.${index}.amount`)}
                      type="number"
                    />
                    <FormErrorMessage>{eventError?.amount}</FormErrorMessage>
                  </FormControl>

                  {/* Banner */}
                  <FormControl
                    isInvalid={
                      !!eventError?.banner_url && !!eventTouch?.banner_url
                    }
                  >
                    <FormLabel>Banner</FormLabel>
                    <AppDropzone
                      onDrop={(acceptedFiles) => {
                        if (acceptedFiles instanceof Array) {
                          const firstFile = acceptedFiles[0];

                          formik.setFieldValue(
                            `events.${index}.banner_url`,
                            firstFile
                          );

                          formik.setFieldTouched(
                            `events.${index}.banner_url`,
                            true
                          );

                          // trigger validation
                          formik.validateField(`events.${index}.banner_url`);
                        }
                      }}
                      onDelete={(index) => {
                        formik.setFieldValue(
                          `events.${index}.banner_url`,
                          new File([], "")
                        );
                      }}
                      className="h-28 rounded-xl border border-dashed border-sky-300 bg-sky-100 p-2"
                      value={event.banner_url ? [event.banner_url] : []}
                      error={eventError?.banner_url as string}
                    />
                  </FormControl>

                  <FormControl
                    isInvalid={!!eventError?.status && !!eventTouch?.status}
                    isRequired
                  >
                    <FormLabel>Status</FormLabel>
                    <Select {...formik.getFieldProps(`events.${index}.status`)}>
                      <option value="0">Draft</option>
                      <option value="1">Public</option>
                    </Select>

                    {eventError?.status && (
                      <FormErrorMessage>{eventError?.status}</FormErrorMessage>
                    )}
                  </FormControl>

                  <div className="col-span-1 md:col-span-2">
                    <div className="flex flex-col gap-3">
                      <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="xs">Details</Heading>
                        <Box>
                          <Button
                            size="sm"
                            onClick={() => handleAddEventDetail(index)}
                          >
                            Add detail
                          </Button>
                        </Box>
                      </Flex>

                      {event.details?.map((detail, detailIndex) => {
                        const detailError = eventError?.details?.[detailIndex];
                        const detailTouch = eventTouch?.details?.[detailIndex];

                        if (typeof detailError === "string") {
                          return null;
                        }

                        return (
                          <TaskItem
                            index={0}
                            taskName="Event detail"
                            key={detailIndex}
                            onDelete={() => {
                              handleDeleteEventDetail(index, detailIndex);
                            }}
                          >
                            <div className="grid grid-cols-2 gap-3">
                              <FormControl
                                isInvalid={
                                  !!detailError?.name && !!detailTouch?.name
                                }
                                isRequired
                              >
                                <FormLabel>Name</FormLabel>
                                <Input
                                  {...formik.getFieldProps(
                                    `events.${index}.details.${detailIndex}.name`
                                  )}
                                />
                                <FormErrorMessage>
                                  {detailError?.name}
                                </FormErrorMessage>
                              </FormControl>

                              <FormControl
                                isRequired
                                isInvalid={
                                  !!detailError?.description &&
                                  !!detailTouch?.description
                                }
                              >
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                  {...formik.getFieldProps(
                                    `events.${index}.details.${detailIndex}.description`
                                  )}
                                />
                                <FormErrorMessage>
                                  {detailError?.description}
                                </FormErrorMessage>
                              </FormControl>

                              <FormControl
                                isRequired
                                isInvalid={
                                  !!detailError?.status && !!detailTouch?.status
                                }
                              >
                                <FormLabel>Status</FormLabel>
                                <Select
                                  {...formik.getFieldProps(
                                    `events.${index}.details.${detailIndex}.status`
                                  )}
                                >
                                  <option value="0">Draft</option>
                                  <option value="1">Public</option>
                                </Select>

                                <FormErrorMessage>
                                  {detailError?.status}
                                </FormErrorMessage>
                              </FormControl>
                            </div>
                          </TaskItem>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </TaskItem>
            );
          })}
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventList;
