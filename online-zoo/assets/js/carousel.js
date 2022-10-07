const petCollection = [
  { 
    id: 1,
    img: 'foto-card1',
    name: 'giant Pandas',
    location: 'Native to Southwest China',
    vegan: true,
  },
  { 
    id: 2,
    img: 'foto-card2',
    name: 'Eagles',
    location: 'Native to Dagestan',
    vegan: false,
  },
  { 
    id: 3,
    img: 'foto-card3',
    name: 'Gorillas',
    location: 'Native to Congo',
    vegan: true,
  },
  { 
    id: 4,
    img: 'foto-card4',
    name: 'Two-toed Sloth',
    location: 'Mesoamerica, South America',
    vegan: true,
  },
  { 
    id: 5,
    img: 'foto-card5',
    name: 'cheetahs',
    location: 'Native to Africa',
    vegan: false,
  },
  { 
    id: 6,
    img: 'foto-card6',
    name: 'Penguins',
    location: 'Native to Antarctica',
    vegan: false,
  },
  { 
    id: 7,
    img: 'foto-card7',
    name: 'Alligators',
    location: 'Native to Southeastern U. S.',
    vegan: false,
  },
  {
    id: 8,
    img: 'foto-card8',
    name: 'Gorillas',
    location: 'Native to Congo',
    vegan: true,
  },
];

const shuffl = (coll) => {
  const res = coll.sort(() => Math.random() - 0.5);
  return res; 
};

const cardCreate = (prop) => {
  const card = `
    <section class="pet-card">
      <img src="../../assets/images/pets/${prop.img}.jpg" alt="foto-card1" class="pet-card__img">
      <div class="pet-card__desc">
        <h3 class="pet-card__title">${prop.name}</h3>
        <p class="pet-card__location">${prop.location}</p>
      </div>
      <div class="pet-card__icons ${prop.vegan ? 'pet-card__icons_vegan' : ''}"></div>
    </section>`;
    return card;
}

const createPetsColl = () => {
  const newItem = shuffl(petCollection).slice(0, 6).map(pet => {
    const div = document.createElement('div');
    div.classList.add('pet-container');
    div.innerHTML = cardCreate(pet);
    return div;
  });
  const divContainer = document.createElement('div');
  divContainer.classList.add('carousel-item5', 'item');
  newItem.forEach(i =>  divContainer.append(i));
  return divContainer;
}

let currentIndex = 1;

export default () => {
  const container = document.querySelector('.carousel__item-container');
  
  let isEnabled = true;
  const changeIndex = (n) => {
    currentIndex = 1 + n;
  }

  const hideItem = (dir) => {
    isEnabled = false;

    const items = document.querySelectorAll('.item');
    const newPetsColl = createPetsColl();
    const newPetsColl1 = createPetsColl();

    const itemToHide = items[1];
    if(dir === 'to-right') {
      items[0].remove();
      container.append(newPetsColl);
    } else {
      items[2].remove();
      container.prepend(newPetsColl);
    }

    itemToHide.classList.add(dir);
    itemToHide.addEventListener('animationend', function() {
      itemToHide.classList.remove('item_active', dir);
      this.replaceWith(newPetsColl1);
      // container.prepend(newPetsColl1);
    });
  };

  const showItem = (dir) => {
    const items = document.querySelectorAll('.item');
    items[1].classList.add('item_next', dir);
    items[1].addEventListener('animationend', function() {
      this.classList.remove('item_next', dir);
      this.classList.add('item_active');
      currentIndex = 1;
      isEnabled = true;
    });

  };
  
  const rigth = document.querySelector('.pets__arrow_right');
  const left = document.querySelector('.pets__arrow_left');
  const item1 = document.querySelector('.carousel-item1');
  const item2 = document.querySelector('.carousel-item2');
  const item3 = document.querySelector('.carousel-item3');
  const pets1 = shuffl(petCollection).slice(0, 6);
  const pets2 = shuffl(petCollection).slice(0, 6);
  const pets3 = shuffl(petCollection).slice(0, 6);

  const petsHtml1 = pets1.map(pet => {
    const div = document.createElement('div');
    div.classList.add('pet-container');
    div.innerHTML = cardCreate(pet);
    return div;
  });
  const petsHtml2 = pets2.map(pet => {
    const div = document.createElement('div');
    div.classList.add('pet-container');
    div.innerHTML = cardCreate(pet);
    return div;
  });
  const petsHtml3 = pets3.map(pet => {
    const div = document.createElement('div');
    div.classList.add('pet-container');
    div.innerHTML = cardCreate(pet);
    return div;
  });
  petsHtml1.forEach(pet => item1.appendChild(pet));
  petsHtml2.forEach(pet => item2.appendChild(pet));
  petsHtml3.forEach(pet => item3.appendChild(pet));

  rigth.addEventListener('click', () => {
    if(isEnabled) {
      hideItem('to-left');

      changeIndex(1);

      showItem('from-right');
    }
  })

  left.addEventListener('click', () => {
    if(isEnabled) {
      hideItem('to-right');
      changeIndex(-1);
      showItem('from-left');
    }
  })
};
