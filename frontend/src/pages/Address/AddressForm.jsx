import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react";
import { ERROR_TOAST, SUCCESS_TOAST } from "../../component/toast/Toastmsg";
import { IP_VALIDATE } from "../../utils/validation";
import { axiosPrivate } from "../../utils/auth";

export default function AddressForm({ type, onClose, selectedId }) {
  const [ip, setIp] = useState("");
  const [label, setLabel] = useState("");
  const [IpErr, setIpErr] = useState("");
  const toast = useToast();

  const retriveIpAddress = () => {
    axiosPrivate
      .get(`/ip/${selectedId}`)
      .then((res) => {
        console.log(res);
        setIp(res?.data?.ipAddress);
        setLabel(res?.data?.label);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    if (selectedId) {
      retriveIpAddress();
    }
  }, [selectedId]);

  const createSubmit = (e) => {
    e.preventDefault();
    const isIpValid = IP_VALIDATE.test(ip);
    if (isIpValid) {
      axiosPrivate
        .post("/ip", { ipAddress: ip, label: label })
        .then((res) => {
          toast(SUCCESS_TOAST(res.data.msg));
          onClose();
        })
        .catch((err) => {
          toast(ERROR_TOAST(err?.response?.data?.msg));
          console.log(err);
        });
    } else {
      setIpErr("Invalid IP Address");
    }
  };

  const updateIpAddressSubmit = (e) => {
    e.preventDefault();
    axiosPrivate
      .put(`/ip/${selectedId}`, { ipAddress: ip, label: label })
      .then((res) => {
        toast(SUCCESS_TOAST(res.data.msg));
        onClose();
      })
      .catch((err) => {
        toast(ERROR_TOAST(err?.response?.data?.msg));
        console.log(err);
      });
  };

  return (
    <>
      <Box>
        <form onSubmit={type === "Add" ? createSubmit : updateIpAddressSubmit}>
          <FormControl mb={4} isRequired isInvalid={IpErr}>
            <FormLabel>IP Address</FormLabel>
            <Input
              type="text"
              disabled={type === "Edit"}
              onChange={(e) => {
                setIpErr(false);
                type === "Edit" ? null : setIp(e.target.value);
              }}
              value={ip}
            />
            <FormErrorMessage>{IpErr}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Label</FormLabel>
            <Input
              type="text"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
              }}
            />
          </FormControl>
          <Flex justify={"end"} gap={2}>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="submi
            t"
              colorScheme={"teal"}
            >
              Save
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
}

AddressForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  selectedId: PropTypes.string,
};
