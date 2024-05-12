const expenseIcons: iconsType = {
  food: { type: 'food-fork-drink', iconType: 'material-community' },
  transportation: {
    type: 'car',
    iconType: 'material-community',
  },
  communication: { type: 'network', iconType: 'entypo' },
  housing: { type: 'house', iconType: 'material' },
  health: { type: 'health-and-safety', iconType: 'material' },
  education: { type: 'graduation-cap', iconType: 'font-awesome' },
  entertainment: { type: 'gamepad', iconType: 'font-awesome-5' },

  pet: { type: 'cat', iconType: 'font-awesome-5' },
  others: { type: 'dots-grid', iconType: 'material-community' },
};

const incomeIcons = {
  salary: { type: 'savings', iconType: 'material' },
  stock: {
    type: 'finance',
    iconType: 'material-community',
  },
  bonus: { type: 'gift', iconType: 'material-community' },
  commission: { type: 'team', iconType: 'antdesign' },
  allowances: { type: 'hand-coin', iconType: 'material-community' },
  overtime: { type: 'flushed', iconType: 'font-awesome-5' },
};

const foodIcons: iconsType = {
  fruit: { type: 'fruit-watermelon', iconType: 'material-community' },
  vegetable: { type: 'carrot', iconType: 'font-awesome-5' },
  grain: { type: 'bread-slice', iconType: 'font-awesome-5' },
  meat: { type: 'drumstick-bite', iconType: 'font-awesome-5' },
  seafood: { type: 'fish', iconType: 'material-community' },
  snack: { type: 'cookie', iconType: 'material-community' },
  beverage: { type: 'local-drink', iconType: 'material' },
  dessert: { type: 'cake', iconType: 'entypo' },
};

const transportationIcons: iconsType = {
  car: { type: 'car', iconType: 'font-awesome-5' },
  bus: { type: 'bus', iconType: 'font-awesome-5' },
  train: { type: 'train', iconType: 'font-awesome-5' },
  taxi: { type: 'taxi', iconType: 'font-awesome-5' },
};

const entertainmentIcons: iconsType = {
  movie: { type: 'movie', iconType: 'material-community' },
  sport: { type: 'sports-football', iconType: 'material' },
  concert: { type: 'microphone-variant', iconType: 'material-community' },
};

export const iconMap = {
  ...expenseIcons,
  ...incomeIcons,
  ...foodIcons,
  ...transportationIcons,
  ...entertainmentIcons,
};

type iconsType = {
  [key: string]: {
    type: string;
    iconType: string;
  };
};
