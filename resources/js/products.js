/**
 * Toggles the visibility of the password input field.
 *
 * This function changes the input type of the element with the id 'password'
 * from 'password' to 'text' and vice versa, allowing the user to toggle between
 * showing and hiding the password.
 */
function togglePasswordVisibility() {
  const passwordInput = $('#password');
  const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
  passwordInput.attr('type', type);
}

const togglebtn = $('#toggle_Password');

togglebtn.on('click', () => {
  togglePasswordVisibility();
});

const logout = $('#logout-form');
const logoutBtn = $('#logoutbtn');

logoutBtn.on('click', () => {
  logout.trigger('submit');
});



/**
 * Represents a Product class that handles CRUD operations for products.
 *
 * @class
 */
class Product {
/**
 * Initializes a new instance of the Product class, setting up CSRF token and API endpoints.
 *
 * @property {string} csrfToken - The CSRF token for AJAX requests.
 * @property {string} getSales - The endpoint URL to fetch sales data.
 * @property {string} getAllProductsUrl - The endpoint URL to retrieve all products.
 * @property {string} addProductUrl - The endpoint URL to add a new product.
 * @property {string} showProduct - The endpoint URL to display a specific product.
 * @property {string} updateProductUrl - The endpoint URL to update a product.
 * @property {string} deleteProductUrl - The endpoint URL to delete a product.
 */
  constructor() {
    this.csrfToken = $('meta[name="csrf-token"]').attr('content');
    this.getSales = PRODUCTS_URL_ENDPOINTS.GET_SALES;
    this.getAllProductsUrl = PRODUCTS_URL_ENDPOINTS.GET_ALL_PRODUCTS;
    this.addProductUrl = PRODUCTS_URL_ENDPOINTS.ADD_PRODUCT;
    this.showProduct = PRODUCTS_URL_ENDPOINTS.SHOW_PRODUCT;
    this.updateProductUrl = PRODUCTS_URL_ENDPOINTS.UPDATE_PRODUCT;
    this.deleteProductUrl = PRODUCTS_URL_ENDPOINTS.DELETE_PRODUCT;
  }


/**
 * Fetches all products from the API.
 *
 * @returns {Promise<Object>} - A promise that resolves with the response containing
 * the list of products or an error message if the request fails.
 */
  async getAllProducts() {
    try {
      const response = await $.ajax(this.getAllProductsUrl, {
        method: 'GET',
        headers: {
          'X-CSRF-TOKEN': this.csrfToken,
        },
      });
      return response;
    } catch (error) {
      return { message: 'Error: ' + error.error, success: false };
    }
  }

  /**
   * Adds a new product to the inventory.
   * @param {File} image The product image
   * @param {string} name The product name
   * @param {string} category The product category
   * @param {number} quantity The product quantity
   * @param {number} price The product price
   * @returns {Promise<{message: string, success: boolean, response: object}>}
   */
  async addProduct(image, name, category, quantity, price) {
    try {
      const formData = new FormData();
      formData.append('product-image', image, image.name);
      formData.append('product-name', name);
      formData.append('category', category);
      formData.append('quantity', quantity);
      formData.append('price', price);
      const response = await $.ajax(this.addProductUrl, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': this.csrfToken,
        },
        processData: false, // Ensure data is not processed
        contentType: false, // Ensure content type is not set
        data: formData,
      });

