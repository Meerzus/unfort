from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Review
from base.serializers import ProductSerializer

from rest_framework import status


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')

    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(products[::-1], 100)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        size='',
        category='Sample',
        sizeInStockS=0,
        sizeInStockM=0,
        sizeInStockL=0,
        sizeInStockXL=0,
        countInStock=0,
        description1='',
        description2='',
        description3='',
        description4='',
        description5=''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    product.name = data['name']
    product.price = data['price']
    # product.size = data['size']
    product.category = data['category']
    product.sizeInStockS = data['sizeInStockS']
    product.sizeInStockM = data['sizeInStockM']
    product.sizeInStockL = data['sizeInStockL']
    product.sizeInStockXL = data['sizeInStockXL']
    product.countInStock = data['countInStock']
    product.description1 = data['description1']
    product.description2 = data['description2']
    product.description3 = data['description3']
    product.description4 = data['description4']
    product.description5 = data['description5']
    product.rating = data['rating']
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('prod deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.mainimg = request.FILES.get('mainimg')
    product.preview1 = request.FILES.get('preview1')
    product.preview2 = request.FILES.get('preview2')
    product.preview3 = request.FILES.get('preview3')
    product.preview4 = request.FILES.get('preview4')
    product.preview5 = request.FILES.get('preview5')
    product.preview6 = request.FILES.get('preview6')
    product.preview7 = request.FILES.get('preview7')
    product.preview8 = request.FILES.get('preview8')
    product.preview9 = request.FILES.get('preview9')
    product.preview10 = request.FILES.get('preview10')
    product.productSize = request.FILES.get('productSize')
    product.save()

    return Response('img was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
        # return Response(print('data: ', request.data))

    # 2 - No rating or rating = 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review added')
