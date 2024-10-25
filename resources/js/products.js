function togglePasswordVisibility() {
    const passwordInput = $('#password');
    const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
    passwordInput.attr('type', type);
  }

  const togglebtn = $('#toggle_Password');

  togglebtn.on('click', () => {
    togglePasswordVisibility();
  })

const logout = $('#logout-form');
const logoutBtn = $('#logoutbtn');

logoutBtn.on('click', () => {
   logout.trigger('submit');
})





/**
 * Represents a Product in the inventory.
 * @class
 */
// Assuming you are using fetch API for HTTP requests. Alternatively, you can use axios for cleaner syntax.

class Product {
    constructor() {
      this.csrfToken = $('meta[name="csrf-token"]').attr('content');
      this.getAllProductsUrl = PRODUCTS_URL_ENDPOINTS.GET_ALL_PRODUCTS;
      this.addProductUrl = PRODUCTS_URL_ENDPOINTS.ADD_PRODUCT;
      this.updateProductUrl = PRODUCTS_URL_ENDPOINTS.UPDATE_PRODUCT;
      this.deleteProductUrl = PRODUCTS_URL_ENDPOINTS.DELETE_PRODUCT;
    }

    // Fetch all products from the Laravel API
    async getAllProducts() {
      try {
        const response = await $.ajax(this.getAllProductsUrl, {
          method: 'GET',
          headers: {
            'X-CSRF-TOKEN': this.csrfToken,
          },
        });
        return response;  // Return list of products
      } catch (error) {
        console.error("Error fetching products:", error);
        return { message: "Error: " + error, success: false };
      }
    }

