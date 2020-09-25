import Axios from "axios";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export default async (req, res) => {
  try {
    const { id } = req.query;
    const { data } = await Axios.get(
      `https://api.yelp.com/v3/businesses/${id}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${serverRuntimeConfig.YELP_API_KEY}`,
        },
      }
    );
    return res.json(data);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
