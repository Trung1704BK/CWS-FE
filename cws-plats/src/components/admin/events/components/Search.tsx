import Select from "@/components/common/Select/Select";
import Input from "@/components/common/Input/Input";
import { Disclosure, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import { IoSearchOutline, IoSearch } from "react-icons/io5";
import { Button } from "@chakra-ui/react";

const Search = () => {
  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "" },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              as={Button}
              refName="buttonRef"
              preset="outlined"
              size="sm"
              leftIcon={<IoSearchOutline />}
            >
              Search
            </Disclosure.Button>

            <Transition
              className="overflow-hidden"
              enter="transition transition-[max-height] duration-200 ease-in"
              enterFrom="transform max-h-0"
              enterTo="transform max-h-screen"
              leave="transition transition-[max-height] duration-400 ease-out"
              leaveFrom="transform max-h-screen"
              leaveTo="transform max-h-0"
              show={open}
            >
              <Disclosure.Panel
                className="mt-2 max-w-xl rounded border bg-white p-4"
                as="form"
                onSubmit={formik.handleSubmit}
              >
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Name"
                    required={false}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    name="name"
                    label="Name"
                  />
                  <Input
                    type="text"
                    placeholder="Email"
                    required={false}
                    name="email"
                    label="Email"
                  />
                  <Input
                    type="text"
                    placeholder="Phone"
                    required={false}
                    label="Phone"
                  />
                  <Select onChange={formik.handleChange} name="status">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>

                  <Button colorScheme="blue" leftIcon={<IoSearch />}>
                    Search
                  </Button>
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Search;
