// Sélection des éléments
const decreaseBtn = document.querySelectorAll('.moins');
const increaseBtn = document.querySelectorAll('.plus');
const quantityInput = document.querySelectorAll('.quant-ecran');

// Ajouter les événements aux boutons
decreaseBtn.addEventListener('click', () => {
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
    }
});

increaseBtn.addEventListener('click', () => {
    let currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
});

const body = {
    query: `mutation CartCreate {
      cartCreate(
        input: {
          lines: [
            {
              quantity: 3
              merchandiseId: "gid://shopify/ProductVariant/43695848128534"
            }
          ]
        }
      ) {
        cart {
          id
          createdAt
          updatedAt
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    image {
                      id
                      url
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }`
  };
  const request = await fetch('https://mock.shop/api', {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json"
    },
  });
  const response = await request.json();
  console.log(response);
  