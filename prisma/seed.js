const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const products = [
  {
    name: "Apel",
    price: 20000,
    stock: 20,
    description: "Apel Malang Enak",
    slug: "apel-malang",
  },
  {
    name: "Jeruk",
    price: 15000,
    stock: 20,
    description: "Jeruk Malang Enak",
    slug: "jeruk-malang",
  },
  {
    name: "Anggur",
    price: 30000,
    stock: 20,
    description: "Anggur Malang Enak",
    slug: "anggur-malang",
  },
];

const transactions = [
  {
    quantity: 3,
    totalPrice: 85000,
    status: "WAITING_FOR_PAYMENT",
    transactionItems: [
      {
        productId: 1,
        quantity: 2,
        totalPrice: 40000,
      },
      {
        productId: 2,
        quantity: 1,
        totalPrice: 15000,
      },
      {
        productId: 3,
        quantity: 1,
        totalPrice: 30000,
      },
    ],
  },
];

const main = async () => {
  // Create Products
  await prisma.product.createMany({ data: products });

  // Create Transaction with nested transactionItems
  const createdTransaction = await prisma.transaction.create({
    data: {
      quantity: transactions[0].quantity,
      totalPrice: transactions[0].totalPrice,
      status: transactions[0].status,
      items: {
        create: transactions[0].transactionItems.map((item) => ({
          product: { connect: { id: item.productId } },
          quantity: item.quantity,
          totalPrice: item.totalPrice,
          status: "WAITING_FOR_PAYMENT",
          expiryAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h expiry
        })),
      },
    },
  });

  console.log("Seed completed successfully!", createdTransaction);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
