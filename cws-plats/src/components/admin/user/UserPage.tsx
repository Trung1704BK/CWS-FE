import React, { useCallback, useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { searchSchema, useFetchUserList } from "@/lib/users/queries";
import { User } from "@/lib/users/types";
import { userColumnDef } from "@/lib/users/columnDef";
import { useRouter } from "next/router";
import {
  AppDatePicker,
  AppPagination,
  Card,
  Input,
  Spinner,
} from "@/components/common";
import AppTable from "@/components/common/AppTable/AppTable";
import classNames from "classnames";
import { useFormik } from "formik";
import useDebounce from "@/lib/common/hooks/useDebounce";
import Center from "@/components/common/Center/Center";
import { toFormikValidationSchema } from "zod-formik-adapter";

const LIMIT = 15;
function UserPage() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      status: "",
      date_to: "",
      date_end: "",
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {},
    validationSchema: toFormikValidationSchema(searchSchema),
    validateOnChange: true,
  });
  const debouncedSearch = useDebounce(formik.values, 500);
  const columns = useMemo<ColumnDef<User>[]>(() => userColumnDef, []);
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useFetchUserList({
    page,
    limit: LIMIT,
    searchParams: {
      ...debouncedSearch,
    },
  });
  const onPageChange = useCallback((page: number) => {
    router.push("/admin/users?page=" + page, undefined, { shallow: true });
  }, [router]);

  useEffect(() => {
    if (router.query.page) {
      setPage(parseInt(router.query.page as string));
    }
  }, [router.query.page]);

  return (
    <section className="space-y-3">
      <Card className="relative z-30">
        <Card.Heading>
          <h3 className="text-lg font-medium">Filter</h3>
        </Card.Heading>
        <Card.Body>
          <form className={classNames("grid grid-cols-2 gap-3 lg:grid-cols-5")}>
            <Input label="Name" {...formik.getFieldProps("name")} />
            <Input
              label="Email"
              {...formik.getFieldProps("email")}
              error={formik.errors.email}
            />
            <Input
              label="Status"
              {...formik.getFieldProps("status")}
              error={formik.errors.status}
            />
            <AppDatePicker
              label="Date from"
              {...formik.getFieldProps("date_to")}
              onChange={(date) => {
                formik.setFieldValue("date_to", date);
              }}
              error={formik.errors.date_to}
            />
            <AppDatePicker
              label="Date to"
              {...formik.getFieldProps("date_end")}
              onChange={(date) => {
                formik.setFieldValue("date_end", date);
              }}
              error={formik.errors.date_end}
            />
          </form>
        </Card.Body>
      </Card>
      <div>
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <AppTable data={data?.data || []} columns={columns} />
            <AppPagination
              onChange={onPageChange}
              total={data?.total || 0}
              pageSize={data?.per_page || 0}
              current={page}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default UserPage;