      return { message: 'Product Added Successfully', success: true, response };
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      return { message: 'Error: ' + errorMessage, success: false };
    }
  }


  /**
   * Updates a product using the specified id and values.
   *
   * @param {number} id The id of the product to update
   * @param {File} [image] The image to update (if any)
   * @param {'ORDER'|'UPDATE'} action The type of update to perform
   * @param {string} name The new name of the product (if updating)
   * @param {string} category The new category of the product (if updating)
   * @param {number} quantity The new quantity of the product (if updating)
   * @param {number} price The new price of the product (if updating)
   * @param {{quantity: number, price: number}} [soldProduct] The sold product information (if ordering)
   *
   * @returns {Promise<{message: string, success: boolean, response: object}>}
   */
  async updateProduct(id, image = null, action, name, category, quantity, price, soldProduct = null) {
    try {
        const updateProductData = new FormData(); // Initialize FormData once

        // Add common fields
        updateProductData.append('_method', 'PUT');
        updateProductData.append('Action', action);

        if (action === 'ORDER' && soldProduct) {
            // Populate order-specific fields
            updateProductData.append('Ordered_quantity', soldProduct.quantity);
            updateProductData.append('Ordered_Total', soldProduct.price);
        } else if (action === 'UPDATE') {
            // Populate update-specific fields
            if (image) {
                updateProductData.append('product-image', image, image.name);
            }
            updateProductData.append('name', name);
            updateProductData.append('category', category);
            updateProductData.append('quantity', quantity);
            updateProductData.append('price', price);
        }

      const response = await $.ajax(this.updateProductUrl.replace(':id', id), {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': this.csrfToken,
        },
        processData: false, // Ensure data is not processed
        contentType: false, // Ensure content type is not set
        data: updateProductData,
      });

      return {
        message: 'Product Updated Successfully',
        success: true,
        response,
      };
    } catch (error) {
        const errorMessage = this.getErrorMessage(error);
      return { message: 'Error: ' + errorMessage, success: false };
    }
  }


/**
 * Deletes a product from the inventory by its id using a DELETE request.
 *
 * @param {number} id - The id of the product to delete.
 * @returns {Promise<Object>} - An object containing a success message if the product was deleted,
 *                              or an error message if the deletion failed.
 */
  async deleteProduct(id) {
    try {
      const response = await $.ajax(this.deleteProductUrl.replace(':id', id), {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': this.csrfToken,
        },
      });
      if (response.message) {
        return { message: response.message, success: true };
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
        const errorMessage = this.getErrorMessage(error);
      return { message: 'Error: ' + errorMessage, success: false };
    }
  }


  /**
   * Places an order for a product and updates the product's quantity and sales info
   * @param {number} id - The id of the product to order
   * @param {string} action - The type of action to perform (ORDER)
   * @param {number} orderedProductQuantity - The quantity of the product ordered
   * @param {number} orderedProductTotalPrice - The total price of the product ordered
   * @returns {Promise<Object>} - A promise that resolves to an object with message, success, and updatedProduct properties
   */
  async orderProduct(id, action, orderedProductQuantity, orderedProductTotalPrice) {
    try {
      const product = await this.getProductById(id);
      if (product) {
        product.quantity -= orderedProductQuantity;

        const soldProduct = {
          id: product.id,
          name: product.product_name,
          quantity: orderedProductQuantity,
          price: orderedProductTotalPrice,
        };

        const updatedProduct = await this.updateProduct(id, null, action, null, null, null, null, soldProduct);
        return {
          message: `Order for Product ${product.product_name} processed successfully`,
          success: true,
          updatedProduct,
        };
      } else {
        return { message: 'Product Not Found', success: false };
      }
    } catch (error) {
        const errorMessage = this.getErrorMessage(error);
      return { message: 'Error: ' + errorMessage, success: false };
    }
  }


  /**
   * Fetches a product from the Laravel API by its id
   *
   * @param {number} id - The id of the product to fetch
   * @returns {Promise<Object|null>} - The fetched product object or null if an error occurred
   */
  async getProductById(id) {
    try {
      const response = await $.ajax(this.showProduct.replace(':id', id),{
        method: 'GET',
        headers: {
          'X-CSRF-TOKEN': this.csrfToken,
        }
    });
      return response;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }


  /**
   * Retrieves a list of sold products, their total quantity sold, and total revenue from the Laravel API.
   * @returns {Promise<{soldProductNames: string[], totalQuantitySold: number, totalPriceSold: number}>}
   * Returns a promise that resolves to an object containing the sold product names, total quantity sold, and total price sold.
   * If an error occurs, the promise resolves to an object with a "message" property and "success" property set to false.
   */
  async getSoldProducts() {
    try {
      const response = await $.ajax(this.getSales, {
        method: 'GET',
        headers: {
          'X-CSRF-TOKEN': this.csrfToken,
        }
      }); // Assuming sold products route
      const soldProductNames = response.map((product) => product.product_name);
      const totalQuantitySold = response.reduce(
        (acc, product) => acc + product.total_qty,
        0
      );
      const totalPriceSold = response.reduce(
        (acc, product) => acc + product.total_price,
        0
      );

      return { soldProductNames, totalQuantitySold, totalPriceSold };
    } catch (error) {
      return { message: 'Error: ' + error.error, success: false };
    }
  }

  getErrorMessage(error) {
    if (error.responseJSON) {
      return `${error.responseJSON.error}`;
    } else if (error.request) {
      return 'Network error. Please try again later.';
    } else {
      return 'Error: ' + error.message;
    }
  }
}

