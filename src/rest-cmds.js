import axios from "axios";

//tell server who to attack with
const attack = (catID, catSetter) => {
  axios.get(`/api/dogs/attack/${catID}`).then(response => {
    // if (response.data == false) {
    //   deleteCat(catID, catSetter);
    // }
  });
};

//tell server who to attack with
const defend = (catID, catSetter) => {
  axios.get(`/api/dogs/defend/${catID}`).then(response => {
    if (response.data == false) {
      deleteCat(catID, catSetter);
    } else {
      alert("YOU WON! CAT DIED!");
    }
  });
};

//GET TURN
const getTurn = (turnSet, beingAtkd, BA) => {
  axios.get(`/api/dogs/turn`).then(response => {
    // console.log(typeof response.data);
    turnSet(response.data.turn);

    console.log(response.data);
    if (response.data.cat != null && BA != true) {
      beingAtkd(response.data.cat.atk, response.data.cat.def);
      console.log("Cat-attack!: ATK:" + response.data.cat.atk);
    }
  });
};

//GET
const getCat = catSetter => {
  axios.get(`/api/dogs/1`).then(response => {
    // console.log(typeof response.data);
    catSetter(response.data);
    console.log("componentDidMount() GET: " + response.data[0]);
  });
};
//GET
const newHand = (amount, catSetter) => {
  axios.get(`/api/dogs/${amount}`).then(response => {
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
  axios.delete(`/api/dogs/${catID}`).then(response => {
    catSetter(response.data);
    // console.log("DELETE: " + this.state.cats);
    // console.log("state: " + this.state.cats[catLocalID].url);
  });
};
//PUT
const putCat = (catID, catSetter) => {
  catSetter([]);
  axios.put(`/api/dogs/${catID}`).then(response => {
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
  axios.post(`/api/dogs`, cat).then(response => {
    // console.log(typeof response.data);
    catSetter(response.data);
    console.log("componentDidMount() GET: " + response.data[0]);
  });
};

export default {
  getTurn,
  attack,
  defend,

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
