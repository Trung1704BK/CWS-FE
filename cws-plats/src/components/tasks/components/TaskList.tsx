import { Card, Label, Select } from "@/components/common";
import SearchableSelect from "@/components/common/SearchableSelect/SearchableSelect";
import { useFetchRewards } from "@/lib/admin/rewards/queries";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
  submitText?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const MAX_LIMIT = 10000;

const TaskList = ({ formik, ...rest }: Props) => {
  const { data } = useFetchRewards({ limit: MAX_LIMIT, page: 1 });

  const handleAddLocationTask = () => {
    const newLocations: CreateTaskFormValues["locations"] = [
      ...(formik.values.locations || []),
      {
        name: "",
        description: "",
        reward: null,
        amount: 0,
        job_num: 0,
        order: 0,
        status: 0,
        detail: [],
      },
    ];

    formik.setFieldValue("locations", newLocations);
  };

  const handleAddSocialTask = () => {
    const newSocials: CreateTaskFormValues["social"] = [
      ...(formik.values.social || []),
      {
        platform: 0,
        amount: 0,
        reward_id: "0",
        type: 0,
        url: "",
      },
    ];

    formik.setFieldValue("social", newSocials);
  };

  const handleAddLocationDetail = (index: number) => {
    const newLocations = formik.values.locations?.map((location, i) => {
      if (i === index) {
        return {
          ...location,
          detail: [
            ...(location.detail || []),
            {
              sort: 0,
              name: "",
              address: "",
              open_time: "",
              close_time: "",
              lng: "",
              lat: "",
            },
          ],
        };
      }

      return location;
    });

    formik.setFieldValue("locations", newLocations);

    const newIndex = newLocations?.[index]?.detail?.length || 0 - 1;
    if (newIndex < 0) return;

    const mapObjectPropsToValues = (obj: any) => {
      return Object.keys(obj).reduce((acc, key) => {
        return {
          ...acc,
          [key]: obj[key].value,
        };
      }, {});
    };

    formik.setTouched(
      {
        ...formik.touched,
        locations: [
          ...(formik.touched.locations || []),
          {
            detail: [
              ...(formik.touched.locations?.[index]?.detail || []),
              mapObjectPropsToValues(
                formik.touched.locations?.[index]?.detail?.[newIndex] || {}
              ),
            ],
          },
        ],
      },
      true
    );
  };

  const taskTypes = [
    { name: "Check-in task", onClick: handleAddLocationTask, color: "green" },
    { name: "Social task", onClick: handleAddSocialTask, color: "blue" },
  ];

  const rewardOptions = useMemo(() => {
    return data?.data.map((reward) => ({
      value: reward.id,
      label: reward.name,
      imageUrl: reward.image,
    }));
  }, [data]);

  const handleDeleteLocation = (index: number) => {
    const newLocations = formik.values.locations?.filter((_, i) => i !== index);

    formik.setFieldValue("locations", newLocations);
  };

  const handleDeleteSocial = (index: number) => {
    const newSocials = formik.values.social?.filter((_, i) => i !== index);

    formik.setFieldValue("social", newSocials);
  };

  const handleDeleteLocationDetail = (
    locationIndex: number,
    detailIndex: number
  ) => {
    const newLocations = formik.values.locations?.map((location, i) => {
      if (i === locationIndex) {
        return {
          ...location,
          detail: location.detail?.filter((_, j) => j !== detailIndex),
        };
      }

      return location;
    });

    formik.setFieldValue("locations", newLocations);
  };

  return (
    <div className="space-y-3">
      <Card {...rest}>
        <Card.Heading>Task List</Card.Heading>
        <Card.Divider />
        <Card.Body>
          <Flex alignItems="center" gap={2}>
            {taskTypes.map((taskType) => (
              <Button
                key={taskType.name}
                size="sm"
                leftIcon={<MdAddCircleOutline className="text-white" />}
                onClick={taskType.onClick}
                colorScheme={taskType.color || "blue"}
              >
                {taskType.name}
              </Button>
            ))}
          </Flex>

          {formik.values.locations?.map((location, index) => {
            const taskName = `Location ${index + 1}`;
            const locationsError = formik.errors.locations?.[index];
            const locationsTouch = formik.touched.locations?.[index];

            if (typeof locationsError === "string") {
              return null;
            }

            return (
              <TaskItem
                key={index}
                index={index}
                taskName={taskName}
                onDelete={() => handleDeleteLocation(index)}
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="col-span-1">
                    <FormControl
                      isRequired
                      isInvalid={
                        !!locationsError?.name && !!locationsTouch?.name
                      }
                    >
                      <FormLabel>Name</FormLabel>
                      <Input
                        {...formik.getFieldProps(`locations.${index}.name`)}
                      />
                      <FormErrorMessage>
                        {locationsError?.name}
                      </FormErrorMessage>
                    </FormControl>
                  </div>

                  <FormControl
                    isInvalid={
                      !!locationsError?.status && !!locationsTouch?.status
                    }
                    isRequired
                  >
                    <FormLabel>Status</FormLabel>
                    <Select
                      {...formik.getFieldProps(`locations.${index}.status`)}
                    >
                      <option value="0">Draft</option>
                      <option value="1">Public</option>
                    </Select>

                    {locationsError?.status && (
                      <FormErrorMessage>
                        {locationsError?.status}
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <div className="col-span-1">
                    <FormControl
                      isRequired
                      isInvalid={
                        !!locationsError?.description &&
                        !!locationsTouch?.description
                      }
                    >
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        {...formik.getFieldProps(
                          `locations.${index}.description`
                        )}
                      />
                      <FormErrorMessage>
                        {locationsError?.description}
                      </FormErrorMessage>
                    </FormControl>
                  </div>
                  <div className="col-span-1">
                    <FormControl isRequired isInvalid={!!locationsError?.order}>
                      <FormLabel>Order</FormLabel>
                      <Input
                        {...formik.getFieldProps(`locations.${index}.order`)}
                      />
                      <FormErrorMessage>
                        {locationsError?.order}
                      </FormErrorMessage>
                    </FormControl>
                  </div>
                  <div className="col-span-1">
                    <FormControl
                      isRequired
                      isInvalid={!!locationsError?.job_num}
                    >
                      <FormLabel>Job number</FormLabel>
                      <Input
                        {...formik.getFieldProps(`locations.${index}.job_num`)}
                      />
                      <FormErrorMessage>
                        {locationsError?.job_num}
                      </FormErrorMessage>
                    </FormControl>
                  </div>

                  <div className="col-span-1">
                    <FormControl
                      isRequired
                      isInvalid={
                        !!locationsError?.reward && !!locationsTouch?.reward
                      }
                    >
                      <FormLabel>Reward</FormLabel>
                      <SearchableSelect
                        options={rewardOptions}
                        placeholder="Select reward"
                        {...formik.getFieldProps(`locations.${index}.reward`)}
                        onChange={(value) => {
                          formik.setFieldValue(
                            `locations.${index}.reward`,
                            value
                          );
                          formik.setFieldTouched(
                            `locations.${index}.reward`,
                            true
                          );
                        }}
                        error={
                          (locationsTouch?.reward && locationsError?.reward) ||
                          ""
                        }
                      />
                    </FormControl>
                  </div>

                  <div className="col-span-1">
                    <FormControl
                      isRequired
                      isInvalid={
                        !!locationsError?.amount && !!locationsTouch?.amount
                      }
                    >
                      <FormLabel>Amount</FormLabel>
                      <Input
                        {...formik.getFieldProps(`locations.${index}.amount`)}
                      />
                      <FormErrorMessage>
                        {locationsError?.amount}
                      </FormErrorMessage>
                    </FormControl>
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <div className="flex flex-col gap-3">
                      <Label className="flex items-center justify-between">
                        Details
                        <Button
                          size="sm"
                          onClick={() => handleAddLocationDetail(index)}
                        >
                          Add detail
                        </Button>
                      </Label>

                      {location.detail?.map((detail, detailIndex) => {
                        const detailError =
                          locationsError?.detail?.[detailIndex];
                        const detailTouch =
                          locationsTouch?.detail?.[detailIndex];

                        if (typeof detailError === "string") {
                          return null;
                        }

                        return (
                          <TaskItem
                            index={0}
                            taskName="Location detail"
                            key={detailIndex}
                            onDelete={() =>
                              handleDeleteLocationDetail(index, detailIndex)
                            }
                          >
                            <div className="grid grid-cols-2 gap-3">
                              <FormControl
                                isRequired
                                isInvalid={
                                  !!detailError?.address &&
                                  !!detailTouch?.address
                                }
                              >
                                <FormLabel>Address</FormLabel>
                                <Input
                                  {...formik.getFieldProps(
                                    `locations.${index}.detail.${detailIndex}.address`
                                  )}
                                />
                                <FormErrorMessage>
                                  {detailError?.address}
                                </FormErrorMessage>
                              </FormControl>

                              <FormControl
                                isInvalid={
                                  !!detailError?.name && !!detailTouch?.name
                                }
                              >
                                <FormLabel>Name</FormLabel>
                                <Input
                                  {...formik.getFieldProps(
                                    `locations.${index}.detail.${detailIndex}.name`
                                  )}
                                />
                                <FormErrorMessage>
                                  {detailError?.name}
                                </FormErrorMessage>
                              </FormControl>

                              <FormControl
                                isRequired
                                isInvalid={
                                  !!detailError?.sort && !!detailTouch?.sort
                                }
                              >
                                <FormLabel>Sort</FormLabel>
                                <Input
                                  {...formik.getFieldProps(
                                    `locations.${index}.detail.${detailIndex}.sort`
                                  )}
                                />
                                <FormErrorMessage>
                                  {detailError?.sort}
                                </FormErrorMessage>
                              </FormControl>

                              <FormControl
                                isRequired
                                isInvalid={
                                  !!detailError?.lng && !!detailTouch?.lng
                                }
                              >
                                <FormLabel>Long</FormLabel>
                                <Input
                                  {...formik.getFieldProps(
                                    `locations.${index}.detail.${detailIndex}.lng`
                                  )}
                                />

                                <FormErrorMessage>
                                  {detailError?.lng}
                                </FormErrorMessage>
                              </FormControl>

                              <FormControl
                                isRequired
                                isInvalid={
                                  !!detailError?.lat && !!detailTouch?.lat
                                }
                              >
                                <FormLabel>Lat</FormLabel>
                                <Input
                                  {...formik.getFieldProps(
                                    `locations.${index}.detail.${detailIndex}.lat`
                                  )}
                                />
                                <FormErrorMessage>
                                  {detailError?.lat}
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

          {formik.values.social?.map((social, index) => {
            const socialError = formik.errors.social?.[index];
            const socialTouch = formik.touched.social?.[index];

            if (typeof socialError === "string") {
              return null;
            }

            return (
              <TaskItem
                key={index}
                index={index}
                taskName={`Social ${index + 1}`}
                onDelete={() => handleDeleteSocial(index)}
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="col-span-1">
                    <FormControl
                      isRequired
                      isInvalid={
                        !!socialError?.platform && !!socialTouch?.platform
                      }
                    >
                      <FormLabel>Platform</FormLabel>
                      <Select
                        {...formik.getFieldProps(`social.${index}.platform`)}
                      >
                        <option value="1">Facebook</option>
                        <option value="2">Twitter</option>
                        <option value="3">Telegram</option>
                        <option value="4">Discord</option>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-span-1">
                    <FormControl
                      isRequired
                      isInvalid={!!socialError?.amount && !!socialTouch?.amount}
                    >
                      <FormLabel>Amount</FormLabel>
                      <Textarea
                        {...formik.getFieldProps(`social.${index}.amount`)}
                      />
                      <FormErrorMessage>{socialError?.amount}</FormErrorMessage>
                    </FormControl>
                  </div>
                  <div className="col-span-1">
                    <FormControl
                      isRequired
                      isInvalid={
                        !!socialError?.reward_id && !!socialTouch?.reward_id
                      }
                    >
                      <FormLabel>Reward</FormLabel>

                      <SearchableSelect
                        options={rewardOptions}
                        {...formik.getFieldProps(`social.${index}.reward_id`)}
                        error={
                          (socialTouch?.reward_id &&
                            (socialError?.reward_id as string)) ||
                          ""
                        }
                        placeholder="Select reward"
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        onChange={(value: { label: string; value: string }) => {
                          formik.setFieldValue(
                            `social.${index}.reward_id`,
                            value.value
                          );
                          formik.setFieldTouched(
                            `social.${index}.reward_id`,
                            true
                          );
                        }}
                        value={undefined}
                      />
                    </FormControl>
                  </div>
                  <div className="col-span-1">
                    <FormControl
                      isRequired
                      isInvalid={!!socialError?.type && !!socialTouch?.type}
                    >
                      <FormLabel>Type</FormLabel>
                      <Select {...formik.getFieldProps(`social.${index}.type`)}>
                        <option value="1">Draft</option>
                        <option value="2">Published</option>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-span-1">
                    <FormControl
                      isRequired
                      isInvalid={!!socialError?.url && !!socialTouch?.url}
                    >
                      <FormLabel>Url</FormLabel>
                      <Input {...formik.getFieldProps(`social.${index}.url`)} />
                    </FormControl>
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

export default TaskList;
