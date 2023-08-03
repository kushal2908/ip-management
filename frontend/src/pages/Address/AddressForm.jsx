import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { ERROR_TOAST, SUCCESS_TOAST } from "../../component/toast/Toastmsg";
import { IP_VALIDATE } from "../../utils/validation";

export default function AddressForm({ type, onClose }) {
  const [ip, setIp] = useState("");
  const [label, setLabel] = useState("");
  const [IpErr, setIpErr] = useState("");
  const toast = useToast();

  const createSubmit = (e) => {
    e.preventDefault();
    const isIpValid = IP_VALIDATE.test(ip);
    if (isIpValid) {
      axios
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

  return (
    <>
      <Box>
        <form onSubmit={createSubmit}>
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
          <Button type="submit" colorScheme={"teal"}>
            Add
          </Button>
        </form>
      </Box>
    </>
  );
}

AddressForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
