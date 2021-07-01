import React from "react";
import Search from "../../components/search/search.component";

export const Home: React.FC = () => {
  return (
    <div>
      <Search />
    </div>
  );
};

export default Home;

//id to get map location
// const request = async () => {
//   axios
//     .get("/maps/api/place/details/json?", {
//       //ChIJsXxpOlWLwokRd1zxj6dDblU
//       params: {
//         place_id: "ChIJsXxpOlWLwokRd1zxj6dDblU",
//         key: "AIzaSyC-SQdWlu_csXhg9jZJRHwSue7AtNYAyxU",
//         language: "en",
//       },
//     })
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
