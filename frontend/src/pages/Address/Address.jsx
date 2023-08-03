import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Content from "../../component/content/Content";
import DataTable from "../../component/dataTable/DataTable";
import AddressFormModal from "./AddressFormModal";
import Loader from "../../component/loader/Loader";
import { createColumnHelper } from "@tanstack/react-table";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export default function Address() {
  const [formModal, setFormModal] = useState(false);
  const [formType, setFormType] = useState("");
  const [loading, setLoading] = useState(false);
  const [ipData, setIpData] = useState([]);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("label", {
      cell: (info) => info.getValue(),
      header: "Label",
    }),
    columnHelper.accessor("ipAddress", {
      cell: (info) => info.getValue(),
      header: "IP Address",
    }),
    columnHelper.display({
      cell: (info) => (
        <>
          <Flex gap={2}>
            <Button
              size="xs"
              onClick={() => {
                console.log(info?.row?.original?.id);
              }}
            >
              <EditIcon />
            </Button>
            <Button size="xs" colorScheme={"red"}>
              <DeleteIcon />
            </Button>
          </Flex>
        </>
      ),
      header: "Action",
    }),
  ];

  const fetchIpData = () => {
    setLoading(true);
    axios
      .get("/ip")
      .then((res) => {
        setIpData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIpData();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Box mt={6}>
        <Heading size="md" color={"gray.800"}>
          Address
        </Heading>
        <Content>
          <Flex justify={"end"}>
            <Button
              colorScheme={"teal"}
              onClick={() => {
                setFormModal(true);
                setFormType("Add");
              }}
            >
              Add Address
            </Button>
          </Flex>

          {/* Data Table */}
          <DataTable data={ipData} columns={columns} />
        </Content>
      </Box>

      {/* ADDRESS Form modal */}
      <AddressFormModal
        isOpen={formModal}
        onClose={() => {
          setFormModal(false);
          fetchIpData();
        }}
        type={formType}
      />
    </>
  );
}
