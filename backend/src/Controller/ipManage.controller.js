const AuditLogs = require("../model/auditLogs.model");
const IpLists = require("../model/ipList.model");
const { logger } = require("../utils/logger");
const morgan = require("morgan");

///////////////////////////////////////////////////////////////////////////
//@DESC        List of all ip entries
//@ROUTE       GET api/ip
//@ACESS       Private
///////////////////////////////////////////////////////////////////////////
const getAllIpController = async (req, res) => {
  const ipLists = await IpLists.findAll({
    order: [["id", "DESC"]],
  });
  if (ipLists.length > 0) {
    res.status(200).json(ipLists);
  } else {
    res.status(204).json({
      msg: "No data",
    });
  }
};

///////////////////////////////////////////////////////////////////////////
//@DESC        Entry Ips
//@ROUTE       POST api/ip
//@ACESS       Private
///////////////////////////////////////////////////////////////////////////
const entryIpController = async (req, res) => {
  const { ipAddress, label } = req.body;

  //Check if ip already registered or not
  const isAlreadyIpAdded = await IpLists.findOne({ where: { ipAddress } });
  if (isAlreadyIpAdded) {
    res.status(400).json({
      msg: "IP already registered",
    });
    logger.error(`IP address ${ipAddress} already registered`);
  } else {
    const ipEntry = await IpLists.create({
      ipAddress: ipAddress,
      label: label,
      createdBy: req?.user?.dataValues?.id,
      createdAt: new Date(),
    });
    if (ipEntry) {
      res.status(201).json({
        msg: "IP registered",
      });

      // Audit Log
      const logMsg = `IP REGISTERED: IP address ${ipAddress} registered by ${req?.user?.dataValues?.name}`;
      logger.info(logMsg);

      // INSERT into DB
      await AuditLogs.create({
        log: logMsg,
      });
    } else {
      res.status(400).json({
        msg: "Error! entry IP Address",
      });
      logger.error(`Error! Entry IP address ${ipAddress}`);
    }
  }
};

///////////////////////////////////////////////////////////////////////////
//@DESC        Retrive an ip entry
//@ROUTE       GET api/ip/:id
//@ACESS       Private
///////////////////////////////////////////////////////////////////////////
const getSignleIpController = async (req, res) => {
  const { id } = req.params;

  const ipInfo = await IpLists.findByPk(id);
  if (ipInfo) {
    res.status(200).json(ipInfo);
  } else {
    res.status(400).json({
      msg: "Can not find IP info",
    });
  }
};

///////////////////////////////////////////////////////////////////////////
//@DESC        Update an ip entries
//@ROUTE       POST api/ip/:id
//@ACESS       Private
///////////////////////////////////////////////////////////////////////////
const updateSigleIpController = async (req, res) => {
  const { label } = req.body;
  const { id } = req.params;

  const selectedIpEntry = await IpLists.findByPk(id); // find the ip
  if (selectedIpEntry) {
    const updateSelectedIpEntry = await selectedIpEntry.update({
      label: label,
      updatedAt: new Date(),
      updatedBy: req?.user?.dataValues?.id,
    });
    if (updateSelectedIpEntry) {
      res.status(200).json({
        msg: "IP address has been updated",
      });

      // Audit Log
      const logMsg = `IP UPDATED: IP address ${updateSelectedIpEntry?.ipAddress} has been updated by ${
        req?.user?.dataValues?.name
      } from ${req.connection.remoteAddress.split(":")[3]}`;
      logger.info(logMsg);

      // INSERT into DB
      await AuditLogs.create({
        log: logMsg,
      });
    } else {
      res.status(400).json({
        msg: "Can not update ip address",
      });
      logger.error(
        `Can not update ip address ${updateSelectedIpEntry?.ipAddress} by ${req?.user?.dataValues?.name} from ${
          req.connection.remoteAddress.split(":")[3]
        } `
      );
    }
  } else {
    res.status(204).json({
      msg: "No data",
    });
    logger.info("No data");
  }
};

///////////////////////////////////////////////////////////////////////////
//@DESC        DELETE an ip entries
//@ROUTE       DELETE api/ip/:id
//@ACESS       Private
///////////////////////////////////////////////////////////////////////////
const deleteIpAddressController = async (req, res) => {
  const { id } = req.params;
  const deleteIpAddress = await IpLists.destroy({ where: { id: id } });
  if (deleteIpAddress) {
    res.status(200).json({
      msg: "IP address deleted",
    });

    // Audit Log
    const logMsg = `IP DELETED: IP address deleted by ${req?.user?.dataValues?.name} from ${
      req.connection.remoteAddress.split(":")[3]
    }`;
    logger.info(logMsg);
    // INSERT into DB
    await AuditLogs.create({
      log: logMsg,
    });
  } else {
    res.status(400).json({
      msg: "Can not deleted IP address ",
    });
    logger.info(
      `Can not deleted IP address by ${req?.user?.dataValues?.name} from ${req.connection.remoteAddress.split(":")[3]}`
    );
  }
};

module.exports = {
  getAllIpController,
  getSignleIpController,
  updateSigleIpController,
  entryIpController,
  deleteIpAddressController,
};
