
    const url = "https://swapi.dev/api/people/";
    
    function getAll() {
        fetch(url)
        .then((response) => response.json())
        .then((characters) => console.log(characters));
      };

    function getById(id) {
    fetch(url + id)
    .then((response) => response.json())
    .then((character) => {return character});
    
    };

    export {getAll, getById};
 