/**
 * A class to handle toast notifications in the user interface.
 */
class toast {
  /**
   * Initializes a new instance of the toast class.
   * @constructor
   */
  constructor() {
    this.toastInstance = $('#toast');
  }

  /**
   * Displays a toast notification with the specified background color and message.
   * @param {string} bgcolor - The CSS class for the background color of the toast.
   * @param {string} message - The message to be displayed in the toast.
   * @description
   * This method removes the hidden class from the toast element, updates the background color
   * and message, and sets a timeout to hide the toast after 2 seconds.
   */
  showToast(bgcolor, message) {
    this.toastInstance.find('#toast-content').addClass(bgcolor);
    this.toastInstance.find('#toast-message').text(message);
    this.toastInstance.removeClass('hidden');
    setTimeout(() => {
      this.toastInstance.addClass('hidden');
      this.toastInstance
        .find('#toast-content')
        .removeClass(
          'bg-green-100 bg-red-100 border border-green-400 border-red-400'
        );
    }, 2000);
  }

  /**
   * Hides the toast notification immediately.
   * @description
   * This method adds the hidden class to the toast element,
   * removes any background color and border classes, and clears the toast message.
   */
  closeToast() {
    this.toastInstance.addClass('hidden');
    this.toastInstance
      .find('#toast-content')
      .removeClass(
        'bg-green-100 bg-red-100 border border-green-400 border-red-400'
      );
    this.toastInstance.find('#toast-message').text('');
  }
}

/**
 * A class to manage modal instances for product operations.
 */
class modal {
  /**
   * Initializes a new instance of the modal class.
   * @constructor
   */
  constructor() {
    this.modalInstance = $('.modal');
  }

  /**
   * Displays the update modal for a product.
   * @returns {jQuery} The jQuery object representing the modal instance.
   * @description
   * This method removes the hidden class from the modal, sets the header text to
   * "Update Product", displays the update product form, and returns the modal instance.
   */
  getUpdateModalInstance() {
    this.modalInstance.removeClass('hidden');
    this.modalInstance.find('h3').text('Update Product');
    this.modalInstance.find('#updateProductForm').removeClass('hidden');
    return this.modalInstance;
  }

  /**
   * Displays the order modal for a product.
   * @returns {jQuery} The jQuery object representing the modal instance.
   * @description
   * This method removes the hidden class from the modal, sets the header text to
   * "Order Product", displays the order product form, and returns the modal instance.
   */
  getOrderModalInstance() {
    this.modalInstance.removeClass('hidden');
    this.modalInstance.find('h3').text('Order Product');
    this.modalInstance.find('#orderProductForm').removeClass('hidden');
    return this.modalInstance;
  }

