import { date } from "../useGetItems";

export default function useGetDateDiff(loading, updated) {
  const GetDiff = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  let datex = date();

  if (!loading) {
    return {
      Diff: GetDiff(
        updated.split("T")[0],
        `${
          datex["yyyy"] + "-" + (parseInt(datex["mm"]) + 1) + "-" + datex["dd"]
        }`
      ),
    };
  } else {
    return 0;
  }
}
