import pm2 from "pm2";
import axios from "axios";

const additionals = [
  {
    name: "Shahab Khodro",
    baseUrl: "http://shahab.narbon.ir:15160/v1/services",
  },
];

export const ALL = async (req, res) => {
  const data = {};

  await Promise.all(
    additionals.map(async (additional) => {
      try {
        const response = await axios.get(additional.baseUrl);

        data[additional.name] = response.data;
      } catch (errpr) {
        data[additional.name] = false;
      }
    })
  );

  pm2.list((error, list) => {
    if (error) {
      res.status(200).send({ message: error.message });
    }

    res.status(200).send({
      in: list.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }),
      out: data,
    });
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