  /**
   * Closes the modal and resets its content.
   * @description
   * This method adds the hidden class to the modal, clears the header text,
   * hides the update and order product forms, unbinds any submit events, and resets
   * all input and select elements within the forms.
   */
  closeModal() {
    this.modalInstance.addClass('hidden');
    this.modalInstance.find('h3').text('');
    const modalForms = this.modalInstance.find(
      '#updateProductForm, #orderProductForm'
    );
    modalForms.off('submit');
    modalForms.addClass('hidden');
    modalForms.find('input, select').val('');
  }
}

const manageProduct = new Product();
const toastClass = new toast();
const modalClass = new modal();


const getProductsList = async () => {
  const products = await manageProduct.getAllProducts();
  const tablebody = $('#productList');
  tablebody.empty();

  const totalQuantity = products.reduce(
    (acc, product) => acc + parseInt(product.quantity),
    0
  );
  const totalPrice = products.reduce(
    (acc, product) =>
      acc + parseFloat(product.quantity) * parseFloat(product.price),
    0
  );

  $('#totalQuantity').text(totalQuantity);
  $('#totalPrice').text(`₱ ${totalPrice}`);

  products.forEach((product) => {
    const row = $('<tr data-product-id="' + product.id + '" class="border">');
    row.append($('<td class="border-y px-4 py-2">').text(product.id));
    row.append(
      $('<td class="border-y px-4 py-2">').html(
        `<img src="${product.product_image_url}" class="object-cover rounded-full mx-auto" style="width: 90px; height: 90px;" alt="Product Image">`
      )
    );
    row.append(
      $('<td class="border-y px-4 py-2 text-center">').text(
        product.product_name
      )
    );
    row.append(
      $('<td class="border-y px-4 py-2 text-center">').text(
        product.product_categories
      )
    );
    row.append(
      $('<td class="border-y px-4 py-2 text-center">').text(product.quantity)
    );
    row.append(
      $('<td class="border-y px-4 py-2 text-center">').text(product.price)
    );
    row.append(
      $('<td class="text-center">')
        .html(`<button class="bg-green-500 rounded-lg ring-1 ring-teal-800 px-2 py-2 font-bold text-white order">Order</button>
      <button class="bg-blue-500 rounded-lg ring-1 ring-teal-800 px-2 py-2 font-bold text-white edit">Edit</button>
      <button class="bg-red-500 rounded-lg ring-1 ring-teal-800 px-2 py-2 font-bold text-white delete">Delete</button>`)
    );
    tablebody.append(row);
  });
};

const getSoldProducts = async () => {
try {

    const results = await manageProduct.getSoldProducts();
    console.log(results)

    const soldProductContainer = $('#recentOrderList');
    soldProductContainer.empty();

    results.soldProductNames.forEach((product) => {
      const productList = $(`<li class="ms-2">${product}</li>`);
      soldProductContainer.append(productList);
    });

    $('#totalSoldItems').text(results.totalQuantitySold ?? 0);
    $('#totalRevenue').text(results.totalPriceSold ?? 0);
} catch (error) {
    console.error
}
};
getProductsList();
getSoldProducts();

