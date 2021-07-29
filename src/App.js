import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Card from "./components/Card";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pag, setPag] = useState(false);
  const LoadingSkull = () => {
    let comps = [];
    for (let i = 0; i < 4; i++) {
      comps.push(
        <Card
          loading={loading}
          infos={{
            name: "CC",
            description: "desc",
            owner: { avatar_url: "loading" },
          }}
          key={i}
        />
      );
    }
    return comps;
  };
  const getTodayDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth()).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    return { dd, mm, yyyy };
  };
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (pag) return;
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage(parseInt(page) + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, page, pag]
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        setPag(true);
        let datex = getTodayDate();
        let res = await axios.get(
          `https://api.github.com/search/repositories?q=created:>${datex["yyyy"]}-${datex["mm"]}-${datex["dd"]}&sort=stars&order=desc&page=${page}`
        );
        let data = res.data.items;
        // console.log(data);
        setLoading(false);
        // return setItems((d) => [...d, ...data]);
        setPag(false);
        return setItems((d) => [...new Set([...d, ...data])]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // console.log(items[0].pushed_at.split("T")[0]);
    console.log();
  }, [page]);
  return (
    <div className="App">
      <div className="container">
        {!loading
          ? items.map((d, k) => <Card infos={d} key={k} />)
          : LoadingSkull()}
        {!loading && (
          <div className="Edge" ref={lastElementRef}>
            <Card
              loading={true}
              infos={{
                name: "CC",
                description: "desc",
                owner: { avatar_url: "loading" },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
