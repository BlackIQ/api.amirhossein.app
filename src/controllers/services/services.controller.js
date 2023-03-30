import pm2 from "pm2";

export const ALL = async (req, res) => {
  pm2.list((error, list) => {
    if (error) {
      res.status(200).send({ message: error.message });
    }

    res.status(200).send(list);
  });
};

export const LOG = async (req, res) => {
  pm2.list((error, list) => {
    if (error) {
      res.status(200).send({ message: error.message });
    }

    res.status(200).send(list);
  });
};
