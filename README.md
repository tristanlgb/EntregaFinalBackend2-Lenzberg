.ENV

MONGO_URI=mongodb+srv://tristanlgb:hola123@backendapp.fwel2.mongodb.net/test?retryWrites=true&w=majority

SECRET_JWT=secreto123
PORT=8080
EMAIL_USER=tristanlgb@gmail.com
EMAIL_PASS=your-email-password



---Posman---


Login
POST,/api/auth/register,"{'first_name': 'John', 'last_name': 'Doe', 'email': 'johndoe@example.com', 'password': 'securepassword', 'age': 30}"
POST,/api/auth/login,"{'email': 'johndoe@example.com', 'password': 'securepassword'}"
GET,/api/auth/logout,

Business
GET,/api/business/,"{'name': 'Tech Solutions', 'address': '123 Business St, City, Country', 'phone': '+123456789', 'email': 'contact@techsolutions.com'}"
GET,/api/business/:id,
POST,/api/business/:id/product,

Buyers
GET,/api/buyer/,
GET,/api/buyer/:id,

Carts
POST,/api/cart/:cid/purchase,

Orders
GET,/api/orders/,"{'userId': '64a67f2e2b3d9c001c1a9f21', 'cartId': '64a67f2e2b3d9c001c1a9f24', 'totalPrice': 150.99}"
GET,/api/orders/:id,
POST,/api/orders/,"{'userId': '64a67f2e2b3d9c001c1a9f21', 'cartId': '64a67f2e2b3d9c001c1a9f24', 'totalPrice': 150.99}"
POST,/api/orders/:id,

Products
GET,/api/product/,"{'title': 'New Product', 'description': 'A high-quality product', 'price': 49.99, 'category': 'electronics', 'stock': 10, 'thumbnail': 'https://example.com/image.jpg'}"

Tickets
POST	/api/tickets/	{ "code": "12345-67890", "purchase_datetime": "2024-01-01T12:00:00.000Z", "amount": 2400, "purchaser": "buyer@example.com" }
GET	/api/tickets/	Fetch all tickets
GET	/api/tickets/:id	Fetch ticket by ID
PUT	/api/tickets/:id	{ "amount": 2600 } (Example update for ticket amount)
DELETE	/api/tickets/:id	Delete ticket by ID
