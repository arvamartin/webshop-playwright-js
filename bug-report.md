# The project currently has the following known issues:

* User can register with invalid e-mail and address information.
* User is unable to modify the quantity of a product on the shopping cart page.
* User is unable to decrease the quantity of a product after it has been added to the shopping cart.
* User cannot modify billing and delivery address during the checkout process.
* Invalid data can be entered in invalid format in the payment form

# Example of the bug report
## Invalid data can be entered in invalid format in the payment form


### Description
* Users are able to fill out the payment form with invalid and invalid formatted data. The system does not properly validate these fields during the checkout/payment process, 
allowing incorrect or improperly formatted data to be submitted and accepted.

**Environment:**
* Operating System: [Windows11]

* Browser:
    [Chrome, version: 127.0]

**Steps to reproduce:**

1. Open the website.
2. Fill out the login form with valid credentials: Email: “testExample@gmail.com“ , Password: “test123“.
3. Click on the “Login" button.
4. Add any product to the shopping cart.
5. Navigate to the checkout page.
6. Navigate to the payment page.
7. In the payment form, enter invalid or incorrect data in the fields for Name on Card, Card Number, CVC and Expiration.
8. Click on the Pay and Confirm Order button.

**Expected result:**

The system should validate the input fields and prevent users from moving forward if any of the entered data is incorrect or invalid.

**Actual result:**

Users can bypass the form validation and proceed to the next step even with incorrect or invalid data.

**Impact:** 

This issue could lead to incorrect or incomplete orders being processed, which may result in customer dissatisfaction and operational challenges.

These issues are listed in the project's task board in the "TO DO" column and are awaiting resolution.