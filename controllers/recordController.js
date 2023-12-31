const Record = require("../models/record");

exports.createRecord = async (req, res) => {
  try {
    const { note, amount, date, type } = req.body;
    const record = new Record({ note, amount, date, type });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllRecords = async (req, res) => {
  try {
    const { date, fromDate, toDate, type } = req.query;
    let query = {};

    if (fromDate && toDate) {
      query.date = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    } else if (fromDate) {
      query.date = { $gte: new Date(fromDate) };
    } else if (toDate) {
      query.date = { $lte: new Date(toDate) };
    } else if (date) {
      query.date = { $eq: new Date(date) };
    }

    if (type) {
      query.type = { $eq: type };
    }

    const records = await Record.find(query).lean();

    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findById(id);
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { note, amount, date, type } = req.body;
    const record = await Record.findByIdAndUpdate(
      id,
      { note, amount, date, type },
      { new: true }
    );
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findByIdAndRemove(id);
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