    // Add a new product using POST request
    async addProduct(image, name, category, quantity, price) {

      try {
        const formData = new FormData();
       formData.append("product-image", image, image.name);
       formData.append("product-name", name);
       formData.append("category", category);
       formData.append("quantity", quantity);
       formData.append("price", price);
        const response = await $.ajax(this.addProductUrl, {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': this.csrfToken,
          },
          processData: false, // Ensure data is not processed
          contentType: false, // Ensure content type is not set
          data: formData,
        });

        return { message: "Product Added Successfully", success: true, response };
      } catch (error) {
        return { message: "Error: " + error, success: false };
      }
    }

    // Update an existing product using PUT request
    async updateProduct(id, updatedProduct) {
      try {
        const response = await fetch(`${this.apiUrl}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        });
        const data = await response.json();
        return { message: "Product Updated Successfully", success: true, data };
      } catch (error) {
        return { message: "Error: " + error, success: false };
      }
    }

    // Delete a product using DELETE request
    async deleteProduct(id) {
      try {
        const response = await fetch(`${this.apiUrl}/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          return { message: "Product Deleted Successfully", success: true };
        } else {
          throw new Error('Failed to delete product');
        }
      } catch (error) {
        return { message: "Error: " + error, success: false };
      }
    }

    // Process an order by adjusting product quantity and adding to sold products
    async orderProduct(id, orderProductQuantity, orderProductTotalPrice) {
      try {
        const product = await this.getProductById(id); // Assuming a method to get a single product by ID
        if (product) {
          product.quantity -= orderProductQuantity;

          const soldProduct = {
            id: product.id,
            name: product.name,
            quantity: orderProductQuantity,
            price: orderProductTotalPrice,
          };

          // You would need to handle sold products as a separate entity in Laravel if required

          const updatedProduct = await this.updateProduct(id, { quantity: product.quantity });
          return {
            message: `Order for Product ${product.name} processed successfully`,
            success: true,
            updatedProduct,
          };
        } else {
          return { message: "Product Not Found", success: false };
        }
      } catch (error) {
        return { message: "Error: " + error, success: false };
      }
    }

    // Helper to get a single product by its ID (if required)
    async getProductById(id) {
      try {
        const response = await fetch(`${this.apiUrl}/${id}`);
        const product = await response.json();
        return product;
      } catch (error) {
        console.error("Error fetching product:", error);
        return null;
      }
    }

    // Calculate total quantity and price of all products
    async calculateTotalQuantityAndPrice() {
      try {
        const products = await this.getAllProducts();
        const totalQuantity = products.reduce((acc, product) => acc + parseInt(product.quantity), 0);
        const totalPrice = products.reduce((acc, product) => acc + parseFloat(product.quantity) * parseFloat(product.price), 0);

        return { totalQuantity, totalPrice };
      } catch (error) {
        return { message: "Error: " + error, success: false };
      }
    }

    // Retrieve sold products (you need to implement this logic on the Laravel side)
    async getSoldProducts() {
      try {
        const response = await fetch(`${this.apiUrl}/sold-products`); // Assuming sold products route
        const soldProducts = await response.json();
        const soldProductNames = soldProducts.map(product => product.name);
        const totalQuantitySold = soldProducts.reduce((acc, product) => acc + product.quantity, 0);
        const totalPriceSold = soldProducts.reduce((acc, product) => acc + product.price, 0);

        return { soldProductNames, totalQuantitySold, totalPriceSold };
      } catch (error) {
        return { message: "Error: " + error, success: false };
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
      this.toastInstance = $("#toast");
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
      this.toastInstance.find("#toast-content").addClass(bgcolor);
      this.toastInstance.find("#toast-message").text(message);
      this.toastInstance.removeClass("hidden");
      setTimeout(() => {
        this.toastInstance.addClass("hidden");
        this.toastInstance
          .find("#toast-content")
          .removeClass(
            "bg-green-100 bg-red-100 border border-green-400 border-red-400",
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
      this.toastInstance.addClass("hidden");
      this.toastInstance
        .find("#toast-content")
        .removeClass(
          "bg-green-100 bg-red-100 border border-green-400 border-red-400",
        );
      this.toastInstance.find("#toast-message").text("");
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
      this.modalInstance = $(".modal");
    }

    /**
     * Displays the update modal for a product.
     * @returns {jQuery} The jQuery object representing the modal instance.
     * @description
     * This method removes the hidden class from the modal, sets the header text to
     * "Update Product", displays the update product form, and returns the modal instance.
     */
    getUpdateModalInstance() {
      this.modalInstance.removeClass("hidden");
      this.modalInstance.find("h3").text("Update Product");
      this.modalInstance.find("#updateProductForm").removeClass("hidden");
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
      this.modalInstance.removeClass("hidden");
      this.modalInstance.find("h3").text("Order Product");
      this.modalInstance.find("#orderProductForm").removeClass("hidden");
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
      this.modalInstance.addClass("hidden");
      this.modalInstance.find("h3").text("");
      const modalForms = this.modalInstance.find(
        "#updateProductForm, #orderProductForm",
      );
      modalForms.off("submit");
      modalForms.addClass("hidden");
      modalForms.find("input, select").val("");
    }
  }

  const manageProduct = new Product();
  const toastClass = new toast();
  const modalClass = new modal();

  /**
   * Calculates the total quantity and price of all products and updates the corresponding HTML elements.
   *
   * @return {void}
   */
  const calculateTotalQuantityAndPrice = async () => {
    const result = await manageProduct.calculateTotalQuantityAndPrice();
    $("#totalQuantity").text(result?.totalQuantity);
    $("#totalPrice").text(`₱ ${result?.totalPrice}`);
  };

 // calculateTotalQuantityAndPrice();
  /**
   * Retrieves the list of all products from the `manageProduct` module and dynamically generates a table of products.
   * The product list is rendered inside an HTML table with the ID `#productList`, replacing any existing content.
   *
   * Each product row contains the product's ID, image, name, category, quantity, and price, as well as buttons for
   * ordering, editing, and deleting the product.
   *
   * @function getProductsList
   *
   * Function Steps:
   * 1. Calls `manageProduct.getAllProducts()` to retrieve all product data.
   * 2. Clears the current contents of the table body with ID `#productList`.
   * 3. For each product, creates a new `<tr>` element with various `<td>` elements representing:
   *    - Product ID
   *    - Product image (rendered inside an `<img>` tag)
   *    - Product name
   *    - Product category
   *    - Product quantity
   *    - Product price
   * 4. Appends action buttons for ordering, editing, and deleting each product in the last column.
   * 5. Appends the generated row to the table body.
   *
   * @example
   * getProductsList(); // Dynamically renders a list of products in the table.
   */
  const getProductsList = async () => {
    const products = await manageProduct.getAllProducts();
    const baseUrl = window.location.origin;
    console.log(products);
    const tablebody = $("#productList");
    tablebody.empty();

    products.forEach((product) => {
      const row = $('<tr data-product-id="' + product.id + '" class="border">');
      row.append($('<td class="border-y px-4 py-2">').text(product.id));
      row.append(
        $('<td class="border-y px-4 py-2">').html(
          `<img src="${product.product_image_url}" class="object-cover rounded-full mx-auto" style="width: 90px; height: 90px;" alt="Product Image">`,
        ),
      );
      row.append(
        $('<td class="border-y px-4 py-2 text-center">').text(product.product_name),
      );
      row.append(
        $('<td class="border-y px-4 py-2 text-center">').text(product.product_categories),
      );
      row.append(
        $('<td class="border-y px-4 py-2 text-center">').text(product.quantity),
      );
      row.append(
        $('<td class="border-y px-4 py-2 text-center">').text(product.price),
      );
      row.append(
        $('<td class="text-center">')
          .html(`<button class="bg-green-500 rounded-lg ring-1 ring-teal-800 px-2 py-2 font-bold text-white order">Order</button>
      <button class="bg-blue-500 rounded-lg ring-1 ring-teal-800 px-2 py-2 font-bold text-white edit">Edit</button>
      <button class="bg-red-500 rounded-lg ring-1 ring-teal-800 px-2 py-2 font-bold text-white delete">Delete</button>`),
      );
      tablebody.append(row);
    });
  };

  const getSoldProducts = () => {
    const results = manageProduct.getSoldProducts();

    const soldProductContainer = $("#recentOrderList");
    soldProductContainer.empty();

    results.soldProductNames.forEach((product) => {
      const productList = $(`<li class="ms-2">${product}</li>`);
      soldProductContainer.append(productList);
    });

    $("#totalSoldItems").text(results.totalQuantitySold ?? 0);
    $("#totalRevenue").text(results.totalPriceSold ?? 0);
  };
//   getSoldProducts();
  getProductsList();

  /**
   * Event listener for the submit event on the #addProductForm element.
   *
   * @description Handles the submission of the add product form, creates a new product object, and adds it to the product list. It also updates the product list table and displays a toast message indicating the result of the operation.
   *
   * @param {Event} e - The submit event object.
   */
  $("#addProductForm").on("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const productImage = formData.get("product-image");
    const productName = formData.get("P-name");
    const productCategory = formData.get("category");
    const productQuantity = formData.get("quantity");
    const productPrice = formData.get("price");
try {

    const result = await manageProduct.addProduct(
        productImage,
        productName,
        productCategory,
        productQuantity,
        productPrice
      );
     getProductsList();
    // getSoldProducts();
    // calculateTotalQuantityAndPrice();
    result.success === true
      ? toastClass.showToast(
          "bg-green-100 border border-green-400",
          result.message,
        )
      : toastClass.showToast(
          "bg-red-100 border border-red-400",
          result.message,
        );
    console.log(result)
} catch (error) {
    console.error(error)

}
  });

  /**
   * Handles the click event for the ".edit" button inside the #productList table.
   * It opens a modal pre-filled with the product data and allows for product updates.
   *
   * @event click
   * @param {jQuery.Event} event - The jQuery click event.
   *
   * @listens click#productList .edit
   *
   * @fires updateProduct - Updates the product information.
   *
   * @requires modalClass.getUpdateModalInstance - Gets the modal instance for updating products.
   * @requires manageProduct.updateProduct - Updates the product via an API or database interaction.
   * @requires getProductsList - Refreshes the product list.
   * @requires getSoldProducts - Refreshes the list of sold products.
   * @requires calculateTotalQuantityAndPrice - Recalculates the total quantity and price.
   * @requires toastClass.showToast - Displays a toast message indicating the success or failure of the update.
   */
  $("#productList").on("click", ".edit", function () {
    const tableRow = $(this).closest("tr");

    const product_id = tableRow.data("product-id");
    const product_imageBase64 = tableRow.find("img").attr("src");
    const product_name = tableRow.find("td:eq(2)").text().trim();
    const product_category = tableRow.find("td:eq(3)").text().trim();
    const product_quantity = tableRow.find("td:eq(4)").text().trim();
    const product_price = tableRow.find("td:eq(5)").text().trim();

    const modal = modalClass.getUpdateModalInstance();

    const modalBody = modal.find(".modal-body");
    const updateform = modalBody.find("#updateProductForm");

    updateform.find(".image-preview").attr("src", `${product_imageBase64}`);
    updateform
      .find('input[name="updated-product-image"]')
      .attr("data-imgBased64", product_imageBase64);
    updateform.find('input[name="updated-name"]').val(product_name);
    updateform.find('select[name="updated-category"]').val(product_category);
    updateform.find('input[name="update-quantity"]').val(product_quantity);
    updateform.find('input[name="update-price"]').val(product_price);

    modal.find("#updateProductForm").on("submit", async function (e) {
      e.preventDefault();

      const updateFormData = new FormData(this);
      let updateProductImage = updateFormData.get("updated-product-image");
      const updateProductName = updateFormData.get("updated-name");
      const updateProductCategory = updateFormData.get("updated-category");
      const updateProductQuantity = updateFormData.get("update-quantity");
      const updateProductPrice = updateFormData.get("update-price");

      if (updateProductImage && updateProductImage.size > 0) {

        // Image is a File object, we need to convert it to Base64
        const reader = new FileReader();
        reader.onload = async function (event) {
          const base64Image = event.target.result;
          const updatedProduct = {
            image: base64Image,
            name: updateProductName,
            category: updateProductCategory,
            quantity: updateProductQuantity,
            price: updateProductPrice,
          };
          const result = await manageProduct.updateProduct(
            product_id,
            updatedProduct,
          );
          getProductsList();
          getSoldProducts();
          calculateTotalQuantityAndPrice();
          modalClass.closeModal();
          result.success === true
            ? toastClass.showToast(
                "bg-green-100 border border-green-400",
                result.message,
              )
            : toastClass.showToast(
                "bg-red-100 border border-red-400",
                result.message,
              );
        };
        reader.readAsDataURL(updateProductImage);
      } else {
        updateProductImage = $('input[name="updated-product-image"]').attr(
          "data-imgBased64",
        );

        // Image is already in Base64, no need to read again
        const updatedProduct = {
          image: $('input[name="updated-product-image"]').attr("data-imgBased64"),
          name: updateProductName,
          category: updateProductCategory,
          quantity: updateProductQuantity,
          price: updateProductPrice,
        };

        console.log(updatedProduct);

        const result = await manageProduct.updateProduct(
          product_id,
          updatedProduct,
        );
        modalClass.closeModal();
        getSoldProducts();
        getProductsList();
        result.success === true
          ? toastClass.showToast(
              "bg-green-100 border border-green-400",
              result.message,
            )
          : toastClass.showToast(
              "bg-red-100 border border-red-400",
              result.message,
            );
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
  $("#productList").on("click", ".order", function () {
    const tableRow = $(this).closest("tr");
    const product_id = tableRow.data("product-id");
    const product_imageBase64 = tableRow.find("img").attr("src");
    const product_name = tableRow.find("td:eq(2)").text().trim();
    const product_quantity = tableRow.find("td:eq(4)").text().trim();
    const product_price = tableRow.find("td:eq(5)").text().trim();

    const modal = modalClass.getOrderModalInstance();

    modal.find("img").attr("src", product_imageBase64);
    modal.find('input[name="ReadonlyProductName"]').val(product_name);
    modal.find('input[name="price"]').val(product_price);
    const quantitySelect = modal.find('select[name="Quantity"]').empty();

    (() => {
      quantitySelect.append(`<option>Select Quantity</option>`);
      for (let i = 1; i <= product_quantity; i++) {
        quantitySelect.append(`<option value="${i}">Quantities: ${i}</option>`);
      }
    })(parseInt(product_quantity));

    quantitySelect.on("change", function () {
      const thisInputValue = $(this).val();
      const totalPriceReadonlyInput = modal.find('input[name="Total"]');
      const totalPrice = parseInt(thisInputValue) * parseFloat(product_price);

      totalPriceReadonlyInput.val(totalPrice);
    });

    modal.find("#orderProductForm").on("submit", async function (e) {
      e.preventDefault();
      const orderFormData = new FormData(this);

      const orderProductQuantity = orderFormData.get("Quantity");
      const orderProducTotalPrice = orderFormData.get("Total");
      console.log(product_id, orderProductQuantity, orderProducTotalPrice);
      const result = await manageProduct.orderProduct(
        product_id,
        orderProductQuantity,
        orderProducTotalPrice,
      );
      modalClass.closeModal();
      console.log(result);
      result.success === true
        ? toastClass.showToast(
            "bg-green-100 border border-green-400",
            result.message,
          )
        : toastClass.showToast(
            "bg-red-100 border border-red-400",
            result.message,
          );
      getProductsList();
      getSoldProducts();
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
  $("#productList").on("click", ".delete", async function () {
    const productId = $(this).closest("tr").data("product-id");
    const result = await manageProduct.deleteProduct(productId);
    result.success === true
      ? toastClass.showToast(
          "bg-green-100 border border-green-400",
          result.message,
        )
      : toastClass.showToast(
        "bg-red-100 border border-red-400",
        result.message
      );
    getProductsList();
    calculateTotalQuantityAndPrice();
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
  $("#updateProductForm, #addProductForm").on(
    "change",
    ".image-input",
    function (e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        const input = $(e.target);
        input
          .closest("form")
          .find(".image-preview")
          .attr("src", event.target.result);
      };
      reader.readAsDataURL(file);
    },
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
  $(".unselect-image").on("click", () => {
    $(".image-input").val("");
    $(".image-preview").attr("src", "");
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
  $("[data-model]").on("click", function () {
    modalClass.closeModal();
  });

  $(".number-only").on("input", function () {
    const input = $(this).val();
    const filteredValue = input.replace(/[^0-9.]/g, "");
    $(this).val(filteredValue);
  });
