from django.urls import path
from .views import ProductListCreateAPIView, ProductRetrieveUpdateDestroyAPIView, FavoriteAPIView, AllFavoriteUserAPIView

urlpatterns = [
    path('', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('favorite', AllFavoriteUserAPIView.as_view(), name='favorite'),
    path('favorite/<str:slug>', FavoriteAPIView.as_view(), name='favorite'),
    path('<str:slug>', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-retrieve-update-destroy'),
]