$('#addProductForm').on('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const productImage = formData.get('product-image');
  const productName = formData.get('P-name');
  const productCategory = formData.get('category');
  const productQuantity = formData.get('quantity');
  const productPrice = formData.get('price');
  try {
    const result = await manageProduct.addProduct(
      productImage,
      productName,
      productCategory,
      productQuantity,
      productPrice
    );
    getProductsList();
    getSoldProducts();
    result.success === true
      ? toastClass.showToast(
          'bg-green-100 border border-green-400',
          result.message
        )
      : toastClass.showToast(
          'bg-red-100 border border-red-400',
          result.message
        );
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

$('#productList').on('click', '.edit', async function () {
  const tableRow = $(this).closest('tr');
  const productId = tableRow.data('product-id');
  const productImage = tableRow.find('img').attr('src');
  const productName = tableRow.find('td:eq(2)').text().trim();
  const productCategory = tableRow.find('td:eq(3)').text().trim();
  const productQuantity = parseInt(tableRow.find('td:eq(4)').text().trim());
  const productPrice = parseFloat(tableRow.find('td:eq(5)').text().trim());

  const modal = modalClass.getUpdateModalInstance();
  const form = modal.find('#updateProductForm');

  form.find('.image-preview').attr('src', productImage);
  form.find('input[name="name"]').val(productName);
  form.find('select[name="category"]').val(productCategory);
  form.find('input[name="quantity"]').val(productQuantity);
  form.find('input[name="price"]').val(productPrice);

  form.off('submit').on('submit', async function (e) {
    e.preventDefault();
    const Action = $(this).data('action');
    console.log(Action);

    const updateFormData = new FormData(this);
    const updatedProductImage = updateFormData.get('product-image');
    const updatedProductName = updateFormData.get('name');
    const updatedProductCategory = updateFormData.get('category');
    const updatedProductQuantity = parseInt(updateFormData.get('quantity'));
    const updatedProductPrice = parseFloat(updateFormData.get('price'));

    try {
      const result = await manageProduct.updateProduct(
        productId,
        updatedProductImage,
        Action,
        updatedProductName,
        updatedProductCategory,
        updatedProductQuantity,
        updatedProductPrice
      );
      getProductsList();
      modalClass.closeModal();
      result.success === true
        ? toastClass.showToast(
            'bg-green-100 border border-green-400',
            result.message
          )
        : toastClass.showToast(
            'bg-red-100 border border-red-400',
            result.message
          );
    } catch (error) {
      console.error(error);
    }
  });
});

/**
 * Event listener for placing an order when the "order" button is clicked in the product list table.
 * This function extracts product details from the table row, populates the order modal with the product data,
 * allows the user to select a quantity, and calculates the total price. It then handles form submission for
 * placing the order.
 *
 * @event Click on the order button in the product list.
 *
 * @param {jQuery.Event} event - The jQuery event object.
 *
 * Function Steps:
 * 1. Extract product details (ID, image, name, quantity, price) from the clicked row.
 * 2. Populate the order modal with product details including setting up a quantity selector.
 * 3. Handle the quantity change event to dynamically calculate the total price.
 * 4. Submit the order form:
 *    - Send the product ID, selected quantity, and calculated total price to the backend.
 *    - Display success or error messages based on the result.
 *    - Refresh the product list after placing the order.
 *
 * @function
 */
$('#productList').on('click', '.order', function () {
  const tableRow = $(this).closest('tr');
  const product_id = tableRow.data('product-id');
  const product_imageBase64 = tableRow.find('img').attr('src');
  const product_name = tableRow.find('td:eq(2)').text().trim();
  const product_quantity = tableRow.find('td:eq(4)').text().trim();
  const product_price = tableRow.find('td:eq(5)').text().trim();

  const modal = modalClass.getOrderModalInstance();

  modal.find('img').attr('src', product_imageBase64);
  modal.find('input[name="ReadonlyProductName"]').val(product_name);
  modal.find('input[name="price"]').val(product_price);
  const quantitySelect = modal.find('select[name="Quantity"]').empty();

  (() => {
    quantitySelect.append(`<option>Select Quantity</option>`);
    for (let i = 1; i <= product_quantity; i++) {
      quantitySelect.append(`<option value="${i}">Quantities: ${i}</option>`);
    }
  })(parseInt(product_quantity));

  quantitySelect.on('change', function () {
    const thisInputValue = $(this).val();
    const totalPriceReadonlyInput = modal.find('input[name="Total"]');
    const totalPrice = parseInt(thisInputValue) * parseFloat(product_price);

    totalPriceReadonlyInput.val(totalPrice);
  });

  modal.find('#orderProductForm').on('submit', async function (e) {
    e.preventDefault();
    try {
        const action = $(this).data('action');
        const orderFormData = new FormData(this);
        const orderedProductQuantity = orderFormData.get('Quantity');
        const orderedProducTotalPrice = orderFormData.get('Total');
        const result = await manageProduct.orderProduct(
          product_id,
          action,
          orderedProductQuantity,
          orderedProducTotalPrice
        );
        modalClass.closeModal();
        console.log(result);
        result.success === true
          ? toastClass.showToast(
              'bg-green-100 border border-green-400',
              result.message
            )
          : toastClass.showToast(
              'bg-red-100 border border-red-400',
              result.message
            );
        getProductsList();
        getSoldProducts();

    } catch (error) {
console.log(error);
    }
  });
});

/**
 * Event listener for deleting a product when the "delete" button is clicked in the product list table.
 * This function retrieves the product ID from the clicked table row, calls the deleteProduct method
 * to remove the product, and handles the result by displaying a success or error message.
 * It also refreshes the product list after deletion.
 *
 * @event Click on the delete button in the product list.
 *
 * @param {jQuery.Event} event - The jQuery event object.
 *
 * Function Steps:
 * 1. Extract the product ID from the clicked table row.
 * 2. Call the asynchronous deleteProduct function to remove the product from the database.
 * 3. Display a success or error message based on the result of the deletion.
 * 4. Refresh the product list by calling getProductsList().
 *
 * @function
 */
$('#productList').on('click', '.delete', async function () {
  const productId = $(this).closest('tr').data('product-id');
  const result = await manageProduct.deleteProduct(productId);
  result.success === true
    ? toastClass.showToast(
        'bg-green-100 border border-green-400',
        result.message
      )
    : toastClass.showToast('bg-red-100 border border-red-400', result.message);
  getProductsList();
});

/**
 * Event listener for handling image input changes in the update or add product forms.
 * When the user selects a new image, this function reads the file, converts it to a Base64 data URL,
 * and updates the corresponding image preview element in the form.
 *
 * @event Change on the image input in either the #updateProductForm or #addProductForm.
 *
 * @param {jQuery.Event} e - The jQuery event object triggered by the change event.
 *
 * Function Steps:
 * 1. Capture the selected file from the input field.
 * 2. Use FileReader to asynchronously read the file and convert it to a Base64 string.
 * 3. Once the file is successfully read, update the `src` attribute of the image preview element
 *    inside the form where the input field is located.
 *
 * @function
 */
$('#updateProductForm, #addProductForm').on(
  'change',
  '.image-input',
  function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const input = $(e.target);
      input
        .closest('form')
        .find('.image-preview')
        .attr('src', event.target.result);
    };
    reader.readAsDataURL(file);
  }
);

/**
 * Event listener for the "Unselect Image" button.
 * When clicked, this function clears the selected image input and resets the image preview.
 *
 * @event Click on the element with the class `.unselect-image`.
 *
 * Function Steps:
 * 1. Clears the value of the image input field (`.image-input`) to remove the selected file.
 * 2. Resets the `src` attribute of the image preview element (`.image-preview`) to an empty string,
 *    effectively removing the displayed image preview.
 *
 * @function
 */
$('.unselect-image').on('click', () => {
  $('.image-input').val('');
  $('.image-preview').attr('src', '');
});

/**
 * Event listener for elements with the attribute `[data-model]`.
 * When clicked, this function closes the currently open modal by invoking the `closeModal` method of the `modalClass`.
 *
 * @event Click on elements with the `[data-model]` attribute.
 *
 * Function Steps:
 * 1. Triggers the `closeModal` function from the `modalClass` to close the currently active modal.
 *
 * @function
 */
$('[data-model]').on('click', function () {
  modalClass.closeModal();
});

$('.number-only').on('input', function () {
  const input = $(this).val();
  const filteredValue = input.replace(/[^0-9.]/g, '');
  $(this).val(filteredValue);
});
