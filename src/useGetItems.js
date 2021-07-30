import axios from "axios";
import { useEffect, useState } from "react";
export const date = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth()).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  return { dd, mm, yyyy };
};
export default function useGetItems(page) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  //   pag prevent fetch data so that the fetchData function wait untill the data fetched then change page number
  const [pag, setPag] = useState(false);

  //   Fetch data from the api every time the page number change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setPag(true);
        let datex = date();
        let res = await axios.get(
          `https://api.github.com/search/repositories?q=created:>${datex["yyyy"]}-${datex["mm"]}-${datex["dd"]}&sort=stars&order=desc&page=${page}`
        );
        let data = res.data.items;
        setLoading(false);
        setPag(false);
        return setItems((d) => [...new Set([...d, ...data])]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page]);
  return { items, loading, pag };
}
