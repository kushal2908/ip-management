import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import ConfirmDialog from "../../component/confirmDialog/ConfirmDialog";
import Content from "../../component/content/Content";
import DataTable from "../../component/dataTable/DataTable";
import Loader from "../../component/loader/Loader";
import { ERROR_TOAST, SUCCESS_TOAST } from "../../component/toast/Toastmsg";
import { axiosPrivate } from "../../utils/auth";
import AddressFormModal from "./AddressFormModal";

export default function Address() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [ipData, setIpData] = useState([]);
  const [formType, setFormType] = useState("");
  const [selectedRowId, setSelectedRowId] = useState("");
  const [formModal, setFormModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  // Columns
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
                setFormType("Edit");
                setSelectedRowId(info?.row?.original?.id);
                setFormModal(true);
              }}
            >
              <EditIcon />
            </Button>
            <Button
              size="xs"
              colorScheme={"red"}
              onClick={() => {
                setSelectedRowId(info?.row?.original?.id);
                setConfirmModal(true);
              }}
            >
              <DeleteIcon />
            </Button>
          </Flex>
        </>
      ),
      header: "Action",
    }),
  ];

  //Fetch all IP address
  const fetchIpData = () => {
    setLoading(true);
    axiosPrivate
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

  // Delete function
  // Delete a IP ADDRESS
  const deleteIpAddress = () => {
    axiosPrivate
      .delete(`/ip/${selectedRowId}`)
      .then((res) => {
        toast(SUCCESS_TOAST(res?.data?.msg));
        setConfirmModal(false);
        fetchIpData();
      })
      .catch((err) => {
        console.log(err);
        toast(ERROR_TOAST(err?.response?.data?.msg));
      })
      .finally(() => {});
  };

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
          setSelectedRowId("");
          setFormType("Add");
        }}
        type={formType}
        selectedId={selectedRowId}
      />

      {/* Confirm when delete */}
      <ConfirmDialog
        isOpen={confirmModal}
        onClose={() => {
          setConfirmModal(false);
        }}
        heading="Delete IP address"
        body="Are you sure you want to delete the IP Address?"
        onConfirm={deleteIpAddress}
      />
    </>
  );
}
