// Категории товаров в магазине
type Category = "phones" | "laptops" | "accessories";

// Возможные статусы заказа
type OrderStatus = "new" | "paid" | "delivered" | "cancelled";

// Описание одного товара
interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  inStock: boolean;
}

// Описание заказа клиента
interface Order {
  id: number;
  customerName: string;
  productId: number;
  quantity: number;
  status: OrderStatus;
}

// Массив из трёх товаров
const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15",
    category: "phones",
    price: 450000,
    inStock: true,
  },
  {
    id: 2,
    name: "Lenovo ThinkPad",
    category: "laptops",
    price: 600000,
    inStock: false,
  },
  {
    id: 3,
    name: "Наушники AirPods",
    category: "accessories",
    price: 90000,
    inStock: true,
  },
];

// Массив из трёх заказов
const orders: Order[] = [
  {
    id: 1,
    customerName: "Алихан",
    productId: 1,
    quantity: 1,
    status: "paid",
  },
  {
    id: 2,
    customerName: "Данияр",
    productId: 3,
    quantity: 2,
    status: "new",
  },
  {
    id: 3,
    customerName: "Руслан",
    productId: 2,
    quantity: 1,
    status: "cancelled",
  },
];

// Возвращает только товары, которые есть в наличии
function getAvailableProducts(list: Product[]): Product[] {
  return list.filter((product) => product.inStock);
}

// Возвращает товары выбранной категории
function getProductsByCategory(
  list: Product[],
  category: Category
): Product[] {
  return list.filter((product) => product.category === category);
}

// Ищет товар по id, если не нашёл — вернёт undefined
function findProduct(
  list: Product[],
  id: number
): Product | undefined {
  return list.find((product) => product.id === id);
}

// Считает общую сумму заказов с выбранным статусом
function totalByStatus(
  orderList: Order[],
  productList: Product[],
  status: OrderStatus
): number {
  let sum = 0;

  for (const order of orderList) {
    if (order.status !== status) {
      continue;
    }

    const product = findProduct(productList, order.productId);

    // Если товар не найден, пропускаем заказ
    if (product === undefined) {
      continue;
    }

    sum = sum + product.price * order.quantity;
  }

  return sum;
}

// Прогноз: выведутся iPhone 15 и Наушники AirPods
console.log(
  "В наличии:",
  getAvailableProducts(products)
    .map((product) => product.name)
    .join(", ")
);

// Прогноз: выведется Lenovo ThinkPad
console.log(
  "Ноутбуки:",
  getProductsByCategory(products, "laptops")
    .map((product) => product.name)
    .join(", ")
);

// Прогноз: 450000 (один iPhone 15 в оплаченном заказе Алихана)
console.log("Сумма оплаченных заказов:", totalByStatus(orders, products, "paid"));

// Прогноз: 180000 (два AirPods по 90000 в новом заказе Данияра)
console.log("Сумма новых заказов:", totalByStatus(orders, products, "new"));
