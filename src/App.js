import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./components/Card";

function App() {
  const [items, setItems] = useState([]);
  const fetchData = async () => {
    let res = await axios.get(
      "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc"
    );
    let data = res.data.items;
    return setItems(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <div className="container">
        {items.map((d) => (
          <Card
            title={d.name}
            desc={d.description}
            img={d.owner.avatar_url}
            stars={d.stargazers_count}
            iss={d.open_issues}
            ts={d.pushed_at}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
