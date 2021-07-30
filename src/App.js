import { useCallback, useRef, useState } from "react";
import Card from "./components/Card";
import useGetItems from "./useGetItems";

function App() {
  const [page, setPage] = useState(1);
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

  const { items, loading, pag } = useGetItems(page);
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

  return (
    <div className="App">
      <div className="container">
        {!loading
          ? items.map((d, k) => <Card infos={d} key={k} />)
          : LoadingSkull()}
        {!loading && (
          <div className="Edge">
            <Card
              loading={true}
              infos={{
                name: "CC",
                description: "desc",
                owner: { avatar_url: "loading" },
              }}
            />
            <div
              ref={lastElementRef}
              style={{ display: "block", paddingBottom: "7px" }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
