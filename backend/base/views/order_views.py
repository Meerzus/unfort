from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from backend.backend.settings import TERMINAL_KEY, TERMINAL_PASSWORD

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
            # paymentMethod=data['paymentMethod'],
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


terminal_key = settings.TERMINALKEY
secret_key = settings.TERMINALPASSWORD


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    # values = {
    #     'Amount': str(cert.price * 100) + '.00',
    #     # *100 потому что указывается сумма в копейках/ и в других методах почему то идёт  сразу с .00 а здесь без. глюк матрицы тинькофф...
    #     'Description': str(cert.product.title) + ' (' + str(cert.count) + ') шт.',  # The order description
    #     'OrderId': str(cert.number_cert),
    #     'Password': secret_key,
    #     'TerminalKey': terminal_key
    # }

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

