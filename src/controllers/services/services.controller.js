import pm2 from "pm2";
import axios from "axios";

const additionals = [
  {
    name: "TFAsoft",
    baseUrl: "https://status.tfasoft.com/api/services",
  },
  {
    name: "Shahab Khodro",
    baseUrl: "http://shahab.narbon.ir:15160/v1/services",
  },
];

export const ALL = async (req, res) => {
  const data = {};

  const slug = "amirhossein";

  await Promise.all(
    additionals.map(async (additional) => {
      try {
        const response = await axios.get(additional.baseUrl);

        data[additional.name] = response.data;
      } catch (error) {
        console.log(error);
        data[additional.name] = false;
      }
    })
  );

  pm2.list((error, list) => {
    if (error) {
      res.status(200).send({ message: error.message });
    }

    const current = list.filter((item) => item.name.includes(slug));

    current.map((item) => (item.name = item.name.replaceAll(`${slug}-`, "")));

    current.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    res.status(200).send({
      in: current,
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
