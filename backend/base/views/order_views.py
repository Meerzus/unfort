from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from backend.settings import TERMINAL_KEY, TERMINAL_PASSWORD

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer

from rest_framework import status

from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No items'},
                        status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) Create Order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )
        # (2) Create Shipping Address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
        )
        # (3) Create Order Items and set orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name + ', Размер: ' + i['size'] + ', by: ' + user.username,
                qty=i['qty'],
                price=i['price'],
                image=product.mainimg.url,
                size=i['size'],
            )

            # (4) Update Stock
            if item.size == 'S':
                product.sizeInStockS -= item.qty
                product.countInStock -= item.qty
            elif item.size == 'M':
                product.sizeInStockM -= item.qty
                product.countInStock -= item.qty
            elif item.size == 'L':
                product.sizeInStockL -= item.qty
                product.countInStock -= item.qty
            elif item.size == 'XL':
                product.sizeInStockXL -= item.qty
                product.countInStock -= item.qty
            else:
                product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    order = Order.objects.get(_id=pk)

    try:
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail:': 'No'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'No order'},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was delivered')


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def tinkoffPay(request, pk):
#     user = request.user
#     order = Order.objects.get(_id=pk)
#
#     try:
#         if order.user == user:
#             serializer = OrderSerializer(order, many=False)
#             return Response(serializer.data)
#         else:
#             Response({'detail:': 'No'},
#                      status=status.HTTP_400_BAD_REQUEST)
#     except:
#         return Response({'detail': 'No order'},
#                         status=status.HTTP_400_BAD_REQUEST)
#     # описание метода в документации
#     # https://www.tinkoff.ru/kassa/develop/api/payments/init-description/
#
#     # Define the payment information as a dictionary
#     # Replace with your Tinkoff Merchant Terminal Key
#     terminal_key = TERMINAL_KEY
#
#     # Replace with your Tinkoff Merchant Secret Key
#     secret_key = TERMINAL_PASSWORD
#
#     values = {
#         'Amount': str(order.totalPrice * 100) + '.00',  #
#         # *100 потому что указывается сумма в копейках/ и в других методах почему-то идёт сразу с .00 а здесь без. глюк
#         # матрицы тинькофф...
#         'Description': str(order.user.email) + ' (' + str(order.createdAt) + ').',  # The order description
#         'OrderId': str(order._id),
#         'Password': secret_key,
#         'TerminalKey': terminal_key
#     }
#
#     # Concatenate all values in the correct order
#     concatenated_values = ''.join([values[key] for key in (values.keys())])
#
#     # Calculate the hash using SHA-256 algorithm
#     hash_object = hashlib.sha256(concatenated_values.encode('utf-8'))
#     token = hash_object.hexdigest()
#     logger.debug('shop.views(1159) buy token {} ', token)
#
#     payment_data = {
#         'TerminalKey': terminal_key,
#         'OrderId': str(order._id),
#         'Amount': str(int(order.totalPrice * 100)),  # *100 потому что указывается сумма в копейках
#         "Description": str(order.user.email) + ' (' + str(order.createdAt) + ').',  # The order description
#         "Language": "ru",  # The language code (ru or en)
#         "PayType": "O",  # The payment type (O for one-time payment)
#         "Recurrent": "N",  # Indicates whether the payment is recurrent (N for no)
#         # "CustomerKey": "1234567890", # The customer key (optional)
#
#         'Token': token,
#         'DATA': {
#             'Name': order.user.first_name,
#             'Email': order.user.email,
#         },
#         'PaymentMethod': {
#             'Type': 'Mobile',
#             'Data': {},
#         },
#         # данные чека
#         'Receipt': {
#             'Name': str(order.user.first_name),
#             'Email': str(order.user.email),
#             'Taxation': 'usn_income',  # упрощёнка
#             'Items': [{  # https://www.tinkoff.ru/kassa/develop/api/receipt/#Items
#                 'Name': str(order.user.first_name),
#                 # 'Quantity': str(cert.count),
#                 'Amount': str(int(order.totalPrice * 100)),
#                 'Tax': 'none',  # без НДС
#                 'Price': str(int(order.totalPrice * 100)),
#             }, ]
#         },  # your receipt data
#
#         "SuccessURL": str(request.scheme + '://' + request.get_host() + "/youSuccess_path/?you_get=" + str(your.pk)),
#         # The URL for successful payments
#         "NotificationURL": request.scheme + '://' + request.get_host() + request.get_full_path() + '&OrderId=' + str(
#             order._id),  # The URL for payment notifications
#         "FailURL": str(request.scheme + '://' + request.get_host() + "/youFailURL_path/?you_get=" + str(your.pk)),
#         # The URL for failed payments
#     }
#
#     # путь по которому мы отправляем свой запрос, прописан в документации банка
#     url = "https://securepay.tinkoff.ru/v2/payments/"
#
#     response = requests.post(url, json=payment_data)
#     logger.debug('shop.views Buy (1143) Tinkoff response {}', response.json())
#
#     if response.json()['Success']:
#         payment_url = response.json()['PaymentURL']
#
#         # Redirect the user to the payment form
#
#         Certificate.objects.filter(id=order._id).update(PaymentId=response.json()['PaymentId'])
#
#         # отправляем пользователя на платёжную форму
#         return redirect(payment_url)
#
#     else:
#         # result = False
#         message = response.json()['Message'] + ' ' + response.json()['Details']
#         messages.error(request, message)
#         logger.debug('shop.views(1191) buy response payment_url response {} ', response.json())


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def CheckOrder(order):
#     try:
#         url = "https://securepay.tinkoff.ru/v2/CheckOrder"
#
#         # Replace with your Tinkoff Merchant Terminal Key
#         terminal_key = settings.TERMINALKEY
#
#         # Replace with your Tinkoff Merchant Secret Key
#         secret_key = settings.TERMINALPASSWORD
#
#         values = {
#             'Amount': str(order.totalPrice * 100),  # *100 потому что указывается сумма в копейках
#             'Description': str(order.user.email) + ' (' + str(order.createdAt) + ').',  # The order description
#             'OrderId': str(order._id),
#             'Password': secret_key,
#             'TerminalKey': terminal_key
#         }
#
#         concatenated_values = ''.join([values[key] for key in (values.keys())])
#         # logger.debug('shop.views(283) CheckOrder concatenated_values {} ',concatenated_values)
#
#         # Calculate the hash using SHA-256 algorithm
#         hash_object = hashlib.sha256(concatenated_values.encode('utf-8'))
#         token = hash_object.hexdigest()
#         logger.debug('shop.views(286) CheckOrder token {} ', token)
#         # Make a request to the Tinkoff Merchant API endpoint
#         response = requests.post(url, json={'TerminalKey': terminal_key, 'OrderId': order._id, 'Token': token})
#         logger.debug('shop.views(289) CheckOrder ID_CERT {}  response {}', str(order._id), response.status_code)
#
#         # Check the response status code
#         if response.status_code == requests.codes.ok:
#             # Parse the JSON response
#             response_data = response.json()
#             # logger.debug('shop.views(244) CheckOrder response_data {}  ',response_data)
#
#             # Check the payment status
#             if response_data['Success']:
#
#                 payments = response_data['Payments'][0]
#                 # logger.debug('shop.views(249) CheckOrder payments {}  ',payments)
#                 if payments['Success']:
#                     # messages.success(request, 'Оплата произведена '+payment_status+', вся необходимая информация отправлена Вам на email')
#                     message = 'Произведена оплата ' + payments['Message']
#                     logger.debug('shop.views(253) CheckOrder message {}  payment_status {}', message,
#                                  payments['Status'])
#                 else:
#                     message = 'Недоразумение при оплате ' + payments['Message']
#                     logger.debug('shop.views(256) CheckOrder message {}  payment_status {}', message,
#                                  payments['Status'])
#                 return {'status': payments['Success'], 'message': message}
#
#             else:
#                 # Handle the error response
#                 error_message = response_data['Message'] + ' ' + response_data['Details']
#                 # messages.error(request, 'Оплата не произведена '+error_message)
#                 logger.debug('(ERR)shop.views(311) CheckOrder number_cert {} err {}', str(order._id),
#                              error_message)
#                 message = error_message
#
#                 return {'status': False, 'message': message}
#
#         else:
#             # Handle the request error
#             logger.error(
#                 '(ERR)shop.views(319) CheckOrder ID_CERT {} Ошибка при проверке статуса платежа Request error: {}',
#                 str(order._id), response.status_code)
#             message = 'Оплата не произведена ' + response.status_code
#             return {'status': False, 'message': message}
#
#     except Exception as err:
#         logger.debug('(ERR)shop.views(326) CheckOrder response{} GetState err {}', response, err)
