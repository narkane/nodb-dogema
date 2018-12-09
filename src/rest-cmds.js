import axios from "axios";

//GET
const getCat = catSetter => {
  axios.get(`/api/cats/1`).then(response => {
    // console.log(typeof response.data);
    catSetter(response.data);
    console.log("componentDidMount() GET: " + response.data[0]);
  });
};
//GET
const newHand = (amount, catSetter) => {
  axios.get(`/api/cats/${amount}`).then(response => {
    // console.log(typeof response.data);
    catSetter(response.data);
    //  console.log("componentDidMount() GET: " + response.data[0]);

    // return response.data;
    // console.log(ret);
  });
  // .then(data => response.json({ data }));
};
//DELETE
const deleteCat = (catID, catSetter) => {
  console.log(catID);
  catSetter([]);
  axios.delete(`/api/cats/${catID}`).then(response => {
    catSetter(response.data);
    // console.log("DELETE: " + this.state.cats);
    // console.log("state: " + this.state.cats[catLocalID].url);
  });
};
//PUT
const putCat = (catID, catSetter) => {
  catSetter([]);
  axios.put(`/api/cats/${catID}`).then(response => {
    catSetter(response.data);
    // console.log("put: " + this.state.cats);
    // console.log("state: " + this.state.cats[catLocalID].url);
  });
  // this.showDeck();
};
//POST
const postCat = (newCatURL, newCatID, catSetter) => {
  let cat = {
    url: newCatURL,
    id: newCatID,
    atk: "#",
    def: "#"
  };
  axios.post(`/api/cats`, cat).then(response => {
    // console.log(typeof response.data);
    catSetter(response.data);
    console.log("componentDidMount() GET: " + response.data[0]);
  });
};

export default {
  newHand,
  getCat,
  putCat,
  postCat,
  deleteCat
};
// module.exports = {
//   newHand,
//   getCat,
//   putCat,
//   postCat,
//   deleteCat
// };
